import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "@/store/authStore";
import { googleLogin } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Icon Google

const GoogleAuth: React.FC = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await googleLogin(tokenResponse.access_token);
        authStore.login(data.user, data.accessToken);
        navigate("/dashboard");
      } catch (error) {
        console.error("Google login failed", error);
      }
    },
    onError: () => console.error("Google Login Failed"),
  });

  return (
    <button
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 p-2 rounded shadow-md border border-gray-300 hover:bg-gray-100 transition"
    >
      <FcGoogle className="text-xl" /> Đăng nhập bằng Google
    </button>
  );
};

export default GoogleAuth;



// import { GoogleLogin } from "@react-oauth/google";
// import { useAuthStore }  from "@/store/authStore";
// import { googleLogin } from "@/services/authService";
// import { useNavigate } from "react-router-dom";

// const GoogleAuth: React.FC = () => {
//   const authStore = useAuthStore();
//   const navigate = useNavigate();

//   const handleSuccess = async (response: any) => {
//     const id_token = response.credential; // Google trả về id_token
//     try {
//       const data = await googleLogin(id_token);
//       authStore.login(data.user, data.accessToken);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Google login failed", error);
//     }
//   };

//   const handleFailure = () => {
//     console.error("Google Login Failed");
//   };

//   return (
//     <GoogleLogin
//       onSuccess={handleSuccess}
//       onError={handleFailure}
//     />
//   );
// };

// export default GoogleAuth;
