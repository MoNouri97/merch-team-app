import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerNav from '~/screens/Navigation/DrawerNav';
import SignIn from '~/screens/SignIn';

const Stack = createStackNavigator();
const MainStackNavigation: React.FC = () => (
	<NavigationContainer>
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={DrawerNav} />
			<Stack.Screen name="Connexion" component={SignIn} />
		</Stack.Navigator>
	</NavigationContainer>
);
export default MainStackNavigation;
