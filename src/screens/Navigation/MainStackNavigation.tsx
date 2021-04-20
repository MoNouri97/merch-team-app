import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import React, { useContext } from 'react';
import { UserContext } from '~/context/UserContext';
import DrawerNav from '~/screens/Navigation/DrawerNav';
import SignIn from '~/screens/SignIn';

const Stack = createStackNavigator();
const MainStackNavigation: React.FC = () => {
	const { isSignedIn, isLoading } = useContext(UserContext)!;
	if (isLoading) return <AppLoading />;
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{isSignedIn ? (
					<Stack.Screen name="Home" component={DrawerNav} />
				) : (
					<Stack.Screen name="Connexion" component={SignIn} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};
export default MainStackNavigation;
