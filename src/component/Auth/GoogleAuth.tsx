import { GoogleLogin } from "@react-oauth/google";
import  authService  from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const handleSuccess = async (response: any) => {
    try {
      const token = response.credential; // Lấy JWT từ Google
      console.log("Google Token:", token);

      // Gửi token Google lên backend
      const data = await authService.googleSignIn(token);
      console.log("Server Response:", data);
      setAuth(data.access_token, data.refresh_token, data.user);

      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Google Login Failed")}
    />
  );
};

export default GoogleLoginButton;
