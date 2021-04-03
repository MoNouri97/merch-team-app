import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Home';
import MonthlyPlanning from '../MonthlyPlanning';
import SignIn from '../SignIn';
import Testing from '../Testing';
import RefProducts from '../RefProducts';

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
		<Drawer.Screen name="Planning" component={MonthlyPlanning} />
		<Drawer.Screen name="Acceuil" component={Home} />
		<Drawer.Screen name="Connexion" component={SignIn} />
		<Drawer.Screen name="Test" component={Testing} />
	</Drawer.Navigator>
);
export default DrawerNav;
