import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon } from "lucide-react";
import layerImage from "@/assets/hasaki.png";
import { useAuthStore } from "@/store/authStore";
import authService from "@/services/authService";
import GoogleLoginButton from "./GoogleAuth";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { switchCaseRole } from "@/lib/utils";

const Login: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const validateUsername = (account: string): boolean => account.trim() !== "";
  const validatePassword = (password: string): boolean => password.length >= 8;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateUsername(account)) {
      toast.error("Tên đăng nhập không được để trống");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Mật khẩu ít nhất phải 8 kí tự");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login(account, password);

      if (!response?.access_token || typeof response.access_token !== "string") {
        throw new Error("Mã xác thực không hợp lệ từ máy chủ");
      }

      setAuth(response.access_token, response.refresh_token, response.user);
      toast.success(`Chào mừng, ${response.user.fullname}!`);
      console.log("Đăng nhập thành công:",switchCaseRole(response.access_token));
      navigate(switchCaseRole(response.access_token));
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error.message);
      toast.error(error.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center px-5 lg:px-0 bg-teal-50">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl relative z-10"
      >
        {/* <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 -right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden rounded-2xl">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row-reverse">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex-1 bg-[#4d8b70] p-8 flex items-center justify-center"

                // className="flex-1 bg-gradient-to-br from-emerald-400 to-blue-400 p-8 flex items-center justify-center"
              >
                <div className="relative w-full max-w-md">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-white text-center mb-8"
                  >
                    <h2 className="font-extrabold text-3xl md:text-4xl mb-4 tracking-tight">
                      Chào mừng đến với Hasaki
                    </h2>
                    <p className="text-white/80 text-lg">
                      Tài khoản của bạn là cổng vào trải nghiệm cá nhân hóa
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full"></div>
                    <img
                      src={layerImage}
                      alt="logo"
                      className="w-full h-auto max-w-md mx-auto rounded-full ring-4 ring-white/50 shadow-2xl transform transition-all duration-500 hover:scale-105"
                    />
                  </motion.div>
                </div>
              </motion.div>

              <div className="flex-1 p-8 md:p-12 lg:p-16">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="max-w-md mx-auto"
                >
                  <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-teal-800 mb-2 tracking-tight">
                      Đăng Nhập
                    </h1>
                    <p className="text-teal-600 text-sm md:text-base">
                      Truy cập tài khoản và tiếp tục hành trình của bạn
                    </p>
                  </div>

                  <motion.form
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-3.5 h-5 w-5 text-teal-500" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="Tên đăng nhập"
                          value={account}
                          onChange={(e) => setAccount(e.target.value)}
                          className="h-12 pl-12 pr-4 rounded-xl bg-teal-50/80 border-teal-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 font-medium text-teal-900 placeholder:text-teal-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="relative">
                        <LockIcon className="absolute left-4 top-3.5 h-5 w-5 text-teal-500" />
                        <Input
                          id="password"
                          type={passwordVisible ? "text" : "password"}
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 pl-12 pr-12 rounded-xl bg-teal-50/80 border-teal-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 font-medium text-teal-900 placeholder:text-teal-400"
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute right-4 top-3.5 text-teal-500 hover:text-teal-700 transition-colors"
                        >
                          {passwordVisible ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 text-base font-bold tracking-wide rounded-xl bg-[#326e51] hover:bg-[#265542] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-white"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Đang xử lý...
                          </div>
                        ) : (
                          "Đăng Nhập"
                        )}                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4 text-sm">
                      <Link
                        to="/forgot-password"
                        className="text-teal-600 hover:text-teal-800 hover:underline transition-colors"
                      >
                        Quên mật khẩu?
                      </Link>
                      <Link
                        to="/register"
                        className="text-teal-600 font-medium hover:text-teal-800 hover:underline transition-colors"
                      >
                        Tạo tài khoản mới
                      </Link>
                    </div>
                  </motion.form>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="mt-8"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-teal-100" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-teal-500">
                          Hoặc tiếp tục với
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <GoogleLoginButton />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default Login;