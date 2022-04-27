import axios from "axios";
import { StorageService } from "./storage-service";

const baseConfig = {
  // baseURL: 'https://angular-course-1.herokuapp.com/',
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(baseConfig);

// interceptors
function addAccessTokenToRequestHandler(config) {
  const accessToken = StorageService.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}

axiosInstance.interceptors.request.use(
  addAccessTokenToRequestHandler,
  (error) => Promise.reject(error)
);

export const BaseApiService = axiosInstance;
