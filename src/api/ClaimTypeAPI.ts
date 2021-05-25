/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import api from '~/config/api';
import { ClaimType } from '~/types/models/ClaimType';

const getClaimTypes = async () => {
	const { data } = await api.get<ClaimType[]>('/claimtype');
	return data;
};

const useGetClaimTypes = () => {
	return useQuery('get_claim_types', getClaimTypes);
};

export default useGetClaimTypes;
