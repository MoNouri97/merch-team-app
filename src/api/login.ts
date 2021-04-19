/* eslint-disable arrow-body-style */
import { useMutation } from 'react-query';
import api from '~/config/api';
import { User } from '~/types/models/User';

type LoginRequest = { username: string; password: string };
type LoginResponse = { token: string; user: User };
const login = (credentials: LoginRequest) => {
	return api.post<LoginResponse>('/login', credentials);
};

const useLogin = () => {
	return useMutation('login', login);
};

export { useLogin, LoginRequest };
