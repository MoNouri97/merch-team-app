import React from 'react';
import {
	FlatList,
	ListRenderItem,
	Platform,
	StatusBar,
	View,
} from 'react-native';
import AppText from '~/components/AppText';
import NavBar from '~/components/Shared/NavBar';
import PlanningItemDetails from '~/components/Shared/PlanningItemDetails';
import { Card } from '~/components/Shared/sharedStyles';
import styled from '~/config/styled-components';
import { myTheme } from '~/config/theme';
import displayDate from '~/Helpers/displayDate';
import { fakePlannings } from '~/Helpers/FakeData';
import { PlanningStatus } from '~/types/data';

const statusToColor = (
	status: PlanningStatus,
	colors: typeof myTheme.colors
) => {
	switch (status) {
		case 'DONE':
			return colors.green;
		case 'DELAYED':
			return colors.red;
		case 'NO_REPORT':
			return colors.yellow;
		default:
			return colors.gray[2];
	}
};

const ListItem: ListRenderItem<{
	day: Date;
	planning: any[];
}> = ({ item }) => (
	<View>
		<AppText type="label">{displayDate(item.day)}</AppText>
		{item.planning.map((d) => {
			const { status, ...planning } = d;

			return (
				<Item key={planning.GMS} status={status}>
					<PlanningItemDetails
						lightColor={(status as PlanningStatus) !== 'TODO'}
						{...planning}
					/>
				</Item>
			);
		})}
	</View>
);
const MonthlyPlanning: React.FC = () => (
	<Screen>
		<NavBar />
		<FlatList
			initialNumToRender={3}
			maxToRenderPerBatch={3}
			// eslint-disable-next-line react-native/no-inline-styles
			contentContainerStyle={{ padding: 15 }}
			data={fakePlannings}
			renderItem={ListItem}
			keyExtractor={({ day }) => day.toString()}
		/>
	</Screen>
);
const Screen = styled.SafeAreaView`
	background-color: ${({ theme }) => theme.colors.white};
	flex: 1;
	padding-top: ${Platform.OS === 'android'
		? `${StatusBar.currentHeight}px`
		: '0px'};
`;

const Item = styled(Card)<{ status: PlanningStatus }>`
	elevation: 0;
	margin-bottom: 10px;
	background: ${({ status, theme: { colors } }) =>
		statusToColor(status, colors)};
	padding: 10px;
	/* border-radius: ${({ theme }) => '20px'}; */
`;
export default MonthlyPlanning;
