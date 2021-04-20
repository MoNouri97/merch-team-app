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
import styled from '~/config/styled-components';
import displayDate from '~/Helpers/displayDate';
import { fakePlannings } from '~/Helpers/FakeData';

const ListItem: ListRenderItem<{
	day: Date;
	planning: any[];
}> = ({ item }) => (
	<View>
		<AppText type="label">{displayDate(item.day)}</AppText>
		{item.planning.map((planning) => (
			<PlanningItemDetails key={planning.GMS} {...planning} />
		))}
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

export default MonthlyPlanning;
