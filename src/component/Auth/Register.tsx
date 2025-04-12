import { useState, ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { UserIcon, LockIcon, MailIcon, PhoneIcon, CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import layerImage from "@/assets/hasaki.png";
import { Link } from "react-router-dom";
import { UserData } from "@/types/user";

interface RegisterProps {
  onSuccessfulRegister?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccessfulRegister }) => {
  const registerUser = useAuthStore((state) => state.register);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    day: "",
    month: "",
    year: "",
    gender: "Male",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });

  const validateEmail = (email: string): boolean =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validatePhoneNumber = (phone: string): boolean =>
    /^0[0-9]{9}$/.test(phone);

  const validatePassword = (password: string): boolean =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/.test(password);

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      toast.error("Họ và tên không được để trống");
      return false;
    }
    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ");
      return false;
    }
    if (!formData.day || !formData.month || !formData.year) {
      toast.error("Vui lòng chọn ngày sinh của bạn");
      return false;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Email không hợp lệ");
      return false;
    }
    if (!validatePassword(formData.password)) {
      toast.error("Mật khẩu phải có 8-32 ký tự, bao gồm cả chữ và số");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return false;
    }
    if (!formData.agreeTerms) {
      toast.error("Bạn phải đồng ý với điều khoản và điều kiện");
      return false;
    }
    return true;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const userData: UserData = {
        email: formData.email,
        password: formData.password,
        fullname: formData.fullName,
        phone: formData.phoneNumber,
        dateOfBirth: `${formData.year}-${formData.month}-${formData.day}`,
        gender: formData.gender,
        isTermOfUseAccepted: formData.agreeTerms,
      };
      console.log(JSON.stringify(userData));

      const response = await registerUser(userData);
      if (response) {
        toast.success("Đăng ký thành công");
        navigate("/login");
      } else {
        toast.error("Đăng ký thất bại, vui lòng thử lại");
      }
    } catch (error) {
      toast.error("Lỗi mạng, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-[100vh] flex items-center justify-center px-5 lg:px-0 bg-[#e8f2ee]">
<div
      className="fixed inset-0 flex items-center justify-center px-5  lg:px-0 bg-[#e8f2ee] "
    >
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl relative z-10"
      >
        {/* <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#a7c5b7] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div> */}
        {/* <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#a7c5b7] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div> */}
        {/* <div className="absolute top-40 -right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden rounded-2xl">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Image Section - Now on the left */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex-1 bg-[#4d8b70] p-8 flex items-center justify-center"
              >
                <div className="relative w-full max-w-md ">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-white text-center mb-8"
                  >
                    <h2 className="font-extrabold text-3xl md:text-4xl mb-4 tracking-tight">
                      Tham gia cùng Hasaki
                    </h2>
                    <p className="text-white/80 text-lg">
                      Bắt đầu hành trình làm đẹp của bạn
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-[#326e51]/20 rounded-full"></div>
                    <img
                      src={layerImage}
                      alt="logo"
                      className="w-full h-auto max-w-md mx-auto rounded-full ring-4 ring-white/50 shadow-2xl transform transition-all duration-500 hover:scale-105"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Form Section - Now on the right */}
              <div className="flex-1 p-8 md:p-12 lg:p-16">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="max-w-md mx-auto"
                >
                  <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-teal-800 mb-2 tracking-tight">
                      Đăng Ký

                    </h1>
                    <p className="text-teal-600 text-sm md:text-base">
                      Tạo tài khoản mới để truy cập các ưu đãi độc quyền
                    </p>
                  </div>

                  <motion.form
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 overflow-y-auto  pr-2"
                  >
                    {/* Full Name */}
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-3.5 h-5 w-5 text-teal-500" />
                      <Input
                        type="text"
                        name="fullName"
                        placeholder="Họ và Tên"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="h-12 pl-12 pr-4 rounded-xl bg-teal-50/80 border-teal-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 font-medium text-teal-900 placeholder:text-teal-400"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <PhoneIcon className="absolute left-4 top-3.5 h-5 w-5 text-teal-500" />
                      <Input
                        type="text"
                        name="phoneNumber"
                        placeholder="Số Điện Thoại"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="h-12 pl-12 pr-4 rounded-xl bg-teal-50/80 border-teal-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 font-medium text-teal-900 placeholder:text-teal-400"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <CalendarIcon className="absolute left-4 top-3.5 h-5 w-5 text-teal-500" />
                        <select
                          name="day"
                          value={formData.day}
                          onChange={handleInputChange}
                          className="w-full h-12 pl-12 pr-4 rounded-xl bg-teal-50/80 border-teal-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 font-medium text-teal-900 appearance-none"
                        >
                          <option value="">Ngày</option>
                          {Array.from({ length: 31 }, (_, i) => (
                            <option
                              key={i}
                              value={(i + 1).toString().padStart(2, "0")}
                            >
                              {(i + 1).toString().padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative flex-1">
                        <select
                          name="month"
                          value={formData.month}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 rounded-xl bg-teal-50/80 border-teal-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 font-medium text-teal-900 appearance-none"
                        >
                          <option value="">Tháng</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option
                              key={i}
                              value={(i + 1).toString().padStart(2, "0")}
                            >
                              {(i + 1).toString().padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative flex-1">
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 rounded-xl bg-teal-50/80 border-teal-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 font-medium text-teal-900 appearance-none"
                        >
                          <option value="">Năm</option>
                          {Array.from({ length: 100 }, (_, i) => (
                            <option key={i} value={2025 - i}>
                              {2025 - i}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-teal-50/80">
                      <span className="text-teal-600 font-medium">Giới tính:</span>
                      <div className="flex items-center gap-x-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleInputChange}
                            className="text-teal-500 focus:ring-teal-400"
                          />
                          <span className="text-teal-800">Nam</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleInputChange}
                            className="text-teal-500 focus:ring-teal-400"
                          />
                          <span className="text-teal-800">Nữ</span>
                        </label>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <MailIcon className="absolute left-4 top-3.5 h-5 w-5 text-teal-500" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-12 pl-12 pr-4 rounded-xl bg-teal-50/80 border-teal-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 font-medium text-teal-900 placeholder:text-teal-400"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <LockIcon className="absolute left-4 top-3.5 h-5 w-5 text-teal-500" />
                      <Input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="h-12 pl-12 pr-4 rounded-xl bg-teal-50/80 border-teal-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 font-medium text-teal-900 placeholder:text-teal-400"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <LockIcon className="absolute left-4 top-3.5 h-5 w-5 text-teal-500" />
                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="h-12 pl-12 pr-4 rounded-xl bg-teal-50/80 border-teal-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 font-medium text-teal-900 placeholder:text-teal-400"
                      />
                    </div>

                    {/* Terms */}
                    <label className="flex items-center gap-2 px-4 text-teal-700 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="rounded text-teal-500 focus:ring-teal-400"
                      />
                      Tôi đồng ý với{" "}
                      <a href="#" className="text-teal-600 font-medium hover:text-teal-800 hover:underline transition-colors">
                        Điều khoản & Điều kiện
                      </a>
                    </label>

                    {/* Submit Button */}
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
                          "Đăng Ký"
                        )}
                      </Button>
                    </div>

                    <div className="text-center mt-4">
                      <p className="text-teal-600 text-sm">
                        Đã có tài khoản?{" "}
                        <Link
                          to="/login"
                          className="text-teal-600 font-medium hover:text-teal-800 hover:underline transition-colors"
                        >
                          Đăng nhập ngay
                        </Link>
                      </p>
                    </div>
                  </motion.form>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>

      </motion.div>
    </div>
  );
};

export default Register;