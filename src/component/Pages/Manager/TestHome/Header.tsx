import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  return (
    <header className={cn('bg-transparent p-4 shadow-none')}>
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          {/* <img 
            src="https://play-lh.googleusercontent.com/2AsTCrBMzH3c1to_umMRH1ZdVLPH0wcQ5OvD_Egb33u6qzI-BS14x4XrwpHh6yNZMw" 
            alt="Hasaki" 
            className="h-20 w-20 rounded-[50px] " 
          /> */}
        </div>
        
        {/* Điều hướng bên phải */}
        <nav className="ml-auto">
          <ul className="flex space-x-6">
            <li><a href="#home" className="text-white hover:text-[#e5fbf1] bg-transparent">Home</a></li>
            <li><a href="#about" className="text-white hover:text-[#e5fbf1] bg-transparent">About Us</a></li>
            <li><a href="#services" className="text-white hover:text-[#e5fbf1] bg-transparent">Services</a></li>
            <li><a href="#contact" className="text-white hover:text-[#e5fbf1] bg-transparent">Contact</a></li>
          </ul>
        </nav>

        {/* Button trong suốt */}
        <Button 
          variant="outline" 
          className="ml-6 text-white border-white bg-transparent hover:bg-white hover:text-black"
        >
          Book now
        </Button>
      </div>
    </header>
  );
};

export default Header;
