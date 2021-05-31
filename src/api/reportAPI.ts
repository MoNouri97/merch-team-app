/* eslint-disable arrow-body-style */
import { useMutation } from 'react-query';
import api from '~/config/api';
import { jsonToForm } from '~/Helpers/jsonToForm';
import { ReportData } from '~/types/models/formData/Report';

type Response = { message: string };
const postReport = async (jsonData: ReportData) => {
	const formData = jsonToForm(jsonData);
	console.log({ formData });

	const { data } = await api.post<Response>('/report', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

const usePostReport = () => {
	return useMutation('post_report', postReport);
};

export default usePostReport;
