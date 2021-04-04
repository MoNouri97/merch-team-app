import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './Home';
import MapGMS from './MapGMS';

const Stack = createStackNavigator();
const HomeStack: React.FC = () => {
	// code here ...
	console.log('Hello From HomeStack');
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Accueil" component={Home} />
			<Stack.Screen name="MapGMS" component={MapGMS} />
		</Stack.Navigator>
	);
};
export default HomeStack;
