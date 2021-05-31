/* eslint-disable arrow-body-style */

import { useMutation } from 'react-query';
import api from '~/config/api';
import { jsonToForm } from '~/Helpers/jsonToForm';
import { Claim } from '~/types/models/formData/Claim';

type ClaimResponse = { message: string };
const postClaim = async (jsonData: Claim) => {
	const formData = jsonToForm(jsonData.image);
	const f = new FormData();
	formData.append('file', jsonData.image);

	console.log({ formData });

	const { data } = await api.post('/gms/image', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	console.log({ data });
	return data;
};

const usePostClaim = () => {
	return useMutation('claim', postClaim);
};

export default usePostClaim;
