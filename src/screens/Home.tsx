import React from 'react';
import AppScreen from '~/components/AppScreen';
import PlanningCard from '~/components/Home/PlanningCard';
import ProgressCard from '~/components/Home/ProgressCard';
import styled from '~/config/styled-components';

const Home: React.FC = () => (
	<Screen navbar>
		<ProgressCard />
		<PlanningCard />
	</Screen>
);
const Screen = styled(AppScreen)(({ theme }) => ({
	backgroundColor: theme.colors.gray[2],
}));
export default Home;
