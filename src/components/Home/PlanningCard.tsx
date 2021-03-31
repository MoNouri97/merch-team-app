import PlanningItem from './PlanningItem';
import React from 'react';
import { Card } from '../sharedStyles';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import { displayDate } from '~/Helpers/displayDate';

interface IProps {}

const Data = [
	{
		GMS: 'GMS1',
		state: false,
		time: 30,
	},
	{
		GMS: 'GMS2',
		state: true,
		time: 10,
	},
	{
		GMS: 'GMS3',
		state: false,
		time: 20,
	},
	{
		GMS: 'GMS4',
		state: true,
		time: 15,
	},
];
const PlanningCard: React.FC<IProps> = ({}) => {
	return (
		<Container>
			<AppText type="subtitle">{displayDate(new Date())}</AppText>
			{Data.map((planning) => (
				<PlanningItem {...planning} />
			))}
		</Container>
	);
};
const Container = styled(Card)`
	margin-top: 10px;
	margin-bottom: 10px;
`;
export default PlanningCard;
