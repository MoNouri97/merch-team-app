import axios from 'axios';
import { TOKEN_KEY } from '~/config/constants';
import { loadFromStorage } from '~/Helpers/asyncStorage';

export const URL = 'http://192.168.1.108:8080';
export const API = '/api/v1';
export const api = axios.create({
	baseURL: URL + API,
});

api.interceptors.request.use(async (request) => {
	console.log(
		`\n-------------\nAPI CALL >>> ${request.baseURL}${request.url}\nMethod: ${request.method}\n-------------\n`
	);

	request.headers.Authorization = await loadFromStorage(TOKEN_KEY);
	return request;
});

export default api;
