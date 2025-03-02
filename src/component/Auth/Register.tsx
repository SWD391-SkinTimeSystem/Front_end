import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast, ToastContainer } from "react-toastify";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.register);

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
  const [loading, setLoading] = useState<boolean>(false);

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
      toast.error("Vui lòng chọn ngày sinh");
      return false;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Email không hợp lệ");
      return false;
    }
    if (!validatePassword(formData.password)) {
      toast.error("Mật khẩu cần 6-32 ký tự, bao gồm chữ và số");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
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
      const response = await registerUser({
        fullname: formData.fullName,
        password: formData.password,
        phone: formData.phoneNumber,
        dob: `${formData.year}-${formData.month}-${formData.day}`,
        gender: formData.gender,
        email: formData.email,
        
        isTermOfUseAccepted: formData.agreeTerms,
      });
      if (response.success) {
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
    <div className="h-screen flex items-center justify-center px-5 bg-gray-100">
      <ToastContainer />
      <div className="max-w-md w-full bg-white border border-gray-200 shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Đăng ký tài khoản
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Số điện thoại"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <div className="flex gap-2">
            <select name="day" className="input" onChange={handleInputChange}>
              <option>Ngày</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select name="month" className="input" onChange={handleInputChange}>
              <option>Tháng</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select name="year" className="input" onChange={handleInputChange}>
              <option>Năm</option>
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i} value={2023 - i}>
                  {2023 - i}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-x-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
              />
              Nam
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleInputChange}
              />
              Nữ
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleInputChange}
              />
              Khác
            </label>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />

          <label className="flex items-center gap-2 text-gray-700 text-sm">
            <input
              type="checkbox"
              name="agreeTerms"
              onChange={handleInputChange}
            />
            Tôi đồng ý với{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Điều khoản & Điều kiện
            </a>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>

          <p className="text-center text-sm text-gray-700">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-blue-900 font-semibold hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
