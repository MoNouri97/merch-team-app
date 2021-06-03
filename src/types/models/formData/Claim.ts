import { Entity } from '~/types/models/Entity';
export type Claim = {
	gms: Entity;
	type: Entity;
	merchandiser: Entity;
	content: string;
	image: string;
};
