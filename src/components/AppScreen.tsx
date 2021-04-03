import React from 'react';
import {
	Platform,
	ScrollView,
	StatusBar,
	StyleProp,
	ViewStyle,
} from 'react-native';
import styled from '~/config/styled-components';
import NavBar from './NavBar';

interface Props {
	style?: StyleProp<ViewStyle>;
	navbar?: boolean;
}

const AppScreen: React.FC<Props> = ({ children, style, navbar = false }) => (
	<Safe style={style}>
		{navbar && <NavBar />}
		<ScrollView
			bounces={false}
			// style={{ backgroundColor: 'tomato', height: '100%' }}
		>
			<Container>{children}</Container>
		</ScrollView>
	</Safe>
);
const Safe = styled.SafeAreaView`
	background-color: ${({ theme }) => theme.colors.white};
	flex: 1;
	justify-content: center;
	align-items: stretch;
	padding-top: ${Platform.OS === 'android'
		? `${StatusBar.currentHeight}px`
		: '0px'};
`;
const Container = styled.View`
	padding: 15px;
	justify-content: center;
	flex-grow: 1;
`;
export default AppScreen;
