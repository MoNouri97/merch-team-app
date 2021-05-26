import { EventType } from '~/types/events';

export type EventSection = {
	type: EventType;
	[key: string]: any;
};
export type ReportData = {
	GMS?: number;
	longitude?: number;
	latitude?: number;
	valid?: boolean;
	time?: number;
	events: EventSection[];
};
