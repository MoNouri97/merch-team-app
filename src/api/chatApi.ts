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
		loadFromStorage(TOKEN_KEY).then((jwt) => {
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
			};

			if (!stompClient.active) {
				stompClient.activate();
			}
		});

		// TODO:this
		// return () => {
		// 	if (stompClient.active) stompClient.deactivate();
		// };
	}, []);
	return { stompClient };
};

type MessagesResponse = {
	messages: ChatMessageModel[];
	more: boolean;
};
type ChatMsgParams = { count: number; offset: number };
const getChatMsg: QueryFn<MessagesResponse, ChatMsgParams> = async ({
	queryKey,
}) => {
	const [_, params] = queryKey;
	const { data } = await api.get<MessagesResponse>('/chat', { params });
	return data;
};

export const useGetChatMsg = (params: ChatMsgParams) => {
	return useQuery<any, any, MessagesResponse, [string, ChatMsgParams]>(
		['chat_msg', params],
		getChatMsg
	);
};

export default useChatAPI;
