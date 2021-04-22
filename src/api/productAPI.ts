/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import api from '~/config/api';
import { QueryFn } from '~/types/ApiHelpers';
import { Product } from '~/types/models/Product';

export type getProductsParams = { gms: string; category: string };

const getProducts: QueryFn<Product[], getProductsParams> = ({ queryKey }) => {
	const [_key, params] = queryKey;
	return api.get('/products', { params });
};

const useGetProducts = (params: getProductsParams) => {
	return useQuery(['get_products', params], getProducts);
};

export default useGetProducts;
