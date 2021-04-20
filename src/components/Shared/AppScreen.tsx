import React, { useRef } from 'react';
import {
	Platform,
	ScrollView,
	StatusBar,
	StyleProp,
	ViewStyle,
} from 'react-native';
import styled from '~/config/styled-components';
import NavBar, { NavBarProps } from './NavBar';

interface Props {
	style?: StyleProp<ViewStyle>;
	navbar?: boolean;
	title?: string;
	center?: boolean;
	autoScroll?: boolean;
	navBarProps?: NavBarProps;
}

const AppScreen: React.FC<Props> = ({
	children,
	style,
	navbar = false,
	title,
	center = false,
	autoScroll = false,
	navBarProps,
}) => {
	const ref = useRef<ScrollView>(null);
	return (
		<SafeScreen style={style}>
			{navbar && <NavBar title={title} {...navBarProps} />}
			<ScrollView
				// eslint-disable-next-line react-native/no-inline-styles
				contentContainerStyle={{ flexGrow: 1 }}
				bounces={false}
				ref={ref}
				onContentSizeChange={
					!autoScroll
						? undefined
						: () => {
								ref.current?.scrollToEnd();
						  }
				}
			>
				<Container center={center}>{children}</Container>
			</ScrollView>
		</SafeScreen>
	);
};
export const SafeScreen = styled.SafeAreaView`
	background-color: ${({ theme }) => theme.colors.white};
	flex: 1;
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
