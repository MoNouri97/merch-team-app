import React from 'react';
import { View } from 'react-native';
import AppScreen from '~/components/AppScreen';
import AppText from '~/components/AppText';
import PlanningItemDetails from '~/components/Shared/PlanningItemDetails';
import { Card } from '~/components/sharedStyles';
import styled from '~/config/styled-components';
import { displayDate } from '~/Helpers/displayDate';
import { Data } from '~/Helpers/planningFakeData';
import { PlanningStatus } from '~/types/data';

const MonthlyPlanning: React.FC = () => (
	<Screen navbar>
		{Data.map((day, i) => (
			<View key={day.day.toString()}>
				<AppText type="label">{displayDate(day.day)}</AppText>
				{day.planning.map((d) => {
					const { status, ...planning } = d;
					return (
						<Item key={planning.GMS} status={status}>
							<PlanningItemDetails lightColor {...planning} />
						</Item>
					);
				})}
			</View>
		))}
	</Screen>
);
const Screen = styled(AppScreen)(({ theme }) => ({
	// backgroundColor: theme.colors.gray[2],
}));

const Item = styled(Card)<{ status: PlanningStatus }>`
	elevation: 0;
	margin-bottom: 10px;
	background: ${({ status, theme: { colors } }) =>
		status === 'TODO'
			? colors.yellow
			: status === 'DONE'
			? colors.green
			: colors.red};
	padding: 10px;
	/* border-radius: ${({ theme }) => '20px'}; */
`;
export default MonthlyPlanning;
