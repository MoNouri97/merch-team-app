import React from 'react';
import PlanningCard from '~/components/Home/PlanningCard';
import ProgressCard from '~/components/Home/ProgressCard';
import AppScreen from '~/components/Shared/AppScreen';
import styled from '~/config/styled-components';

const Home: React.FC = () => (
	<Screen center navbar>
		<ProgressCard />
		<PlanningCard />
	</Screen>
);
const Screen = styled(AppScreen)(({ theme }) => ({
	backgroundColor: theme.colors.gray[2],
}));
export default Home;
