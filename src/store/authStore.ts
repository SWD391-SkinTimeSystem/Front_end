import axios from "axios";
import { create } from "zustand";

interface User {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  login: (user: User, accessToken: string) => void;
  register: (userData: any) => Promise<{ success: boolean;
  }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  accessToken: localStorage.getItem("accessToken"),
  
  login: (user, accessToken) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    set({ user, accessToken });
  },

        // Đăng ký tài khoản
        register: async (userData) => {
          try {
            const response = await axios.post("/auth/register", userData);
            return { success: response.status === 201 };
          } catch (error) {
            console.error("Register failed:", error);
            return { success: false };
          }
        },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
  },
}));
