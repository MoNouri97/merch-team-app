import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppScreen from '~/components/AppScreen';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import { fakeProducts } from '~/Helpers/FakeData';

const ChatList: React.FC = () => {
	const nav = useNavigation();

	return (
		<AppScreen title="Chat" navbar>
			{fakeProducts.slice(0, 3).map((v) => (
				<TouchableOpacity
					key={v.id}
					onPress={() => {
						setTimeout(() => {
							nav.navigate('ChatIndividual');
						}, 0);
					}}
				>
					<ChatCard>
						<AppText size={15}>{v.name}</AppText>
						<Icon size={20} name="chevron-right" />
					</ChatCard>
				</TouchableOpacity>
			))}
		</AppScreen>
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
export default ChatList;
