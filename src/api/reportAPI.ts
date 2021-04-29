/* eslint-disable arrow-body-style */
import { useMutation } from 'react-query';
import api from '~/config/api';
import { ReportData } from '~/types/models/formData/Report';

type Response = { message: string };
const postReport = async (formData: ReportData) => {
	const { data } = await api.post<Response>('/report', formData);
	return data;
};

const usePostReport = () => {
	return useMutation('post_report', postReport);
};

export default usePostReport;
