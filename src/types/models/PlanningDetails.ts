import { PlanningStatus } from '~/types/data';
import { Entity } from '~/types/models/Entity';
import { GMS } from '~/types/models/GMS';

export type PlanningDetails = {
	id: number;
	gms: GMS;
	day: number;
	taskDate: string;
	state: PlanningStatus;
};
export type Planning = {
	id: number;
	merchandiser: Entity;
	startDate: string;
	endDate: string;
	tasks: PlanningDetails[];
};
