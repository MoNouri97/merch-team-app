/* eslint-disable arrow-body-style */
import { useContext } from 'react';
import { useQuery } from 'react-query';
import api from '~/config/api';
import UserContext from '~/context/UserContext';
import { QueryFn } from '~/types/ApiHelpers';
import { Planning, PlanningDetails } from '~/types/models/PlanningDetails';

// TODO : this implementation
export type GetPlanningsParams = number;
const getPlannings: QueryFn<Planning, GetPlanningsParams> = async ({
	queryKey,
}) => {
	const [_key, id] = queryKey;

	const { data } = await api.get<Planning>(`/taskPlanning/merchandiser/${id}`);
	return data;
};

const useGetPlannings = () => {
	const { user } = useContext(UserContext)!;
	return useQuery(['get_planning', user!.id], getPlannings, {
		enabled: !!user,
	});
};
const getTask: QueryFn<PlanningDetails, number> = async ({ queryKey }) => {
	const [_key, id] = queryKey;

	const { data } = await api.get<PlanningDetails>(`/task/${id}`);
	return data;
};

const useGetTask = (id?: number) => {
	return useQuery(['get_task', id ?? 0], getTask, { enabled: !!id });
};

export { useGetPlannings, useGetTask };
