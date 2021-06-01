import { FilePath } from '~/types/models/formData/FileType';

const setPaths = (filePaths: FilePath[], values: any) => {
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
export const createReportData = (paths: FilePath[], values: any) => {
	// return ();
};
