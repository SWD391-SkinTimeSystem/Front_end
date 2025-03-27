import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { Navigation, Autoplay } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  serviceGroupId: string;
  serviceGroupName: string;
  description?: string;
  image?: string;
}

interface CategoryProps {
  categoryList: Category[];
}

export default function Categories({ categoryList }: CategoryProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
        Dịch vụ chăm sóc da
      </h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        speed={2500}
        className="w-full"
      >
        {categoryList.map((category, index) => (
          <SwiperSlide key={category.serviceGroupId}>
            <motion.div 
              className="text-center cursor-pointer transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ 
                once: true, 
                amount: 0.2 
              }}
            >
              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 relative overflow-hidden rounded-full border-2 border-white/30">
                    <img
                      src={category.image || "/placeholder.jpg"}
                      alt={category.serviceGroupName}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-white mt-2 text-shadow">
                    {category.serviceGroupName}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}