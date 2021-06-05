import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { useGetAdmin } from '~/api/UserAPI';
import ChatListItem from '~/components/Chat/ChatListItem';
import AppScreen from '~/components/Shared/AppScreen';
import { ChatStackNav } from '~/types/navigation';

// TODO : test
const ChatList: React.FC = () => {
	const nav = useNavigation<ChatStackNav<'ChatList'>>();
	const { data: admins } = useGetAdmin();

	return (
		<AppScreen title="Chat" navbar>
			{admins &&
				admins.map((admin) => (
					<ChatListItem
						data={admin}
						onPress={() => {
							setTimeout(() => {
								nav.navigate('ChatIndividual', { id: admin.id });
							}, 0);
						}}
					/>
				))}
			{/* <ChatListItem
				data={{ id: -1, name: 'Groupe' }}
				onPress={() => {
					setTimeout(() => {
						nav.navigate('ChatIndividual', { id: -1 });
					}, 0);
				}}
			/> */}
		</AppScreen>
	);
};

export default ChatList;
