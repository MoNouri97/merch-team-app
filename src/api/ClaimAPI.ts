/* eslint-disable arrow-body-style */

import { useMutation } from 'react-query';
import api from '~/config/api';
import { Claim } from '~/types/models/formData/Claim';

type ClaimResponse = { message: string };
const postClaim = async (jsonData: Claim) => {
	const { data } = await api.post('/reclamation', jsonData);
	return data;
};

const usePostClaim = () => {
	return useMutation('claim', postClaim);
};

export default usePostClaim;
