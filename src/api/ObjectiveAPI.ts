/* eslint-disable arrow-body-style */
import { useContext } from 'react';
import { useQuery } from 'react-query';
import api from '~/config/api';
import UserContext from '~/context/UserContext';
import { QueryFn } from '~/types/ApiHelpers';
import { Objective } from '~/types/models/Objectives';

export type GetObjectivesParams = number;
const getObjectives: QueryFn<Objective[], GetObjectivesParams> = async ({
	queryKey,
}) => {
	const [_key, id] = queryKey;

	const { data } = await api.get<Objective[]>('/objective', { params: { id } });
	return data;
};

const useGetCategories = () => {
	const { user } = useContext(UserContext)!;
	return useQuery<
		Objective[],
		unknown,
		Objective[],
		[string, GetObjectivesParams]
	>(['get_objectives', user!.id], getObjectives);
};

export default useGetCategories;
