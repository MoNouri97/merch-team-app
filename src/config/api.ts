import axios from 'axios';
import { TOKEN_KEY } from '~/config/constants';
import { loadFromStorage } from '~/Helpers/asyncStorage';

// export const URL = 'http://10c6c2e07db2.ngrok.io';
// export const URL = 'http://10.42.0.1:8080';
// export const URL = 'http://10.42.0.43:8080';
export const URL = 'http://192.168.1.5:8080';
export const API = '/api/v1';
export const api = axios.create({
	baseURL: URL + API,
});

api.interceptors.request.use(async (request) => {
	console.log(`
-------------
API CALL >>> ${request.baseURL}${request.url}
Method: ${request.method}
Params: ${JSON.stringify(request.params, null, 2)}
-------------
`);

	request.headers.Authorization = await loadFromStorage(TOKEN_KEY);
	return request;
});

export default api;
