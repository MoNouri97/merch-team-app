export interface Planning {
	GMS: string;
	done: boolean;
	time: number;
	status: PlanningStatus;
}
export interface Fake {
	name: string;
	id: number | string;
}
export type PlanningStatus = 'TODO' | 'DONE' | 'DELAYED';
export interface Message {
	id: number;
	name: string;
	content: string;
	document: boolean;
}
