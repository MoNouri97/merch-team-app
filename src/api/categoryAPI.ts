/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import api from '~/config/api';
import { Category } from '~/types/models/Category';

const getCategories = async () => {
	const { data } = await api.get<Category[]>('/category');
	return data;
};

const useGetCategories = () => {
	return useQuery('get_categories', getCategories, {
		refetchOnMount: 'always',
	});
};

export default useGetCategories;
