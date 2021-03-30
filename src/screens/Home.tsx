import React from 'react';
import AppScreen from '~/components/AppScreen';
import ProgressCard from '~/components/ProgressCard';
import styled from '~/config/styled-components';

interface IProps {}

const Home: React.FC<IProps> = ({}) => {
	return (
		<Container navbar>
			<ProgressCard />
		</Container>
	);
};
const Container = styled(AppScreen)(({ theme }) => ({
	backgroundColor: theme.colors.gray[2],
}));
export default Home;
