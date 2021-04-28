import { EventType } from '~/types/events';

export type ReportData = {
	GMS: number;
	longitude: number;
	latitude: number;
	valid: boolean;
	time: number;
	sections: {
		type: EventType;
		data: any;
	}[];
};
