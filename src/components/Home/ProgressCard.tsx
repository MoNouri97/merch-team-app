import ProgressBar from './ProgressBar';
import React from 'react';
import { Card } from '../sharedStyles';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import { displayDate } from '~/Helpers/displayDate';

interface IProps {}
const Data = {
	date: new Date(),
	global: 80,
	categories: [
		{
			name: 'cat1',
			percent: 20,
		},
		{
			name: 'cat2',
			percent: 60,
		},
	],
};
const ProgressCard: React.FC<IProps> = ({}) => {
	return (
		<Container>
			<AppText type="subtitle">Objectifs</AppText>
			<AppText type="label" color="dimmed">
				{displayDate(Data.date)}
			</AppText>
			<PercentText type="title">{Data.global}%</PercentText>
			<ProgressBar percent={Data.global} />
			{Data.categories.map(({ name, percent }) => (
				<Row key={name}>
					<CatText numberOfLines={1} type="label" color="dimmed">
						{name}
					</CatText>
					<ProgressBar percent={percent} />
				</Row>
			))}
		</Container>
	);
};
const Container = styled(Card)``;
const CatText = styled(AppText)`
	width: 30%;
`;
const PercentText = styled(AppText)`
	width: 100%;
	text-align: center;
	margin-vertical: 10px;
`;
const Row = styled.View`
	flex-direction: row;
	margin-top: 20px;
`;
export default ProgressCard;
