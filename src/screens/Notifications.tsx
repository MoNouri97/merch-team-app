import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeScreen } from '~/components/Shared/AppScreen';
import FancyListItem from '~/components/Shared/FancyListItem';
import NavBar from '~/components/Shared/NavBar';
import displayDate from '~/Helpers/displayDate';
import { fakeNotifications } from '~/Helpers/FakeData';

const Notifications: React.FC = () => (
	<SafeScreen>
		<NavBar backIcon />
		<FlatList
			// eslint-disable-next-line react-native/no-inline-styles
			contentContainerStyle={{ padding: 15 }}
			keyExtractor={(item) => item.id.toString()}
			data={fakeNotifications}
			renderItem={({ item }) => (
				<FancyListItem header={item.name} subHeader={displayDate(item.date)} />
			)}
		/>
	</SafeScreen>
);

export default Notifications;
