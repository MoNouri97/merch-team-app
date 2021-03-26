import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { myTheme } from '~/config/theme';
import Testing from '~/screens/Testing';
import AppScreen from '~/components/AppScreen';
import { ThemeProvider } from '~/config/styled-components';
import Btn from '~/components/Btn';

export default function App() {
	return (
		<ThemeProvider theme={myTheme}>
			<Testing />
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({});
