import React, { useRef } from 'react';
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
	title?: string;
	center?: boolean;
	autoScroll?: boolean;
}

const AppScreen: React.FC<Props> = ({
	children,
	style,
	navbar = false,
	title,
	center = false,
	autoScroll = false,
}) => {
	const ref = useRef<ScrollView>(null);
	return (
		<Safe style={style}>
			{navbar && <NavBar title={title} />}
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
		</Safe>
	);
};
const Safe = styled.SafeAreaView`
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
