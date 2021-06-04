import { LocationGeofencingEventType, LocationRegion } from 'expo-location';
import * as TaskManager from 'expo-task-manager';

type GeoTaskData = {
	eventType: LocationGeofencingEventType;
	region: LocationRegion;
};
export const GEO_FENCING_TASK = 'geofencing';
export const defineGeofencingTask = () => {
	TaskManager.defineTask(GEO_FENCING_TASK, ({ data, error }) => {
		const { eventType, region } = data as GeoTaskData;
		if (error) {
			console.error(error.message);
			return;
		}
		if (eventType === LocationGeofencingEventType.Enter) {
			console.log("You've entered region:", region);
		} else if (eventType === LocationGeofencingEventType.Exit) {
			console.log("You've left region:", region);
		}
	});
};
export default defineGeofencingTask;
