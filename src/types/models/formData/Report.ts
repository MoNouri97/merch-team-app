import { EventType } from '~/types/events';
import { Entity } from '~/types/models/Entity';

export type EventSection = {
	type: EventType;
	[key: string]: any;
};
export type ReportData = {
	GMS?: Entity;
	longitude?: number;
	latitude?: number;
	valid?: boolean;
	time?: number;
	events: EventSection[];
};
