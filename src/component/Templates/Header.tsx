import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import '../../styles/global.css';
import { LucideSearch } from "lucide-react";
import AuthButton from "@/component/Auth/AuthButton";
import { useNavigate } from "react-router-dom";

// import { LucideSearch, LucidePhone, LucideUser } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
     <>
    <header className="flex items-center justify-between px-6 py-4 shadow-md HeaderBackground">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-[13rem]">
          <img src="https://hasaki.vn/v3/images/graphics/logo_site_2024_2.svg" alt="" />
        </div>
      </div>

      {/* Center Section: Search bar and Navigation menu */}
      <div className="flex-1 flex items-center space-x-6 mx-6">
        {/* Search bar */}
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Nhập vào loại da hoặc tên dịch vụ bạn muốn ..."
            className="pl-10 rounded-2xl bg-white"
          />
          <LucideSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Navigation menu */}
       
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/question')} className="skinCheck border-purple-600">
          Skin Check
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2 text-white">
          {/* <LucidePhone /> */}
          <span>Hỗ trợ khách hàng</span>
        </Button>
        {/* <Button variant="ghost" className="flex items-center text-white space-x-2"> */}
          {/* <LucideUser /> */}
          {/* <span>Login / Sign up</span> */}
        {/* </Button>*/}
        <AuthButton/>
      </div>

    </header>
    <div id="main_menu" className="flex">
    {/* items-center justify-center */}
        <nav className="hidden md:flex items-center text-gray-600 mt-4 md:mt-0 w-[80%] mx-auto">
            <a href="#" className="flex items-center space-x-1 text-purple-600 font-medium">
              {/* <LucideUser /> */}
              <span>Giới thiệu</span>
            </a>
            <a href="#" className="hover:text-purple-600">Dịch vụ</a>
            <a href="#" className="hover:text-purple-600">Bảng giá</a>
            <a href="#" className="hover:text-purple-600">Lộ trình</a>
            <a href="#" className="hover:text-purple-600">Hình ảnh quảng cáo</a>
            <a href="#" className="hover:text-purple-600">Liên hệ</a>
            <a href="#" className="hover:text-purple-600">Sự kiện</a>
        </nav>
    </div>
    </>
  );
};

export default Header;
