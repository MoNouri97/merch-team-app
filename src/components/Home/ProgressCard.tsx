import React from 'react';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import displayDate from '~/Helpers/displayDate';
import ProgressBar from './ProgressBar';

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
const ProgressCard: React.FC<{ color: 'light' | 'dark' }> = ({ color }) => (
	<Container>
		<AppText type="label" color={color}>
			Objectifs
		</AppText>
		<AppText size={12} color={color}>
			{displayDate(Data.date)}
		</AppText>
		<PercentText size={40} color={color}>
			{Data.global}%
		</PercentText>
		<ProgressBar percent={Data.global} />
		<Objectives>
			{Data.categories.map(({ name, percent }) => (
				<Row key={name}>
					<CatText numberOfLines={1} type="label" color={color}>
						{name}
					</CatText>
					<ProgressBar percent={percent} />
				</Row>
			))}
		</Objectives>
	</Container>
);

const Objectives = styled.View`
	margin: 10px;
`;
const Container = styled.View`
	padding: 20px;
	margin: 0 20px 20px;
	border-radius: ${({ theme }) => theme.borderRadiusLarge};
	background: ${({ theme: { colors } }) => colors.transparent};
`;
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
