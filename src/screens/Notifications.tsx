import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FancyListItem from '~/components/Shared/FancyListItem';
import NavBar from '~/components/Shared/NavBar';
import styled from '~/config/styled-components';
import displayDate from '~/Helpers/displayDate';
import { fakeNotifications } from '~/Helpers/FakeData';

const Notifications: React.FC = () => (
	<Screen>
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
	</Screen>
);
const Screen = styled.SafeAreaView`
	background-color: ${({ theme }) => theme.colors.white};
	flex: 1;
	padding-top: ${Platform.OS === 'android'
		? `${StatusBar.currentHeight}px`
		: '0px'};
`;

export default Notifications;
