import axios from "axios";
import { create } from "zustand";
// import { jwtDecode } from "jwt-decode";

const API_URL = "http://swd291-api.duckdns.org/api";

interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
  phone?: string;
  gender?: string;
  dob?: string;
}

interface AuthState {
  user: User | null;
  refreshToken: string | null;
  accessToken: string | null;
  setAuth: (accessToken: string, refreshToken: string, user: User) => void;
  login: (user: User, accessToken: string) => void;
  register: (userData: any) => Promise<{ success: boolean }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: (() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null; // ⚡ Kiểm tra null trước khi parse
  })(),

  setAuth: (accessToken, refreshToken, user) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    set({ accessToken, refreshToken, user });
  },

  login: (user, accessToken) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    set({ user, accessToken });
  },

  // Đăng ký tài khoản
  register: async (userData) => {
    try {
      const response = await axios.post(
        `${API_URL}/account/register`,
        userData
      );
      return { success: response.status === 201 };
    } catch (error) {
      console.error("Register failed:", error);
      return { success: false };
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({ accessToken: null, refreshToken: null, user: null });
  },

}));
