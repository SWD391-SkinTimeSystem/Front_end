import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {useAccountStore} from "@/store/useAccountStore";
import  {useAuthStore}  from "@/store/authStore";
import { useEffect } from "react";
const AccountSidebar = () => {
     const { account,fetchAccount, isLoading, error } = useAccountStore();
     const { user, logout } = useAuthStore();
     const navigate = useNavigate();
     const location = useLocation(); // Lấy đường dẫn hiện tại
   
     console.log("AccountSidebar account", account);
     const handleLogout = () => {
          logout();
          navigate("/");
     };

     const isActive = (path: string) => location.pathname === path ? "text-indigo-600 font-bold" : "text-gray-600";

     return (
          <div className="flex flex-col">
               <div className="flex flex-row items-center text-gray-600 p-5">
                    <UserRound size={40} className="mr-5"/>
                    <div>
                         <h1 className="text-sm mt-2">Chào {account?.fullname}</h1>
                         <p className="text-gray-500">
                              <span className="text-grey-600">Chỉnh sửa tài khoản</span>
                         </p>
                    </div>
               </div>
               <Separator />
               <div className="flex flex-col p-5">
                    <h2 className="text-sm">Quản lý tài khoản</h2>
                    <ul className="mt-2">
                         <li className="py-2">
                              <Link to="/account/appointment-list" className={`text-sm ${isActive("/account/appointment-list")}`}>
                                   Booking của tôi
                              </Link>
                         </li>
                         <li className="py-2">
                              <Link to="/account/ticket" className={`text-sm ${isActive("/account/ticket")}`}>
                                   Sự kiện của tôi
                              </Link>
                         </li>
                         <li className="py-2">
                              <button onClick={handleLogout} className="hover:text-red-600 text-sm">
                                   Đăng xuất
                              </button>
                         </li>
                    </ul>
               </div>
          </div>
     );
};

export { AccountSidebar };
