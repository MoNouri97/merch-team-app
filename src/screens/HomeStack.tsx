import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import Notifications from '~/screens/Notifications';
import Home from './Home';
import MapGMS from './MapGMS';
import Report from './Report';

const Stack = createStackNavigator();
const HomeStack: React.FC = () => (
	<Stack.Navigator
		headerMode="none"
		screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}
	>
		<Stack.Screen name="Accueil" component={Home} />
		<Stack.Screen name="Notifications" component={Notifications} />
		<Stack.Screen name="MapGMS" component={MapGMS} />
		<Stack.Screen
			name="Report"
			component={Report}
			// options={{
			// 	cardOverlayEnabled: true,
			// 	gestureEnabled: true,
			// 	...TransitionPresets.ModalSlideFromBottomIOS,
			// }}
		/>
	</Stack.Navigator>
);
export default HomeStack;
