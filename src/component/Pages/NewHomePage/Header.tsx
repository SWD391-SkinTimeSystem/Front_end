import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="bg-[#8BA57E] text-white px-20 p-5">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">Shop</a>
          <a href="#" className="hover:text-gray-200">Products</a>
          <a href="#" className="hover:text-gray-200">About Us</a>
          <a href="#" className="hover:text-gray-200">Contact</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-gray-200">My Account</a>
          <button className="hover:text-gray-200">
            <Search size={20} />
          </button>
          <button className="bg-[#8BC34A] p-2 rounded-full">
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
