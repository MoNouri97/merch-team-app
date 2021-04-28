/* eslint-disable arrow-body-style */
import { useMutation } from 'react-query';
import api from '~/config/api';
import { Claim } from '~/types/models/Claim';

type ClaimResponse = { message: string };
const postClaim = async (formData: Claim) => {
	const { data } = await api.post<ClaimResponse>('/claim', formData);
	return data;
};

const usePostClaim = () => {
	return useMutation('claim', postClaim);
};

export default usePostClaim;
