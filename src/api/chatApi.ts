import { Stomp } from '@stomp/stompjs';
import { useEffect } from 'react';
/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import SockJS from 'sockjs-client';
import api, { URL } from '~/config/api';
import { TOKEN_KEY } from '~/config/constants';
import { loadFromStorage } from '~/Helpers/asyncStorage';
import { QueryFn } from '~/types/ApiHelpers';
import { ChatMessageModel } from '~/types/models/ChatMessage';

const stompClient = Stomp.over(() => new SockJS(`${URL}/chat`));
export type MessageCallback = (msg: ChatMessageModel) => void;

export const useChatAPI = (
	subscribeId: number,
	handleMessage: MessageCallback
) => {
	useEffect(() => {
		loadFromStorage(TOKEN_KEY).then(async (jwt) => {
			const headers = { Authorization: `${jwt}` };

			stompClient.connectHeaders = headers;
			stompClient.reconnectDelay = 5000;
			stompClient.onStompError = () => {
				console.log('socket error');
			};

			stompClient.onConnect = () => {
				stompClient.subscribe(
					`/topic/messages/${subscribeId}`,
					// `/user/${user.username}/queue/messages`,
					(payload) => {
						handleMessage(JSON.parse(payload.body));
					},
					headers
				);
				stompClient.subscribe(
					`/topic/messages/-1`, // -1 for broadcast
					(payload) => {
						handleMessage(JSON.parse(payload.body));
					},
					headers
				);
			};

			stompClient.activate();
		});

		return () => {
			if (stompClient.active) stompClient.deactivate();
		};
	}, []);
	return { stompClient };
};

type MessagesResponse = {
	messages: ChatMessageModel[];
	more: boolean;
};
type ChatMsgParams = { count: number; offset: number };
const getChatMsg: QueryFn<
	MessagesResponse,
	ChatMsgParams & { fromId: number }
> = async ({ queryKey }) => {
	const [_, args] = queryKey;
	const { data } = await api.get<MessagesResponse>(`/chat/${args.fromId}`, {
		params: { count: args.count, offset: args.offset },
	});
	return data;
};

export const useGetChatMsg = (
	params: ChatMsgParams,
	fromId: number,
	onSuccess: (data: MessagesResponse) => void
) => {
	return useQuery(['chat_msg', { ...params, fromId }], getChatMsg, {
		refetchOnMount: 'always',
		onSuccess,
	});
};

export default useChatAPI;
