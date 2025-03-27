import React from "react";

const Footer: React.FC = () => {
  return (

    <footer className="bg-transparent text-white py-10">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 text-sm">
        {/* Thương hiệu */}
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-3">Hasaki</h4>
          <p className="text-gray-400">Dịch vụ chăm sóc da chuyên nghiệp, giúp bạn luôn rạng rỡ.</p>
        </div>

        {/* Dịch vụ */}
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-3">Dịch Vụ</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Chăm sóc da mặt</a></li>
            <li><a href="#" className="hover:text-gray-300">Trẻ hóa da</a></li>
            <li><a href="#" className="hover:text-gray-300">Liệu trình đặc biệt</a></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div className="text-center flex flex-col items-center">
          <h4 className="text-lg font-semibold mb-3">Liên Hệ</h4>
          <p className="text-gray-400">Email: support@glowcare.com</p>
          <p className="text-gray-400">Hotline: 0123 456 789</p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-gray-300">FB</a>
            <a href="#" className="hover:text-gray-300">IG</a>
            <a href="#" className="hover:text-gray-300">YT</a>
          </div>
        </div>

      </div>

      {/* Bản quyền */}
      <div className="text-center mt-6 border-t border-gray-700 pt-4 text-gray-500 text-xs">
        <p>&copy; 2025 Hasaki. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
