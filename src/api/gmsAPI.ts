/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import api from '~/config/api';
import { GMS } from '~/types/models/GMS';

const getGMS = () => {
	return api.get<GMS[]>('/gms');
};

const useGetGMS = () => {
	return useQuery('get_gms', getGMS);
};

export default useGetGMS;
