/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable camelcase */
import {
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_700Bold,
	useFonts,
} from '@expo-google-fonts/dm-sans';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { LogBox } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as encoding from 'text-encoding';
import { ThemeProvider } from '~/config/styled-components';
import { myTheme } from '~/config/theme';
import { ModalContextProvider } from '~/context/ModalContext';
import { UserContextProvider } from '~/context/UserContext';
import defineGeofencingTask from '~/Helpers/defineGeofencingTask';
import MainStackNavigation from '~/screens/Navigation/MainStackNavigation';

// react-native warning
LogBox.ignoreLogs(['Setting a timer']);
// necessary for Stomjs
console.log(!!encoding);

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: false, staleTime: 5000 } },
});
export default function App() {
	// fonts
	const [fontsLoaded] = useFonts({
		DMSans_400Regular,
		DMSans_500Medium,
		DMSans_700Bold,
	});
	// geoFencing
	defineGeofencingTask();

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<UserContextProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={myTheme}>
					<ModalContextProvider>
						<MainStackNavigation />
					</ModalContextProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</UserContextProvider>
	);
}
