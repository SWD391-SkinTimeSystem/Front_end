// import React from "react";
// import { Button } from "@/components/ui/button";
// import '../../../../styles/global.css';

// const HeroBanner: React.FC = () => {
//   return (
//     <div className="relative min-h-[90vh] flex items-center bg-transparent">
//       <div className="container mx-auto grid grid-cols-12 items-center">
//         {/* Cột hình ảnh bên trái */}
//         {/* <div className="container mx-auto grid grid-cols-12 gap-8 items-center"> */}
//         <div className="col-span-6 flex justify-center relative">
//   <img
//     src="https://i.pinimg.com/474x/4f/ac/6a/4fac6a5b2f1d11667644f8d99b498d6a.jpg"
//     alt="Product"
//     className="w-[80%] max-h-[700px] object-cover rounded-[50px] shadow-lg"
//   />
// </div>

//       {/* </div> */}

//         {/* Cột nội dung bên phải */}
//         <div className="col-span-6 text-white space-y-6 pl-12">
//           <h1 className="text-5xl font-bold">
//             Elevate Your Life With
//             <span className="text-[#3498db]"> Rebirth Evolution</span>
//           </h1>
//           <p className="text-xl text-gray-300 opacity-80">
//             Transformative Learning: Your Journey To A Renewed Self Starts Here!
//           </p>
//           <Button
//             size="lg"
//             className="bg-[#3498db] hover:bg-opacity-90 text-white rounded-full px-8 py-3"
//           >
//             Join The Evolution Today
//           </Button>

//           {/* Thông tin bổ sung */}
//           <div className="flex space-x-8 mt-8">
//             {[
//               { value: "16", label: "Trained Coaches" },
//               { value: "05", label: "Years Of Experience" },
//               { value: "340", label: "Happy Clients" },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="text-center bg-white/10 rounded-lg p-4 backdrop-blur-sm"
//               >
//                 <h3 className="text-3xl font-bold text-[#3498db]">
//                   {item.value}
//                 </h3>
//                 <p className="text-sm text-gray-300">{item.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroBanner;


import { motion } from "framer-motion";
import { Image, Search } from "lucide-react";
import { useState } from "react";

const services = [
  {
    name: "Chăm sóc da mặt",
    image: "https://i.pinimg.com/474x/4f/ac/6a/4fac6a5b2f1d11667644f8d99b498d6a.jpg",
    color: "bg-blue-100",
  },
  {
    name: "Dưỡng da",
    image: "https://i.pinimg.com/474x/ea/41/4f/ea414f48705e4dceb3e3eacb684f27fd.jpg",
    color: "bg-green-100",
  },
  {
    name: "Liệu trình",
    image: "https://i.pinimg.com/474x/f6/a3/97/f6a397554cee90a448d2ffb8e5f1803a.jpg",
    color: "bg-purple-100",
  },
];


export default function BookingBanner() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-xl w-full backdrop-blur-md bg-white/10 p-6 rounded-2xl"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-white drop-shadow-md">
            <span className="text-[#16b1c6]">Thư giãn</span> & Chăm sóc làn da của bạn
          </h1>
          <p className="text-gray-100 mb-6 sm:mb-8 text-sm sm:text-base drop-shadow-md">
            Hãy đặt lịch ngay để trải nghiệm những liệu trình chăm sóc da chuyên sâu, giúp bạn luôn rạng rỡ và tự tin.
          </p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative w-md w-full"
        >
          <input
            type="text"
            placeholder="Tìm dịch vụ chăm sóc da..."
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#16b1c6] text-white p-2 rounded-full hover:bg-green-600 transition-all duration-300">
            <Search className="w-5 h-5" />

          </button>
        </motion.div>
      </motion.div>

      {/* Right Services */}
      <div className="relative w-full md:w-[600px] h-[230px] sm:h-[330px] md:h-[400px] flex items-center justify-between sm:gap-4 md:gap-6">
        {services.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div
              className={`w-24 sm:w-48 h-40 sm:h-64 ${item.color} rounded-3xl overflow-hidden shadow-lg transition-all duration-200 hover:scale-105 ${hoveredIndex === index ? "z-10" : "z-0"
                }`}
            >
              <div className="relative w-full h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + (index * 0.2) }}
                  className="absolute bottom-4 left-0 right-0 px-4 text-center"
                >
                  <span className="inline-block bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm font-medium">
                    {item.name}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
