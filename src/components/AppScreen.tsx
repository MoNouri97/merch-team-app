import React from 'react';
import {
	Platform,
	ScrollView,
	ScrollViewProps,
	StatusBar,
	StyleProp,
	ViewStyle,
} from 'react-native';
import styled from '~/config/styled-components';
import NavBar from './NavBar';

interface Props {
	style?: StyleProp<ViewStyle>;
	navbar?: boolean;
	center?: boolean;
	scrollProps?: ScrollViewProps;
}

const AppScreen: React.FC<Props> = ({
	children,
	style,
	navbar = false,
	center = false,
	scrollProps,
}) => (
	<Safe style={style}>
		{navbar && <NavBar />}
		<ScrollView
			// eslint-disable-next-line react-native/no-inline-styles
			contentContainerStyle={{ flexGrow: 1 }}
			bounces={false}
			{...scrollProps}
		>
			<Container center={center}>{children}</Container>
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
const Container = styled.View<{ center: boolean }>`
	padding: 15px;
	justify-content: ${({ center }) => (center ? 'space-evenly' : 'flex-start')};
	flex-grow: 1;
`;
export default AppScreen;
