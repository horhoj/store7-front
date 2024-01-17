import axios from 'axios';
import { BASE_URL, DEFAULT_HEADERS, LS_KEY_API_TOKEN } from './const';

export const axiosInstanceWithoutAuth = axios.create({
  baseURL: BASE_URL,
  headers: { ...DEFAULT_HEADERS },
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { ...DEFAULT_HEADERS },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem(LS_KEY_API_TOKEN) ?? '';

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
