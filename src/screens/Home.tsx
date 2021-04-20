import { useNavigation } from '@react-navigation/core';
import React from 'react';
import AppText from '~/components/AppText';
import UserInfo from '~/components/Home/UserInfo';
import { SafeScreen } from '~/components/Shared/AppScreen';
import { DrawerBtn } from '~/components/Shared/NavBar';
import styled from '~/config/styled-components';

const Home: React.FC = () => {
	const nav = useNavigation();
	return (
		<Screen>
			<Header>
				<Drawer navigation={nav} />
				<AppText color="light" type="title">
					Accueil
				</AppText>
			</Header>
			<UserInfo />
		</Screen>
	);
};

// const Home: React.FC = () => (
// 	<Screen center navbar>
// 		<UserInfo />
// 		<ProgressCard />
// 		<PlanningCard />
// 	</Screen>
// );
// const Screen = styled(AppScreen)(({ theme }) => ({
// 	backgroundColor: theme.colors.gray[1],
// }));

const Screen = styled(SafeScreen)(({ theme }) => ({
	backgroundColor: theme.colors.secondary,
}));

const Drawer = styled(DrawerBtn)`
	position: absolute;
	left: 10px;
`;

const Header = styled.View`
	margin-top: 20px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;
export default Home;
