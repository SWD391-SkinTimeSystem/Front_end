import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const AuthButton: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user.fullname}</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => navigate("/login")}>
          Login / Sign up
        </button>
      )}
    </div>
  );
};

export default AuthButton;
