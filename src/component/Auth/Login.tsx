import { useState } from "react";
import { login } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthForm";
import GoogleAuth from "./GoogleAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      authStore.login(data.user, data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-[550px]">
        <h2 className="text-xl font-bold mb-4 text-center">Đăng nhập với</h2>
        <GoogleAuth />
        <hr className="my-4 border-gray-300" />
        <p className="text-center text-gray-500 my-2">Hoặc đăng nhập tại đây</p>
        <AuthInput
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Đăng nhập
        </button>
        <p className="text-center text-sm mt-4">
          Chưa có tài khoản?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
