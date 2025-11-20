import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Lấy URL từ .env
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Hàm làm mới accessToken bằng refreshToken
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  console.log(refreshToken, accessToken);
  const data = {
    "access_token": accessToken,
    "refresh_token": refreshToken
  }
  console.log(data);
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
      data
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    
    // Lưu token mới vào localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Redirect user to login
    return null;
  }
};

// Interceptor request: Thêm token vào header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor response: Tự động làm mới token nếu hết hạn
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Nếu token hết hạn, thử làm mới
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config); // Gửi lại request với token mới
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
