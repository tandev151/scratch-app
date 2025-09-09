import axios, { AxiosError, type AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

const API_ROOT_URL = 'http://localhost:3000';
const LIMIT_TIME = 10000;

// Tạo instance với cấu hình đầy đủ
const axiosInstance = axios.create({
  baseURL: API_ROOT_URL,
  timeout: LIMIT_TIME,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Configure request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before the request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Configure response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // If success response
    // Return response.data to don't need to ".data"
    return response.data;
  },
  (error: AxiosError) => {
    // Handle some HTTP Error
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Unauthorized: Token expired or invalid
          // TODO: log out, clear token, redirect login page
          console.error('Unauthorized (401). Redirecting to login...');

          break;
        case 403:
          // Forbidden Error: Unauthorize with resources
          console.error('Forbidden (403). Access denied.');

          break;
        case 404:
          //  Not Found
          console.error('Resource not found (404).');
          break;
        case 500:
        case 502:
        case 503:
          // Internal Server Error
          console.error(`Server error (${status}). Please try again later.`);

          break;
        default:
          // Other error
          console.error(`An error occurred: ${error.message}`);
      }
    } else {
      // Error doesn't relate to response
      console.error('Network error or no response:', error.message);
    }

    // Always return Promise.reject in order to promise/try-catch at calling place can catch error
    return Promise.reject(error);
  },
);

export default axiosInstance;
