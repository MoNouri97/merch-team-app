/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable camelcase */
import {
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_700Bold,
	useFonts,
} from '@expo-google-fonts/dm-sans';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '~/config/styled-components';
import { myTheme } from '~/config/theme';
import { UserContextProvider } from '~/context/UserContext';
import MainStackNavigation from '~/screens/Navigation/MainStackNavigation';

const queryClient = new QueryClient();
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
		<UserContextProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={myTheme}>
					<StatusBar style="auto" />
					<MainStackNavigation />
				</ThemeProvider>
			</QueryClientProvider>
		</UserContextProvider>
	);
}
