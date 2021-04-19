import React, { useContext } from 'react';
import AppText from '~/components/AppText';
import PlanningCard from '~/components/Home/PlanningCard';
import ProgressCard from '~/components/Home/ProgressCard';
import AppScreen from '~/components/Shared/AppScreen';
import styled from '~/config/styled-components';
import { UserContext } from '~/context/UserContext';

const Home: React.FC = () => {
	const { user } = useContext(UserContext);
	return (
		<Screen center navbar>
			<AppText type="title">{user?.name}</AppText>
			<ProgressCard />
			<PlanningCard />
		</Screen>
	);
};
const Screen = styled(AppScreen)(({ theme }) => ({
	backgroundColor: theme.colors.gray[2],
}));
export default Home;
