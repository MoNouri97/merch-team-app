import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

interface ChatListItemProps {
	data: { id: number; name: string };
	onPress: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ data, onPress }) => {
	return (
		<TouchableOpacity key={data.id} onPress={onPress}>
			<ChatCard>
				<AppText size={15}>{data.name}</AppText>
				<Icon size={20} name="chevron-right" />
			</ChatCard>
		</TouchableOpacity>
	);
};
const ChatCard = styled.View`
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.gray[2]};
	padding: 20px;
	margin: 5px;
	flex-direction: row;
	justify-content: space-between;
`;
const Icon = styled(Feather)`
	color: ${({ theme }) => theme.colors.gray[3]};
`;
export default ChatListItem;
