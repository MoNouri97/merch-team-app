import React from 'react';
import {
	Platform,
	SafeAreaView,
	StatusBar,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from 'react-native';

interface Props {
	style?: StyleProp<ViewStyle>;
}

// eslint-disable-next-line react/prop-types
const AppScreen: React.FC<Props> = ({ children, style }) => (
	<SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
);
const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',

		// paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
	},
});
export default AppScreen;
