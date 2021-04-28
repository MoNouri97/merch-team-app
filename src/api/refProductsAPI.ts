/* eslint-disable arrow-body-style */
import { useMutation } from 'react-query';
import api from '~/config/api';
import { RefProductsData } from '~/types/models/formData/RefProducts';

type Response = { message: string };
const postRefProducts = async (formData: RefProductsData) => {
	const { data } = await api.post<Response>('/ref_products', formData);
	return data;
};

const usePostRefProducts = () => {
	return useMutation('ref_products', postRefProducts);
};

export default usePostRefProducts;
