import React, { useContext, useState } from 'react';
import { useChatAPI, useGetChatMsg } from '~/api/chatApi';
import AppText from '~/components/AppText';
import ChatField from '~/components/Chat/ChatField';
import ChatMessage from '~/components/Chat/ChatMessage';
import AppScreen from '~/components/Shared/AppScreen';
import Btn from '~/components/Shared/Btn';
import styled from '~/config/styled-components';
import UserContext from '~/context/UserContext';
import { ChatMessageModel } from '~/types/models/ChatMessage';

const mergeMessages = (
	existing: ChatMessageModel[],
	incoming: ChatMessageModel[]
) => {
	let res = existing;
	for (const msg of incoming) {
		if (existing.findIndex((val) => val.id == msg.id) == -1) {
			res = [msg, ...res];
		}
	}
	return res;
};

const Chat: React.FC = () => {
	const { user } = useContext(UserContext)!;
	const [messages, setMessages] = useState<ChatMessageModel[]>([]);
	const [hasMore, setHasMore] = useState(false);
	const [offset, setOffset] = useState(0);
	const [autoScroll, setAutoScroll] = useState(true);

	useGetChatMsg({ count: 5, offset }, (data) => {
		setMessages(mergeMessages(messages, data.messages));
		setHasMore(data.more);
	});

	const onMsg = (message: ChatMessageModel) => {
		setMessages((m) => [...m, message]);
	};

	const { stompClient } = useChatAPI(user!.id, onMsg);

	const addMsg = (msg: string) => {
		setAutoScroll(true);
		try {
			if (!stompClient.connected) {
				console.log('not active ');
			}
			stompClient.send(
				'/app/chat/2',
				{},
				JSON.stringify({
					sender: user!.id,
					content: msg,
				})
			);
		} catch (error) {
			console.log(error);
		}
		setMessages([
			...messages,
			{
				content: msg,
				id: Math.random() * 100, // temporary Id
				senderId: user!.id,
				date: `${new Date()}`,
			},
		]);
	};

	return (
		<>
			<AppScreen
				autoScroll={autoScroll}
				navbar
				title="Chat"
				navBarProps={{ backIcon: true }}
			>
				<Messages>
					<Center>
						{hasMore && (
							<Btn
								onPress={() => {
									setOffset((off) => off + 1);
									setAutoScroll(false);
								}}
							>
								charger
							</Btn>
						)}
					</Center>
					{messages.length <= 0 ? (
						<NoMessages>
							<AppText type="subtitle" color="dimmed">
								Commencer la conversation
							</AppText>
						</NoMessages>
					) : (
						messages.map((msg) => (
							<ChatMessage
								key={msg.id}
								{...msg}
								mine={user!.id == msg.senderId}
							/>
						))
					)}
				</Messages>
			</AppScreen>
			<Send>
				<ChatField send={addMsg} />
			</Send>
		</>
	);
};
const Messages = styled.View`
	height: 100%;
	align-items: flex-end;
	justify-content: flex-end;
	padding-bottom: 70px;
`;
const NoMessages = styled.View`
	height: 50%;
	align-items: center;
	justify-content: center;
	align-self: center;
`;
const Center = styled.View`
	align-items: center;
	justify-content: center;
	align-self: center;
`;
const Send = styled.View`
	position: absolute;
	bottom: 5px;
	left: 5px;
	right: 5px;
`;

export default Chat;
