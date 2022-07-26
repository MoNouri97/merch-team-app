import { Entity } from '~/types/models/Entity';

export type LeaveRequestData = {
	startDate: string;
	endDate: string;
	reason: string;
	requester: Entity;
	image: string;
};
