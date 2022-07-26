/* eslint-disable arrow-body-style */
import { useMutation, useQuery } from 'react-query';
import api from '~/config/api';
import { QueryFn } from '~/types/ApiHelpers';
import { GMS } from '~/types/models/GMS';

const getAllGMS = async () => {
	const { data } = await api.get<GMS[]>('/gms');
	return data;
};

const useGetAllGMS = () => {
	return useQuery('get_all_gms', getAllGMS);
};

const getGMS: QueryFn<GMS, number> = async ({ queryKey }) => {
	const [_, id] = queryKey;
	const { data } = await api.get<GMS>(`/gms/${id}`);
	return data;
};

const useGetGMS = (id: number) => {
	return useQuery(['get_gms', id], getGMS);
};

const updateGMS = async (gmsData: Partial<GMS>) => {
	const { data } = await api.put<GMS>(`/gms/${gmsData.id}`, gmsData);
	return data;
};

const useUpdateGMS = () => {
	return useMutation('update_gms', updateGMS);
};

export { useGetGMS, useGetAllGMS, useUpdateGMS };
export default useGetAllGMS;
