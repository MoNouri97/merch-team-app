import { FileType } from '~/types/models/formData/FileType';

export const extractFiles = (events: { type: string }[]) => {
	let files: FileType[] = [];
	events.map((e) => {
		if (!e?.type) {
			return null;
		}

		for (const key in e) {
			if (key.search('image') >= 0) {
				files = [...files, ...(e[key] as FileType[])];
			}
		}
	});
	return files;
};
