import { EventType } from '~/types/events';
import { EventSection } from '~/types/models/formData/Report';

const createSection = (data: any, key: string): EventSection => {
	if (data.category !== undefined) {
		delete data.category;
	}
	const section: EventSection = {
		type: key.split(' ')[0] as EventType,
		...data,
	};
	return section;
};

const createSectionsArray: (obj: any) => EventSection[] = (obj) => {
	let list: EventSection[] = [];
	for (const key in obj) {
		if (!obj[key]) continue;
		list = [...list, createSection(obj[key], key)];
	}
	return list;
};
export default createSectionsArray;
