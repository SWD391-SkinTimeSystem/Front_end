import React from "react";
 
 const NotFoundPage: React.FC = () => {
   return (
     <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 className="text-[11rem] font-bold">
         <span className="text-[var(--background-color)]">4</span>
         <span className="text-orange-500">0</span>
         <span className="text-[var(--background-color)]">4</span>
       </h1>
       <p className="text-xl text-gray-700 mt-2">
         Xin lỗi, trang bạn đang kiếm không tồn tại!
       </p>
       <button
             onClick={() => window.history.back()}
             className="mt-3 px-6 py-2 bg-[var(--background-color)] text-white rounded-lg hover:opacity-80"
             >
             Quay lại
           </button>
     </div>
   );
 };
 
 export default NotFoundPage;