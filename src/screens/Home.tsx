import React from 'react';
import PlanningCard from '~/components/Home/PlanningCard';
import ProgressCard from '~/components/Home/ProgressCard';
import UserInfo from '~/components/Home/UserInfo';
import AppScreen from '~/components/Shared/AppScreen';
import styled from '~/config/styled-components';

const Home: React.FC = () => (
	<Screen center navbar>
		<UserInfo />
		<ProgressCard />
		<PlanningCard />
	</Screen>
);
const Screen = styled(AppScreen)(({ theme }) => ({
	backgroundColor: theme.colors.gray[2],
}));
export default Home;
