import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Chat from '~/screens/Chat/Chat';
import ChatList from './ChatList';

const Stack = createStackNavigator();
const ChatStack: React.FC = () => (
	<>
		<Stack.Navigator
			headerMode="none"
			screenOptions={{ animationEnabled: false }}
		>
			<Stack.Screen name="ChatMain" component={ChatList} />
			<Stack.Screen name="ChatIndividual" component={Chat} />
		</Stack.Navigator>
	</>
);
export default ChatStack;
