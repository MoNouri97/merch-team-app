import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Home from '../Home';
import LeaveRequest from '../LeaveRequest';
import MonthlyPlanning from '../MonthlyPlanning';
import RefProducts from '../RefProducts';
import SignIn from '../SignIn';
import Testing from '../Testing';

const Drawer = createDrawerNavigator();

const DrawerNav: React.FC = ({ children }) => (
	<Drawer.Navigator
		initialRouteName="Home"
		// screenOptions={{
		// 	headerShown: true,
		// 	headerTitleAlign: 'center',
		// 	header: (p) => <NavBar title={p.scene.route.name} />,
		// }}
	>
		{children}
		<Drawer.Screen name="Ref Products" component={RefProducts} />
		<Drawer.Screen name="Demande Congé" component={LeaveRequest} />
		<Drawer.Screen name="Planning" component={MonthlyPlanning} />
		<Drawer.Screen name="Acceuil" component={Home} />
		<Drawer.Screen name="Connexion" component={SignIn} />
		<Drawer.Screen name="Test" component={Testing} />
	</Drawer.Navigator>
);
export default DrawerNav;
