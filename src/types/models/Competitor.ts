import { Entity } from '~/types/models/Entity';

export type Competitor = {
	id: number;
	name: string;
	category: Entity;
	gms: Entity;
};
