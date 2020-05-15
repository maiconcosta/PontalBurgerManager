import axios from 'axios';
import { toastError } from '../components/toast';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(async (config) => {
  try {
    if (!config.url.endsWith('login')) {
      const token = await localStorage.getItem('token');

      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (err) {
    toastError('Ocorreu um erro, tente novamente.');
  }

  return config;
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    localStorage.clear();

    window.location = '/';
  }
  return (Promise.reject(error));
});

export default api;
