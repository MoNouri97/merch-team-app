import { format, parseISO } from 'date-fns';
import { FilePath } from '~/types/models/formData/FileType';
import { EventSection } from '~/types/models/formData/Report';

export const setPaths = (filePaths: FilePath[], values: any) => {
	// deep cloning values : this might cause issues later
	const cpy = JSON.parse(JSON.stringify(values));

	for (const fp of filePaths) {
		const arr = fp.name.split('.');
		const event = parseInt(arr[1]);
		const field = arr[2];
		if (arr[3] != undefined) {
			const idx = parseInt(arr[3]);
			console.log(`setting events.${event}.${field}.${idx}`);
			cpy.events[event][field][idx] = fp.path;
		} else {
			console.log(`setting events.${event}.${field}`);
			console.log(`setting ${cpy.events[event][field]}`);
			cpy.events[event][field] = fp.path;
		}
	}

	return cpy;
};
// TODO before after images ???
export const createReportData = (values: any) => {
	// deep cloning values : this might cause issues later
	const cpy = JSON.parse(JSON.stringify(values));
	for (const ev of cpy.events as EventSection[]) {
		delete ev.id;
		// products
		if (ev.products !== undefined) {
			ev.products = ev.products.map((p: number) => ({ id: p }));
		}
		if (ev.product !== undefined) {
			ev.product = { id: ev.product };
		}
		// competitor
		if (ev.competitor !== undefined) {
			ev.competitor = { id: ev.competitor };
		}
		// dates
		if (ev.type == 'Promotion') {
			ev.startDate = format(parseISO(ev.startDate), 'dd-MM-yyyy');
			ev.endDate = format(parseISO(ev.endDate), 'dd-MM-yyyy');
		}
	}
	return cpy;
};
