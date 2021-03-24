import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '~/config/theme';
import Testing from '~/screens/Testing';

export default function App() {
	return (
		<View style={styles.container}>
			<Testing />
			{/* eslint-disable-next-line react/style-prop-object */}
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.bg,
		alignItems: 'center',
		width: '100%',
		justifyContent: 'center',
	},
});
