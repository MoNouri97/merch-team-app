/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import api from '~/config/api';
import { Competitor } from '~/types/models/Competitor';

const getCompetitors = async () => {
	const { data } = await api.get<Competitor[]>('/competitor');
	return data;
};

const useGetCompetitors = () => {
	return useQuery('get_competitors', getCompetitors);
};

export default useGetCompetitors;
