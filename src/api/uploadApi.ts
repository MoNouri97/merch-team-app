import api from '~/config/api';
import { FilePath, FileType } from '~/types/models/formData/FileType';

type ProgressEvent = {
	isTrusted: boolean;
	lengthComputable: boolean;
	loaded: number;
	total: number;
};

export const uploadApi = async (
	files: FileType[],
	onProgress: (p: number) => void
) => {
	const form = new FormData();
	for (const file of files) {
		form.append(file.name, file);
	}
	const { data } = await api.post<FilePath[]>('storage/images', form, {
		headers: { 'Content-Type': 'multipart/form-data' },
		onUploadProgress: (e: ProgressEvent) => {
			onProgress(e.loaded / e.total);
		},
	});
	return data;
};
