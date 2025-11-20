import React from "react";
 
 const FailedPage: React.FC = () => {
   return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
       <div className="max-w-md">
         <img
           src="https://www.freeiconspng.com/uploads/failure-icon-6.png"
           alt="Failed"
           className="w-full max-w-xs mx-auto"
         />
         <h1 className="text-4xl font-bold text-red-600 mt-6">
           FAILED!
         </h1>
         <p className="text-gray-700 mt-2">
           Đã xảy ra lỗi trong quá trình xử lý.  
           Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ.
         </p>
         <div className="flex justify-center gap-4 mt-6 w-full">
           <button
             onClick={() => window.history.back()}
             className="px-6 py-3 bg-[var(--background-color)] text-white rounded-lg hover:opacity-80 transition"
           >
             Quay lại
           </button>
           <button
             onClick={() => window.location.reload()}
             className="px-6 py-3 bg-red-600 text-white rounded-lg hover:opacity-80 transition"
           >
             Thử lại
           </button>
         </div>
       </div>
     </div>
   );
 };
 
 export default FailedPage;