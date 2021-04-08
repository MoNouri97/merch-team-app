import React, { useState } from 'react';
import AppScreen from '~/components/AppScreen';
import ChatField from '~/components/Chat/ChatField';
import ChatMessage from '~/components/Chat/ChatMessage';
import styled from '~/config/styled-components';
import { fakeChat } from '~/Helpers/FakeData';

const Chat: React.FC = () => {
	const [messages, setMessages] = useState(fakeChat);
	const addMsg = (v: string) => {
		setMessages([
			...messages,
			{ content: v, document: false, id: Math.random() * 100, name: 'me' },
		]);
	};

	return (
		<>
			<AppScreen autoScroll navbar title="Chat">
				<Messages>
					{messages.map((msg) => (
						<ChatMessage key={msg.id} {...msg} />
					))}
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
const Send = styled.View`
	position: absolute;
	bottom: 5px;
	left: 5px;
	right: 5px;
`;

export default Chat;
