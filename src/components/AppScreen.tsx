import NavBar from './NavBar';
import React from 'react';
import {
	Platform,
	ScrollView,
	StatusBar,
	StyleProp,
	ViewStyle,
} from 'react-native';
import styled from '~/config/styled-components';

interface Props {
	style?: StyleProp<ViewStyle>;
	navbar?: boolean;
}

// eslint-disable-next-line react/prop-types
const AppScreen: React.FC<Props> = ({ children, style, navbar = false }) => (
	<Safe style={style}>
		<ScrollView
		// style={{ backgroundColor: 'tomato', height: '100%' }}
		>
			{navbar && <NavBar />}
			<Container>{children}</Container>
		</ScrollView>
	</Safe>
);
const Safe = styled.SafeAreaView`
	background-color: ${({ theme }) => theme.colors.white};
	flex: 1;
	justify-content: center;
	align-items: stretch;
	padding-top: ${Platform.OS == 'android'
		? StatusBar.currentHeight + 'px'
		: '0px'};
`;
const Container = styled.View`
	padding: 15px;
	justify-content: center;
	flex-grow: 1;
`;
export default AppScreen;
