import React from 'react';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

interface IProps {}

const PlanningDaily: React.FC<IProps> = ({}) => {
	return (
		<Container>
			<AppText>Hello From PlanningDaily</AppText>
		</Container>
	);
};
const Container = styled.View``;
export default PlanningDaily;
