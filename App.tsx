import AppLoading from 'expo-app-loading';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import {
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_700Bold,
	useFonts,
} from '@expo-google-fonts/dm-sans';
import { ThemeProvider } from '~/config/styled-components';
import { myTheme } from '~/config/theme';
import Testing from '~/screens/Testing';

const Drawer = createDrawerNavigator();
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
				<Drawer.Navigator initialRouteName="Home">
					<Drawer.Screen name="Home" component={Testing} />
				</Drawer.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({});
