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

// Add a request interceptor
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

// 3. CẤU HÌNH RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Nếu response thành công (status code 2xx)
    // Trả về response.data để không cần gọi .data ở nơi sử dụng
    return response.data;
  },
  (error: AxiosError) => {
    // Xử lý các lỗi HTTP một cách tập trung
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Lỗi Unauthorized: token không hợp lệ hoặc hết hạn
          // Thực hiện logout, xóa token và chuyển hướng về trang đăng nhập
          console.error('Unauthorized (401). Redirecting to login...');
          // ví dụ: authStore.logout(); window.location.href = '/login';
          break;
        case 403:
          // Lỗi Forbidden: không có quyền truy cập tài nguyên
          console.error('Forbidden (403). Access denied.');
          // Hiển thị thông báo cho người dùng
          break;
        case 404:
          // Lỗi Not Found
          console.error('Resource not found (404).');
          break;
        case 500:
        case 502:
        case 503:
          // Lỗi từ server
          console.error(`Server error (${status}). Please try again later.`);
          // Hiển thị trang báo lỗi server
          break;
        default:
          // Các lỗi khác
          console.error(`An error occurred: ${error.message}`);
      }
    } else {
      // Lỗi không liên quan đến response (ví dụ: lỗi mạng)
      console.error('Network error or no response:', error.message);
    }

    // Luôn trả về Promise.reject để chuỗi promise/try-catch ở nơi gọi có thể bắt được lỗi
    return Promise.reject(error);
  },
);

export default axiosInstance;
