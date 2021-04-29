import { EventType } from '~/types/events';
import { EventSection } from '~/types/models/formData/Report';

const createSectionsArray: (obj: any) => EventSection[] = (obj) => {
	let list: EventSection[] = [];
	for (const key in obj) {
		if (!obj[key]) continue;
		const section = {
			type: key.split(' ')[0] as EventType,
			data: obj[key],
		};
		list = [...list, section];
	}
	return list;
};
export default createSectionsArray;
