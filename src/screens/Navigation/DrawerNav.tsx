import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import ChatStack from '~/screens/Chat/ChatStack';
import Testing from '~/screens/Testing';
import Claim from '../Claim';
import HomeStack from '../HomeStack';
import LeaveRequest from '../LeaveRequest';
import MonthlyPlanning from '../MonthlyPlanning';
import RefProducts from '../RefProducts';

const Drawer = createDrawerNavigator();

const DrawerNav: React.FC = () => (
	<Drawer.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<Drawer.Screen name="Accueil" component={HomeStack} />
		<Drawer.Screen name="Chat" component={ChatStack} />
		<Drawer.Screen name="Réclamation" component={Claim} />
		<Drawer.Screen name="Ref Products" component={RefProducts} />
		<Drawer.Screen name="Demande Congé" component={LeaveRequest} />
		<Drawer.Screen name="Planning" component={MonthlyPlanning} />
		<Drawer.Screen name="Test" component={Testing} />
	</Drawer.Navigator>
);
export default DrawerNav;
