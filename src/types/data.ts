export interface Planning {
	GMS: string;
	done: boolean;
	time: number;
	status: PlanningStatus;
}
export type PlanningStatus = 'TODO' | 'DONE' | 'DELAYED';
