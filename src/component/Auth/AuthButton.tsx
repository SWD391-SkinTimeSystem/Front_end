import { Button } from "@/components/ui/button";
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
        <div className="flex items-center gap-4 space-x-4">
          <span className="text-gray-700">{user.fullname}</span>
          <Button variant="ghost" className="flex items-center text-white space-x-2" onClick={handleLogout}>
            <span>Logout</span>
          </Button>
        </div>
      ) : (
        <Button variant="ghost" className="flex items-center text-white space-x-2" onClick={() => navigate("/login")}>
          <span>Login / Sign up</span>
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
