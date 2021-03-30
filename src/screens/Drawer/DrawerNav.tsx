import React from 'react';
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
			<Drawer.Screen name="Home" component={Testing} />
			<Drawer.Screen name="Test" component={Testing} />
		</Drawer.Navigator>
	);
};
export default DrawerNav;
