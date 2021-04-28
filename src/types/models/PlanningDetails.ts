import { PlanningStatus } from '~/types/data';

export type PlanningDetails = {
	id: number;
	GMS: string;
	state: PlanningStatus;
};
