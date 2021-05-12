/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useMutation } from 'react-query';
import { URL } from '~/config/api';
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

export { useLogin, LoginRequest };
