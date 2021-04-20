import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useContext } from 'react';
import AppText from '~/components/AppText';
import { Press } from '~/components/Shared/Btn';
import styled from '~/config/styled-components';
import { UserContext } from '~/context/UserContext';

const UserInfo: React.FC = () => {
	const { user, signOut } = useContext(UserContext)!;
	const navigation = useNavigation();
	return (
		<Container>
			<Info>
				<AppText type="subtitle">{user?.name}</AppText>
				<AppText>{user?.email}</AppText>
			</Info>
			<Icons>
				<IconBtn onPress={signOut}>
					<Icon name="log-out" size={20} />
				</IconBtn>
				<IconBtn onPress={() => navigation.navigate('Notifications')}>
					<Icon name="bell" size={20} />
				</IconBtn>
			</Icons>
		</Container>
	);
};
const Container = styled.View`
	margin-vertical: 20px;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
`;
const Info = styled.View`
	max-width: 60%;
`;
const Icons = styled.View`
	flex-direction: row;
	flex-shrink: 0;
`;
const Icon = styled(Feather)`
	color: ${({ theme }) => theme.colors.primary};
`;

const IconBtn = styled(Press)`
	background: ${({ theme }) => theme.colors.white};
	border-radius: 10px;
	padding: 15px;
	margin-left: 10px;
`;
export default UserInfo;
