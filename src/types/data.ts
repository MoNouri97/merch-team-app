export interface Planning {
	GMS: string;
	done: boolean;
	time: number;
	status: PlanningStatus;
}
export interface Fake {
	name: string;
	id: number;
}
export type PlanningStatus = 'TODO' | 'DONE' | 'DELAYED';
