import React from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useGetPlannings } from '~/api/PlanningAPI';
import AppText from '~/components/AppText';
import { SafeScreen } from '~/components/Shared/AppScreen';
import NavBar from '~/components/Shared/NavBar';
import PlanningItemDetails from '~/components/Shared/PlanningItemDetails';
import { PlanningDetails } from '~/types/models/PlanningDetails';

const ListItem: ListRenderItem<PlanningDetails[]> = ({ item }) => (
	<View>
		<AppText type="label">{item[0].taskDate}</AppText>
		{item.map((p) => (
			<PlanningItemDetails {...p} key={p.id} />
		))}
	</View>
);
const days = [
	'Dimanche',
	'Lundi',
	'Mardi',
	'Mercredi',
	'Jeudi',
	'Vendredi',
	'Samedi',
];
// FIXME change this
const groupTasks = (tasks: PlanningDetails[]) => {
	const groups: PlanningDetails[][] = [];
	const dates: string[] = [];
	for (const t of tasks) {
		let idx = dates.findIndex((v) => v == t.taskDate);
		idx = idx >= 0 ? idx : groups.length;
		dates.push(t.taskDate);
		const old = groups[idx] ?? [];
		groups[idx] = [...old, t];
	}
	return groups;
};
const Item: React.FC<{
	planning: PlanningDetails[];
}> = ({ planning }) => (
	<View style={{ padding: 15 }}>
		{planning.map((p) => (
			<PlanningItemDetails {...p} key={p.id} />
		))}
	</View>
);
const MonthlyPlanning: React.FC = () => {
	const { data } = useGetPlannings();
	// TODO test
	return (
		<SafeScreen>
			<NavBar />
			{!!data && (
				<FlatList
					initialNumToRender={3}
					maxToRenderPerBatch={3}
					// eslint-disable-next-line react-native/no-inline-styles
					contentContainerStyle={{ padding: 15 }}
					data={groupTasks(data.tasks!)}
					renderItem={ListItem}
					keyExtractor={(p) => p[0].taskDate}
				/>
			)}
			{/* {!!data &&
				groupTasks(data.tasks!).map((t, i) => (
					<Fragment key={i}>
						<AppText type="label">{days[i]}</AppText>
						<Item planning={t} />
					</Fragment>
				))} */}
			{/* {data ? <Item planning={data.tasks} /> : null} */}
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
