import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import Home from './Home';
import MapGMS from './MapGMS';
import Report from './Report';

const Stack = createStackNavigator();
const HomeStack: React.FC = () => {
	// code here ...
	console.log('Hello From HomeStack');
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen name="Accueil" component={Home} />
			<Stack.Screen name="MapGMS" component={MapGMS} />
			<Stack.Screen
				name="Report"
				component={Report}
				options={{
					cardOverlayEnabled: true,
					gestureEnabled: true,
					...TransitionPresets.ModalSlideFromBottomIOS,
				}}
			/>
		</Stack.Navigator>
	);
};
export default HomeStack;
