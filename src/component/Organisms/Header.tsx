import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { LucideSearch, LucidePhone, LucideUser } from "lucide-react";

const Header: React.FC = () => {
  return (
     <>
    <header className="flex items-center justify-between px-6 py-4 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="text-xl font-bold text-purple-600">GlowUp</div>
      </div>

      {/* Center Section: Search bar and Navigation menu */}
      <div className="flex-1 flex items-center space-x-6 mx-6">
        {/* Search bar */}
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search ..."
            className="pl-10"
          />
          {/* <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
        </div>

        {/* Navigation menu */}
       
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="text-purple-600 border-purple-600">
          Skin Check
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          {/* <LucidePhone /> */}
          <span>Hỗ trợ khách hàng</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          {/* <LucideUser /> */}
          <span>Login / Sign up</span>
        </Button>
      </div>
    </header>
    <div className="flex items-center justify-center px-6 py-4">
    <nav className="hidden md:flex items-center space-x-6 text-gray-600 mt-4 md:mt-0">
        <a href="#" className="flex items-center space-x-1 text-purple-600 font-medium">
          {/* <LucideUser /> */}
          <span>About Us</span> 
        </a>
        <a href="#" className="hover:text-purple-600">Services</a>
        <a href="#" className="hover:text-purple-600">Pricing</a>
        <a href="#" className="hover:text-purple-600">Guides</a>
        <a href="#" className="hover:text-purple-600">Real Images</a>
        <a href="#" className="hover:text-purple-600">Contact Us</a>
        <a href="#" className="hover:text-purple-600">News & Events</a>
      </nav>
      </div>
    </>
  );
};

export default Header;
