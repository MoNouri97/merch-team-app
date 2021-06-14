import { NavigationProp, RouteProp } from '@react-navigation/core';

export type ParamList = {
	'Demande Congé': undefined;
	'Ref Products': undefined;
	Planning: undefined;
	Connexion: undefined;
	Test: undefined;
};

export type MainStackParams = {
	Home: undefined;
	Connexion: undefined;
};
export type MainStackNav<T extends keyof MainStackParams = 'Home'> =
	NavigationProp<MainStackParams, T>;

export type HomeStackParams = {
	Accueil: undefined;
	MapGMS: { id: number };
	Report: { id: number };
	Notifications: undefined;
} & MainStackParams;
export type HomeStackNav<T extends keyof HomeStackParams = 'Accueil'> =
	NavigationProp<HomeStackParams, T>;

export type ChatStackParams = {
	ChatIndividual: { id: number };
	ChatList: undefined;
};
export type ChatStackNav<T extends keyof ChatStackParams> = NavigationProp<
	ChatStackParams,
	T
>;
export type ChatStackRoute<T extends keyof ChatStackParams> = RouteProp<
	ChatStackParams,
	T
>;
