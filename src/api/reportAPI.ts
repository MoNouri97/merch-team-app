/* eslint-disable arrow-body-style */
import { useMutation, useQuery, useQueryClient } from 'react-query';
import api from '~/config/api';
import { QueryFn, QueryOptions } from '~/types/ApiHelpers';
import { ReportData } from '~/types/models/formData/Report';

type Response = { message: string };
const postReport = async (jsonData: ReportData) => {
	console.log({ jsonData });

	const { data } = await api.post<Response>('/report', jsonData);
	return data;
};

const usePostReport = () => {
	const queryClient = useQueryClient();
	return useMutation('post_report', postReport, {
		onMutate: () => {
			queryClient.invalidateQueries('get_planning');
		},
	});
};

const updateReport = async (jsonData: ReportData) => {
	console.log({ jsonData });

	const { data } = await api.put<Response>('/report', jsonData);
	return data;
};

const useUpdateReport = () => {
	const queryClient = useQueryClient();
	return useMutation('put_report', postReport, {
		onMutate: () => {
			queryClient.invalidateQueries('get_planning');
		},
	});
};

const getReport: QueryFn<ReportData, number> = async ({ queryKey }) => {
	const [_, id] = queryKey;
	const { data } = await api.get<ReportData>(`/report/${id}`);
	return data;
};

const useGetReport = (id: number, options?: QueryOptions) => {
	return useQuery(['get_report', id], getReport, options);
};

export { usePostReport, useGetReport };
