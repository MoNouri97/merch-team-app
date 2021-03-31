import Home from '../Home';
import MonthlyPlanning from '../MonthlyPlanning';
import React from 'react';
import SignIn from '../SignIn';
import Testing from '../Testing';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNav: React.FC = ({ children }) => {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			// screenOptions={{
			// 	headerShown: true,
			// 	headerTitleAlign: 'center',
			// 	header: (p) => <NavBar title={p.scene.route.name} />,
			// }}
		>
			{children}
			<Drawer.Screen name="Planning" component={MonthlyPlanning} />
			<Drawer.Screen name="Acceuil" component={Home} />
			<Drawer.Screen name="Connexion" component={SignIn} />
			<Drawer.Screen name="Test" component={Testing} />
		</Drawer.Navigator>
	);
};
export default DrawerNav;
