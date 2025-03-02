import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
// import { jwtDecode } from "jwt-decode"; // ✅ Import jwtDecode
import layerImage from "@/assets/hasaki.png";
import { useAuthStore } from "@/store/authStore"; // ✅ Zustand Store
import authService from "@/services/authService"; // ✅ API Authentication
// import { GoogleLogin } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleAuth";


const Login: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth); // ✅ Lấy setAuth từ Zustand store

  const validateUsername = (account: string): boolean => account.trim() !== "";
  const validatePassword = (password: string): boolean => password.length >= 8;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();


    if (!validateUsername(account)) {
      toast.error("Username is empty");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password is too short");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login(account, password);

      if (!response?.access_token || typeof response.access_token !== "string") {
        throw new Error("Invalid access token from server");
      }

      setAuth(response.access_token, response.refresh_token, response.user);
      toast.success(`Welcome, ${response.user.fullname}!`);

      // switch (response.user.role) {
      //   case "admin":
      //     navigate("/event");
      //     break;
      //   case "staff":
      //     navigate("/event");
      //     break;
      //   case "user":
      //   default:
      //     navigate("/event");
      //     break;
      // }
      navigate("/event");

    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false); // Đảm bảo loading luôn tắt
    }
  };

  return (
    <div className="h-[86vh] flex items-center justify-center px-5 lg:px-0">
      <ToastContainer />
      <div className="flex justify-center flex-1 max-w-screen-lg bg-white border shadow sm:rounded-lg">
        <div className="hidden flex-1 justify-center text-center md:flex">
          <img
            src={layerImage}
            alt="logo"
            className="m-5 rounded-lg aspect-square"
          />
        </div>

        <div className="flex-1 flex justify-center text-center">
          <div className="flex flex-col w-full items-center">
            <h1 className="text-3xl font-extrabold text-green-700 xl:text-4xl">
              Login
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full max-w-xs gap-5 mx-auto mt-6"
            >
              <input
                className="w-full px-5 py-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white"
                type="text"
                placeholder="Please enter your username"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />

              <div className="relative">
                <input
                  className="w-full px-5 py-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute text-gray-500 right-3 top-4"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center w-full py-4 mt-2 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg focus:outline-none focus:shadow-lg ${loading ? "bg-gray-500" : "bg-green-700 hover:bg-green-900"
                  }`}
              >
                {loading ? "Đang xử lý..." : "Login"}
              </button>

              <div className="mt-2 text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-900 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <p className="mt-4 text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <Link to="/register">
                  <span className="font-semibold text-blue-700">Sign up</span>
                </Link>
              </p>
            </form>

            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
