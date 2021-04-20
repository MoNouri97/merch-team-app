import React from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import AppText from '~/components/AppText';
import { SafeScreen } from '~/components/Shared/AppScreen';
import NavBar from '~/components/Shared/NavBar';
import PlanningItemDetails from '~/components/Shared/PlanningItemDetails';
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
	<SafeScreen>
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
	</SafeScreen>
);

export default MonthlyPlanning;
