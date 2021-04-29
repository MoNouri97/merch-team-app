import IconName from './icons';

export interface Planning {
	GMS: string;
	done: boolean;
	time: number;
	status: PlanningStatus;
}
export interface ListData {
	name: string;
	id: number | string;
}
export type PlanningStatus = 'TODO' | 'DONE' | 'DELAYED' | 'NO_REPORT';
export interface Message {
	id: number;
	name: string;
	content: string;
	document: boolean;
}
export interface Action {
	icon: IconName;
	onPress: () => void | Promise<void>;
	title?: string;
}
