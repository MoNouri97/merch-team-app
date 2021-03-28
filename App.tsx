import AppLoading from 'expo-app-loading';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_700Bold,
	useFonts,
} from '@expo-google-fonts/dm-sans';
import { ThemeProvider } from '~/config/styled-components';
import { myTheme } from '~/config/theme';
import Testing from '~/screens/Testing';
import SignIn from '~/screens/SignIn';
import DrawerNav from '~/screens/Drawer/DrawerNav';

const Stack = createStackNavigator();
export default function App() {
	// fonts
	let [fontsLoaded] = useFonts({
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
					<Stack.Screen name="Connexion" component={SignIn} />
					<Stack.Screen name="Home" component={DrawerNav} />
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}
