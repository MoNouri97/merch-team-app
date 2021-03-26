import React from 'react';
import {
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from 'react-native';
import styled from '~/config/styled-components';

interface Props {
	style?: StyleProp<ViewStyle>;
}

// eslint-disable-next-line react/prop-types
const AppScreen: React.FC<Props> = ({ children, style }) => (
	<Safe style={style}>
		<ScrollView
			contentContainerStyle={{ padding: 10 }}
			// style={{ backgroundColor: 'tomato', height: '100%' }}
		>
			{children}
		</ScrollView>
	</Safe>
);
const Safe = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	align-items: stretch;
	padding-top: ${Platform.OS == 'android'
		? StatusBar.currentHeight + 'px'
		: '0px'};
`;
const styles = StyleSheet.create({
	container: {
		// width: '100%',
		// flex: 1,
		paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
	},
});
export default AppScreen;
