/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import api from '~/config/api';
import { GMS } from '~/types/models/GMS';

const getAllGMS = async () => {
	const { data } = await api.get<GMS[]>('/gms');
	return data;
};

const useGetAllGMS = () => {
	return useQuery('get_all_gms', getAllGMS);
};

export default useGetAllGMS;
