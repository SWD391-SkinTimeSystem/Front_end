import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://swd291-api.duckdns.org/api";

interface DecodedToken {
  id: string;
  fullname: string;
  email: string;
  role: string;
  phone?: string;
  gender?: string;
  dob?: string;
  exp?: number; // Thời gian hết hạn token
}

const authService = {
  // ✅ Hàm login: Gọi API, trả về dữ liệu người dùng
  login: async (account: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        account,
        password,
      });

      if (!response.data || !response.data.data) {
        throw new Error("Invalid credentials");
      }

      const { access_token, refresh_token } = response.data.data;

      // ✅ Giải mã token lấy thông tin user
      const decodedUser: DecodedToken = jwtDecode(access_token);
      const user: DecodedToken = {
        id: decodedUser.id,
        fullname: decodedUser.fullname,
        email: decodedUser.email,
        role: decodedUser.role,
        phone: decodedUser.phone || "", // Xử lý tránh undefined
        gender: decodedUser.gender || "unknown",
        dob: decodedUser.dob || "",
      };

      if (!decodedUser) throw new Error("Failed to decode token");

      return { access_token, refresh_token, user };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  },


  register: async (userData: any) => {
    const response = await axios.post(`${API_URL}/account/register`, userData);
    return response.data;
  },

  googleSignIn: async (token: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin-google`, { token });
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      return { access_token, refresh_token };
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  },
  // googleLogin: async (token: string) => {
  //   try {`
  //     const response = await axios.post(
  //       `${API_URL}/auth/signin-google`,
  //       { token },
  //       {
  //         headers: {
  //           "Accept": "text/plain", // Đảm bảo nhận đúng kiểu dữ liệu từ API
  //         },
  //       }
  //     );

  //     return response.data; // Trả về access_token & refresh_token
  //   } catch (error: any) {
  //     console.error("Google Login Error:", error.response?.data || error.message);
  //     throw new Error(error.response?.data?.detail || "Đăng nhập Google thất bại.");
  //   }
  // },

  forgotPassword: async (email: string) => {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await axios.post(`${API_URL}/refresh`, { refreshToken });

      if (response.data?.status === "success" && response.data?.accessToken) {
        const { accessToken, refreshToken } = response.data;

        // ✅ Giải mã accessToken mới để lấy thông tin user
        const decodedUser: DecodedToken = jwtDecode(accessToken);

        return {
          accessToken,
          refreshToken,
          user: decodedUser, // ✅ User lấy từ token mới
        };
      } else {
        throw new Error(response.data?.message || "Failed to refresh token");
      }
    } catch (error: any) {
      console.error("AuthService refresh error:", error);
      throw error;
    }
  },
};

export default authService; // ✅ Thêm export default