import React from 'react';
import { ListRenderItem, View } from 'react-native';
import { useGetPlannings } from '~/api/PlanningAPI';
import AppText from '~/components/AppText';
import { SafeScreen } from '~/components/Shared/AppScreen';
import NavBar from '~/components/Shared/NavBar';
import PlanningItemDetails from '~/components/Shared/PlanningItemDetails';
import displayDate from '~/Helpers/displayDate';
import { PlanningDetails } from '~/types/models/PlanningDetails';

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
const Item: React.FC<{
	planning: PlanningDetails[];
}> = ({ planning }) => (
	<View style={{ padding: 15 }}>
		{planning.map((p) => (
			<PlanningItemDetails
				{...p}
				key={p.id}
				// {...{
				// key: p.id,
				// 	GMS: p.gms.name,
				// 	done: p.state == 'DONE',
				// 	status: p.state,
				// 	time: 10,
				// }}
			/>
		))}
	</View>
);
const MonthlyPlanning: React.FC = () => {
	const { data } = useGetPlannings();
	console.log(data);

	return (
		<SafeScreen>
			<NavBar />
			{data ? <Item planning={data.tasks} /> : null}
		</SafeScreen>
	);
};

export default MonthlyPlanning;

{
	/* <FlatList
	initialNumToRender={3}
	maxToRenderPerBatch={3}
	// eslint-disable-next-line react-native/no-inline-styles
	contentContainerStyle={{ padding: 15 }}
	data={fakePlannings}
	renderItem={ListItem}
	keyExtractor={({ day }) => day.toString()} /> */
}
