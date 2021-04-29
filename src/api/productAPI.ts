/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import api from '~/config/api';
import { QueryFn, QueryOptions } from '~/types/ApiHelpers';
import { Product } from '~/types/models/Product';

export type getProductsParams = { gms: string; category: string };

const getProducts: QueryFn<Product[], getProductsParams> = async ({
	queryKey,
}) => {
	const [_key, params] = queryKey;
	const { data } = await api.get<Product[]>('/articles', { params });
	return data;
};

const useGetProducts = (params: getProductsParams, options?: QueryOptions) => {
	return useQuery<unknown, unknown, Product[], [string, getProductsParams]>(
		['get_products', params],
		getProducts,
		options
	);
};

export default useGetProducts;
