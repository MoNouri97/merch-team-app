import { EventType } from '~/types/events';

export type EventSection = {
	type: EventType;
	data: any;
};
export type ReportData = {
	GMS: number;
	longitude: number;
	latitude: number;
	valid: boolean;
	time: number;
	sections: EventSection[];
};
