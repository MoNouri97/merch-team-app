/* eslint-disable arrow-body-style */
import { useMutation } from 'react-query';
import api from '~/config/api';

type LoginRequest = { username: string; password: string };
const login = (credentials: LoginRequest) => {
	return api.post('/login', credentials);
};

const useLogin = () => {
	return useMutation('login', login);
};

export { useLogin, LoginRequest };
