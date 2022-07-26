import { Feather } from '@expo/vector-icons';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/core';
import React, { useMemo } from 'react';
import {
	StatusBar,
	StyleProp,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import { useTheme } from 'styled-components';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

export const DrawerBtn: React.FC<{
	navigation: any;
	light?: boolean;
	style?: StyleProp<ViewStyle>;
}> = ({ navigation, style, light = false }) => (
	<TouchableOpacity
		style={style}
		onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
	>
		<Icon size={20} name="menu" light={light} />
	</TouchableOpacity>
);
export const BackBtn: React.FC<{
	navigation: any;
	style?: StyleProp<ViewStyle>;
}> = ({ navigation, style }) => (
	<TouchableOpacity style={style} onPress={() => navigation.goBack()}>
		<Icon size={20} name="arrow-left" />
	</TouchableOpacity>
);

export interface NavBarProps {
	title?: string;
	backIcon?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
	title,
	backIcon = false,
	children,
}) => {
	// used to show drawer btn if available
	const navigation = useNavigation();
	const route = useRoute();
	const theme = useTheme();
	const drawer = useMemo(() => (navigation as any).toggleDrawer, [navigation]);
	if (children) {
		return <Container>{children}</Container>;
	}
	return (
		<Container>
			{backIcon && <BackBtn navigation={navigation} />}
			{drawer && !backIcon && <DrawerBtn navigation={navigation} />}
			<Title drawer={drawer || backIcon} pointerEvents="none">
				<AppText type="title">{title ?? route.name}</AppText>
			</Title>
			{/* <StatusBar
				translucent
				style="auto"
				// backgroundColor={theme.colors.gray[1]}
			/> */}
		</Container>
	);
};
const Container = styled.View`
	/* margin-bottom: 5px; */
	margin-top: -${StatusBar.currentHeight}px;
	padding-top: ${StatusBar.currentHeight}px;
	background-color: ${({ theme }) => theme.colors.gray[1]};
	elevation: 10;
	box-shadow: 1px 1px 1px black;
	height: 100px;
	flex-direction: row;
	width: 100%;
	align-items: center;
	justify-content: center;
`;
const Title = styled.View<{ drawer: boolean }>`
	margin-left: ${({ drawer }) => (drawer ? '-50px' : 0)};
	flex-grow: 1;
	justify-content: center;
	align-items: center;
`;
const Icon = styled(Feather)<{ light: boolean }>`
	padding: 10px;
	color: ${({ theme: { colors }, light }) =>
		light ? colors.white : colors.black};
	/* background: red; */
`;
export default NavBar;
