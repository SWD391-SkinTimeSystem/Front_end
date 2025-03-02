import axios from "axios";
import { useAuthStore } from "../store/authStore";
import authService from "./authService";

const API_URL = "http://swd291-api.duckdns.org/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Middleware xử lý token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Middleware xử lý refresh token khi token hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokens = await authService.refreshToken(useAuthStore.getState().refreshToken!);
        useAuthStore.getState().setAuth(newTokens.accessToken, newTokens.refreshToken, useAuthStore.getState().user!);
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Session expired. Please log in again.");
        useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;