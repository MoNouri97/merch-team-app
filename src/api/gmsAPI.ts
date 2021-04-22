/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import api from '~/config/api';
import { GMS } from '~/types/models/GMS';

const getGMS = async () => {
	const { data } = await api.get<GMS[]>('/gms');
	return data;
};

const useGetGMS = () => {
	return useQuery('get_gms', getGMS);
};

export default useGetGMS;
