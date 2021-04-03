/* eslint-disable camelcase */
import {
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_700Bold,
	useFonts,
} from '@expo-google-fonts/dm-sans';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from '~/config/styled-components';
import { myTheme } from '~/config/theme';
import DrawerNav from '~/screens/Drawer/DrawerNav';
import SignIn from '~/screens/SignIn';

const Stack = createStackNavigator();
export default function App() {
	// fonts
	const [fontsLoaded] = useFonts({
		DMSans_400Regular,
		DMSans_500Medium,
		DMSans_700Bold,
	});
	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<ThemeProvider theme={myTheme}>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Home" component={DrawerNav} />
					<Stack.Screen name="Connexion" component={SignIn} />
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}
