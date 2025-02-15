import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import layerImage from "@/assets/hasaki.png";


const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      username: "",
      password: "",
      email: "",
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const validatePassword = (password: string): boolean => password.length >= 8;

  const validateForm = (): boolean => {
      if (!formData.username.trim()) {
          toast.error("Username is required");
          return false;
      }

      if (!validateEmail(formData.email)) {
          toast.error("Invalid email");
          return false;
      }

      if (!validatePassword(formData.password)) {
          toast.error("Password must be at least 8 characters long");
          return false;
      }

      return true;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
      e.preventDefault();

      if (!validateForm()) return;

      try {
          setLoading(true);
          const response = await fetch("", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
          });

          if (!response.ok) {
              const errorData = await response.json();
              toast.error(errorData.message || "Registration failed");
              return;
          }

          const data = await response.json();

          toast.success("Registration successful");
          localStorage.setItem("token", data.token);

          if (data.role === "user") {
              navigate("/");
          }
      } catch (error) {
          console.error("Network Error:", error);
          toast.error("Registration failed");
      } finally {
          setLoading(false);
      }
  };

  return (
      <div className="h-[86vh] flex items-center justify-center px-5 lg:px-0">
          <ToastContainer />
          <div className="flex justify-center flex-1 max-w-screen-lg bg-white border shadow sm:rounded-lg">
              <div className="flex-1 hidden text-center md:flex">
                  <img
                      src={layerImage}
                      alt="logo"
                      className="m-5 bg-center bg-no-repeat bg-inherit rounded-lg justify-center items-center aspect-square"
                  />
              </div>
              <div className="p-4 lg:w-1/2 xl:w-1/2 md:w-1/3">
                  <div className="flex flex-col items-center">
                      <div className="text-center">
                          <h1 className="mt-4 mb-2 text-2xl font-extrabold text-blue-900 xl:text-4xl">
                              Sign up
                          </h1>
                      </div>
                      <form onSubmit={handleSubmit} className="flex-1 w-full">
                          <div className="flex flex-col max-w-xs gap-4 mx-auto">
                              <label className="text-sm font-medium text-left text-gray-700">
                                  Username
                              </label>
                              <input
                                  className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                                  type="text"
                                  name="username"
                                  placeholder="Please enter your username"
                                  value={formData.username}
                                  onChange={handleInputChange}
                              />

                              <label className="text-sm font-medium text-left text-gray-700">
                                  Password
                              </label>
                              <div className="relative w-full">
                                  <input
                                      className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                                      type={passwordVisible ? "text" : "password"}
                                      name="password"
                                      placeholder="Please enter your password"
                                      value={formData.password}
                                      onChange={handleInputChange}
                                  />
                                  <button
                                      type="button"
                                      className="absolute text-gray-500 right-3 top-3"
                                      onClick={() => setPasswordVisible(!passwordVisible)}
                                  >
                                      {passwordVisible ? (
                                          <EyeInvisibleOutlined />
                                      ) : (
                                          <EyeOutlined />
                                      )}
                                  </button>
                              </div>

                              <label className="text-sm font-medium text-left text-gray-700">
                                  Email
                              </label>
                              <input
                                  className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                                  type="email"
                                  name="email"
                                  placeholder="Please enter your email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                              />

                              <button
                                  type="submit"
                                  disabled={loading}
                                  className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-blue-900 rounded-lg hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                              >
                                  {loading ? (
                                      "Đang xử lý..."
                                  ) : (
                                      <span className="ml-3">{"Sign up"}</span>
                                  )}
                              </button>
                              <p className="mt-2 mb-4 text-xs text-center text-gray-600">
                                  Have an account - {" "}
                                  <Link to="/login">
                                      <span className="font-semibold text-blue-900">
                                          Login
                                      </span>
                                  </Link>
                              </p>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Register;

// const Register = () => {
//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [birthDate, setBirthDate] = useState("");
//   const [gender, setGender] = useState("Nam");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [agree, setAgree] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const authStore = useAuthStore();
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     if (!fullName || !phone || !birthDate || !email || !password || !confirmPassword) {
//       setErrorMessage("Vui lòng nhập đầy đủ thông tin");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setErrorMessage("Mật khẩu không khớp");
//       return;
//     }

//     if (!agree) {
//       setErrorMessage("Bạn phải đồng ý với điều khoản");
//       return;
//     }

//     try {
//       const response = await authStore.register({ fullName, phone, birthDate, gender, email, password });
//       if (response.success) {
//         navigate("/login");
//       } else {
//         setErrorMessage(typeof response.message === 'string' ? response.message : "Đăng ký thất bại");
//       }
//     } catch (error) {
//       setErrorMessage("Có lỗi xảy ra, vui lòng thử lại");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center mb-4">Đăng ký tài khoản</h2>

//         {/* Họ và tên */}
//         <Input placeholder="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mb-3" />

//         {/* Số điện thoại */}
//         <Input placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-3" />

//         {/* Ngày sinh & Giới tính */}
//         <div className="flex gap-2 mb-3">
//           <Input placeholder="Ngày" className="w-1/3" />
//           <Input placeholder="Tháng" className="w-1/3" />
//           <Input placeholder="Năm" className="w-1/3" />
//         </div>

//         <div className="flex gap-4 mb-3">
//           <label className="flex items-center gap-1">
//             <input type="radio" name="gender" value="Nam" checked={gender === "Nam"} onChange={() => setGender("Nam")} />
//             Nam
//           </label>
//           <label className="flex items-center gap-1">
//             <input type="radio" name="gender" value="Nữ" checked={gender === "Nữ"} onChange={() => setGender("Nữ")} />
//             Nữ
//           </label>
//           <label className="flex items-center gap-1">
//             <input type="radio" name="gender" value="Khác" checked={gender === "Khác"} onChange={() => setGender("Khác")} />
//             Khác
//           </label>
//         </div>

//         {/* Email */}
//         <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3" />

//         {/* Mật khẩu */}
//         <Input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-3" />

//         {/* Xác nhận mật khẩu */}
//         <Input type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mb-3" />

//         {/* Điều khoản */}
//         <div className="flex items-center gap-2 mb-3">
//           <Checkbox checked={agree} onCheckedChange={(checked: boolean | ((prevState: boolean) => boolean)) => setAgree(checked)} />
//           <span>
//             Tôi đồng ý với{" "}
//             <Link to="/terms" className="text-blue-500 hover:underline">
//               Điều khoản & Điều kiện
//             </Link>
//           </span>
//         </div>

//         {/* Hiển thị lỗi */}
//         {errorMessage && <p className="text-red-500 text-sm text-center mb-3">{errorMessage}</p>}

//         {/* Nút đăng ký */}
//         <Button className="w-full bg-indigo-600 text-white py-2 rounded-md mb-3" onClick={handleRegister}>
//           Sign Up
//         </Button>

//         {/* Hoặc đăng ký với Google */}
//         <div className="text-center text-gray-500 text-sm mb-2">OR</div>
//         <Button className="w-full bg-red-500 text-white flex items-center justify-center py-2 rounded-md">
//           <FcGoogle className="mr-2" /> Sign up with Google
//         </Button>

//         {/* Đã có tài khoản? */}
//         <p className="text-center text-gray-500 mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500 hover:underline">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
