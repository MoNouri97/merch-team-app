import AppText from './AppText';
import React, { useContext, useMemo } from 'react';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import { Platform, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from 'styled-components';
import styled from '~/config/styled-components';

interface Props {
	title?: string;
}

const NavBar: React.FC<Props> = ({ title }) => {
	// used to show drawer btn if available
	const navigation = useNavigation();
	const route = useRoute();
	const theme = useContext(ThemeContext);
	const drawer = useMemo(() => navigation['toggleDrawer'], [navigation]);

	return (
		<Container>
			{drawer && (
				<TouchableOpacity
					onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
				>
					<Icon size={30} name="menu" />
				</TouchableOpacity>
			)}
			<Title drawer={drawer} pointerEvents="none">
				<AppText type="title">{title ?? route.name}</AppText>
			</Title>
			<StatusBar style="auto" backgroundColor={theme.colors.gray[1]} />
		</Container>
	);
};
const Container = styled.View`
	margin-bottom: 5px;
	background-color: ${({ theme }) => theme.colors.gray[1]};
	/* padding: 20px 10px; */
	height: 70px;
	flex-direction: row;
	width: 100%;
	align-items: center;
	justify-content: center;
`;
/* padding-top: ${Platform.OS == 'android'
		? StatusBar.currentHeight + 'px'
		: '0px'}; */
const Title = styled.View<{ drawer: boolean }>`
	margin-left: ${({ drawer }) => (drawer ? '-50px' : 0)};
	flex-grow: 1;
	justify-content: center;
	align-items: center;
`;
const Icon = styled(Feather)`
	padding: 10px;
`;
export default NavBar;
