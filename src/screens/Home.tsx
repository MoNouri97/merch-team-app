import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AppText from '~/components/AppText';
import PlanningCard from '~/components/Home/PlanningCard';
import ProgressCard from '~/components/Home/ProgressCard';
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
			<ScrollView
				stickyHeaderIndices={[0]}
				// eslint-disable-next-line react-native/no-inline-styles
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Sticky>
					<UserInfo />
					{/* <ProgressCard color="light" /> */}
				</Sticky>
				<ContentBG>
					<ProgressCard color="dark" />
					<PlanningCard />
				</ContentBG>
			</ScrollView>
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
const Sticky = styled.View``;

const ContentBG = styled.View`
	background-color: ${({ theme }) => theme.colors.white};
	flex-grow: 1;
	padding-horizontal: 10px;
	z-index: 100;
	padding-top: 40px;
	border-radius: ${({ theme: { borderRadius: br } }) =>
		`${parseInt(br.slice(0, 2), 10) * 3.7}px`};
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
`;
const Screen = styled(SafeScreen)(({ theme }) => ({
	backgroundColor: theme.colors.secondary,
}));

const Drawer = styled(DrawerBtn)`
	position: absolute;
	left: 10px;
`;

const Header = styled.View`
	background-color: ${({ theme }) => theme.colors.secondary};
	margin-top: 20px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;
export default Home;
