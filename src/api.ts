import axios from "axios";

const api = axios.create({
  baseURL: "http://swd291-api.duckdns.org/api", 
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.error("Token hết hạn. Chuyển hướng đến trang đăng nhập.");
        localStorage.removeItem("token");
        window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

export default api;
