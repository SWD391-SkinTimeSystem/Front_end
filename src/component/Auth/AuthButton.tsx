import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationBell from "../Atoms/NotificationBell";

const AuthButton: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  console.log(user);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-4 space-x-4">
          <NotificationBell />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{user.fullname}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem onClick={handleLogout}>
                {/* <Button variant="ghost" className="flex items-center text-white space-x-2" > */}
                Logout
                {/* </Button> */}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => navigate("/account/ticket")}>
                Vé của tôi
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => navigate("/account/appointment-list")}>
                Lịch hẹn của tôi
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-gray-700">{user.fullname}</span>

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
