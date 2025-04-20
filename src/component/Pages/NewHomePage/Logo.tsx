import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
         <img
              src="/src/assets/logo-trang.png"
              alt="Main"
              className="object-cover w-[70px] h-[70px]"
              />
      </div>
      <div className="text-2xl font-semibold text-white">Demi</div>
    </div>
  );
};
export default Logo;
