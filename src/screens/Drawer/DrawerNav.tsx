import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Claim from '../Claim';
import HomeStack from '../HomeStack';
import LeaveRequest from '../LeaveRequest';
import MonthlyPlanning from '../MonthlyPlanning';
import RefProducts from '../RefProducts';
import SignIn from '../SignIn';
import Testing from '../Testing';

const Drawer = createDrawerNavigator();

const DrawerNav: React.FC = ({ children }) => (
	<Drawer.Navigator
		initialRouteName="Acceuil"
		screenOptions={{
			headerShown: false,
		}}
	>
		{children}
		<Drawer.Screen name="Acceuil" component={HomeStack} />
		<Drawer.Screen name="Réclamation" component={Claim} />
		<Drawer.Screen name="Ref Products" component={RefProducts} />
		<Drawer.Screen name="Demande Congé" component={LeaveRequest} />
		<Drawer.Screen name="Planning" component={MonthlyPlanning} />
		<Drawer.Screen name="Connexion" component={SignIn} />
		<Drawer.Screen name="Test" component={Testing} />
	</Drawer.Navigator>
);
export default DrawerNav;
