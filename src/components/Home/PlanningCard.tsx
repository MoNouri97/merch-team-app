import React from 'react';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import displayDate from '~/Helpers/displayDate';
import { fakePlannings } from '~/Helpers/FakeData';
import PlanningItem from './PlanningItem';

const PlanningCard: React.FC = () => (
	<Container>
		<AppText type="label" color="dark">
			Planning : {displayDate(new Date())}
		</AppText>
		<Plannings>
			{fakePlannings[0].planning.map((planning) => (
				<PlanningItem key={planning.GMS} {...planning} />
			))}
		</Plannings>
	</Container>
);

const Plannings = styled.View`
	margin-top: 20px;
`;

const Container = styled.View`
	padding: 20px;
	margin-top: 10px;
	margin-bottom: 10px;
`;
export default PlanningCard;
