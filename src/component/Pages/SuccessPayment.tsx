import React from "react";
 import { Link } from "react-router-dom";
 
 const SuccessPage: React.FC = () => {
   return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
       <div className="max-w-md">
         <img
           src="https://cdn-icons-png.flaticon.com/512/2003/2003258.png"
           alt="Success"
           className="w-full max-w-xs mx-auto"
         />
         <h1 className="text-4xl font-bold text-[var(--background-color)] mt-6">
           SUCCESS!
         </h1>
         <p className="text-gray-700 mt-2">
           Bạn đã thực hiện giao dịch thành công !.  
           Vui lòng kiểm tra thông báo để xem thông tin chi tiết.
         </p>
         <Link
           to="/"
           className="mt-6 inline-block px-6 py-3 bg-[var(--background-color)] text-white rounded-lg hover:opacity-80 transition"
         >
           Quay về trang chủ
         </Link>
       </div>
     </div>
   );
 };
 
 export default SuccessPage;