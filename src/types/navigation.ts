import { GMS } from '~/types/models/GMS';

export type ParamList = {
	'Demande Congé': undefined;
	'Ref Products': undefined;
	Planning: undefined;
	Connexion: undefined;
	Test: undefined;
};

export type HomeStackParams = {
	Accueil: undefined;
	MapGMS: { id: number };
	Report: { GMS: GMS };
};
export type ChatStackParams = {
	ChatIndividual: undefined;
	ChatList: undefined;
};
