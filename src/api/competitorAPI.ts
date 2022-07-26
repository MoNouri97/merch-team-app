/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import api from '~/config/api';
import { QueryFn } from '~/types/ApiHelpers';
import { Competitor } from '~/types/models/Competitor';

const getCompetitors = async () => {
	const { data } = await api.get<Competitor[]>('/competitor');
	return data;
};

const useGetAllCompetitors = () => {
	return useQuery('get_all_competitors', getCompetitors);
};

const getCompetitor: QueryFn<Competitor, number> = async ({ queryKey }) => {
	const [_, id] = queryKey;
	const { data } = await api.get<Competitor>(`/competitor/${id}`);
	return data;
};

const useGetCompetitor = (id: number) => {
	return useQuery(['get_competitor', id], getCompetitor, { enabled: !!id });
};

export { useGetAllCompetitors, useGetCompetitor };
