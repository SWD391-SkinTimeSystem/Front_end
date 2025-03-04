import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Lấy URL từ .env
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json"
  },
});

// Interceptor để tự động thêm token vào request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
