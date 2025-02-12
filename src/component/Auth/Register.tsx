import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Nam");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const authStore = useAuthStore();

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!fullName || !phone || !birthDate || !email || !password || !confirmPassword) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp");
      return;
    }

    if (!agree) {
      setErrorMessage("Bạn phải đồng ý với điều khoản");
      return;
    }

    try {
      const response = await authStore.register({ fullName, phone, birthDate, gender, email, password });
      if (response.success) {
        navigate("/login");
      } else {
        setErrorMessage(typeof response.message === 'string' ? response.message : "Đăng ký thất bại");
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Đăng ký tài khoản</h2>

        {/* Họ và tên */}
        <Input placeholder="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mb-3" />

        {/* Số điện thoại */}
        <Input placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-3" />

        {/* Ngày sinh & Giới tính */}
        <div className="flex gap-2 mb-3">
          <Input placeholder="Ngày" className="w-1/3" />
          <Input placeholder="Tháng" className="w-1/3" />
          <Input placeholder="Năm" className="w-1/3" />
        </div>

        <div className="flex gap-4 mb-3">
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="Nam" checked={gender === "Nam"} onChange={() => setGender("Nam")} />
            Nam
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="Nữ" checked={gender === "Nữ"} onChange={() => setGender("Nữ")} />
            Nữ
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="Khác" checked={gender === "Khác"} onChange={() => setGender("Khác")} />
            Khác
          </label>
        </div>

        {/* Email */}
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3" />

        {/* Mật khẩu */}
        <Input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-3" />

        {/* Xác nhận mật khẩu */}
        <Input type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mb-3" />

        {/* Điều khoản */}
        <div className="flex items-center gap-2 mb-3">
          <Checkbox checked={agree} onCheckedChange={(checked: boolean | ((prevState: boolean) => boolean)) => setAgree(checked)} />
          <span>
            Tôi đồng ý với{" "}
            <Link to="/terms" className="text-blue-500 hover:underline">
              Điều khoản & Điều kiện
            </Link>
          </span>
        </div>

        {/* Hiển thị lỗi */}
        {errorMessage && <p className="text-red-500 text-sm text-center mb-3">{errorMessage}</p>}

        {/* Nút đăng ký */}
        <Button className="w-full bg-indigo-600 text-white py-2 rounded-md mb-3" onClick={handleRegister}>
          Sign Up
        </Button>

        {/* Hoặc đăng ký với Google */}
        <div className="text-center text-gray-500 text-sm mb-2">OR</div>
        <Button className="w-full bg-red-500 text-white flex items-center justify-center py-2 rounded-md">
          <FcGoogle className="mr-2" /> Sign up with Google
        </Button>

        {/* Đã có tài khoản? */}
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
