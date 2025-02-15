import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const AccountSidebar = () => {
     return (
          <div className="flex flex-col">
               <div className="flex flex-row items-center text-gray-600 p-5">
                    <UserRound size={40} className="mr-5"/>
                    <div>
                         <h1 className="text-sm mt-2">Chào Thư</h1>
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
                              <Link to="/account/profile" className="font-bold text-sm text-amber-400">
                                   Booking của tôi
                              </Link>
                         </li>
                         <li className="py-2">
                              <Link to="/account/settings" className="hover:text-indigo-600 text-sm">
                                   Sự kiện của tôi
                              </Link>
                         </li>
                         <li className="py-2">
                              <Link to="/account/subscription" className="hover:text-indigo-600 text-sm">
                                   Đăng xuất
                              </Link>
                         </li>
                    </ul>
               </div>
          </div>
     );
}
export {
     AccountSidebar

};