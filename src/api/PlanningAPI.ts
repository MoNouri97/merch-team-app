/* eslint-disable arrow-body-style */
import { useContext } from 'react';
import { useQuery } from 'react-query';
import api from '~/config/api';
import UserContext from '~/context/UserContext';
import { QueryFn } from '~/types/ApiHelpers';
import { PlanningDetails } from '~/types/models/PlanningDetails';

// TODO : this implementation
export type GetPlanningsParams = number;
const getPlannings: QueryFn<PlanningDetails[], GetPlanningsParams> = async ({
	queryKey,
}) => {
	const [_key, id] = queryKey;

	const { data } = await api.get<PlanningDetails[]>(
		`/taskPlanning/merchandiser/${id}`
	);
	return data;
};

const useGetPlannings = () => {
	const { user } = useContext(UserContext)!;
	return useQuery<
		PlanningDetails[],
		unknown,
		PlanningDetails[],
		[string, GetPlanningsParams]
	>(['get_planning', user!.id], getPlannings);
};

export default useGetPlannings;
