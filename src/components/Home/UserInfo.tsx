import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useContext } from 'react';
import AppText from '~/components/AppText';
import { Press } from '~/components/Shared/Btn';
import styled from '~/config/styled-components';
import { UserContext } from '~/context/UserContext';

const UserInfo: React.FC = () => {
	const { user, signOut } = useContext(UserContext)!;
	console.log({ user });

	const navigation = useNavigation();
	return (
		<Container>
			<Info>
				<AppText color="light" type="subtitle">
					{user?.name}
				</AppText>
				<AppText color="light" size={12}>
					{user?.email}
				</AppText>
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
	padding: 20px;
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
	color: ${({ theme }) => theme.colors.white};
`;

const IconBtn = styled(Press).attrs(() => ({
	android_ripple: { borderless: true },
}))`
	background: ${({ theme }) => theme.colors.transparent};
	border-radius: ${({ theme }) => theme.borderRadius};
	padding: 15px;
	overflow: hidden;
	margin-left: 10px;
`;
export default UserInfo;
