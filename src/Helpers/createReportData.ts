import { FilePath } from '~/types/models/formData/FileType';

export const setPaths = (filePaths: FilePath[], values: any) => {
	// deep cloning values : this might cause issues later
	const cpy = JSON.parse(JSON.stringify(values));

	for (const fp of filePaths) {
		const arr = fp.name.split('.');
		const event = parseInt(arr[1]);
		const field = arr[2];
		const idx = parseInt(arr[3]);
		if (idx) {
			cpy.events[event][field][idx] = fp.path;
		} else {
			cpy.events[event][field] = fp.path;
		}
	}
	return cpy;
};
export const createReportData = (values: any) => {
	// deep cloning values : this might cause issues later
	const cpy = JSON.parse(JSON.stringify(values));
	for (const ev of cpy.events) {
		delete ev.id;
		if (ev.products !== undefined)
			ev.products = ev.products.map((p: number) => ({ id: p }));
		if (ev.product !== undefined) ev.product = { id: ev.product };
	}
	return cpy;
};
