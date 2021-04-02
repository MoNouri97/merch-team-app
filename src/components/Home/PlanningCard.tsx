import React from 'react';
import PlanningItem from './PlanningItem';
import { Card } from '../sharedStyles';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import { displayDate } from '~/Helpers/displayDate';
import { fakePlannings } from '~/Helpers/FakeData';

const PlanningCard: React.FC = () => (
	<Container>
		<AppText type="subtitle">{displayDate(new Date())}</AppText>
		{fakePlannings[0].planning.map((planning) => (
			<PlanningItem key={planning.GMS} {...planning} />
		))}
	</Container>
);
const Container = styled(Card)`
	margin-top: 10px;
	margin-bottom: 10px;
`;
export default PlanningCard;
