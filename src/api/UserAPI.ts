/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import api, { URL } from '~/config/api';
import { User } from '~/types/models/User';

type LoginRequest = { username: string; password: string };
type LoginResponse = { token: string; user: User };
const login = (credentials: LoginRequest) => {
	const c = axios.create();
	c.interceptors.request.use(async (request) => {
		console.log(
			`\n-------------\nAPI CALL >>> ${request.baseURL ?? ''}${
				request.url
			}\nMethod: ${request.method}\n-------------\n`
		);
		return request;
	});
	return c.post<LoginResponse>(`${URL}/login`, credentials);
};

const useLogin = () => {
	return useMutation('login', login);
};
const getAdmin = async () => {
	const { data } = await api.get<User[]>('/user/role/ADMIN');
	return data;
};

const useGetAdmin = () => {
	return useQuery('get_admins', getAdmin);
};
export { useLogin, LoginRequest, useGetAdmin };
