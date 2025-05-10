import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { motion, useInView } from "framer-motion";
import { Navigation, Autoplay } from "swiper/modules";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface Service {
  serviceNameId: string;
  serviceName: string;
  description?: string;
  price?: number;
  image?: string;
  serviceGroupId?: string;
}

interface ServiceProps {
  serviceList: Service[];
}

export default function ServiceList({ serviceList }: ServiceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  if (!serviceList || serviceList.length === 0) {
    return <p className="text-center text-gray-500">Không có dịch vụ nào khả dụng</p>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="mb-8 sm:mb-16 px-4"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800 mt-12"
      >
        Dịch vụ chăm sóc da
      </motion.h2>

      {serviceList.length >= 3 ? (
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="w-full"
        >
          {serviceList.map((service, index) => (
            <SwiperSlide key={service.serviceNameId || index} className="py-4">
              <motion.div
                variants={itemVariants}
                className="h-full"
              >
                <Card className="hover:shadow-xl transition-all duration-300 rounded-[20px] overflow-hidden h-full">
                  <CardHeader className="p-0 relative">
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                      <motion.img
                        src={service.image || "https://i.pinimg.com/474x/75/ab/fb/75abfb239c6dda8306f2c8bae6bf313f.jpg"}
                        alt={service.serviceName}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
                        transition={{ 
                          duration: 0.7,
                          delay: index * 0.1 
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {service.price && (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          className="absolute top-4 right-4 z-10"
                        >
                         <span className="bg-[#16b1c6] text-white px-3 py-1 rounded-full text-sm font-medium">
                            {service.price.toLocaleString()} VNĐ
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="text-lg sm:text-xl font-bold text-gray-800 mb-2"
                    >
                      {service.serviceName}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="text-gray-600 text-sm sm:text-base line-clamp-2 mb-4"
                    >
                      {service.description || "Dịch vụ chăm sóc da chuyên nghiệp."}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                     <Button 
                      className="w-full bg-[#326e51] hover:bg-indigo-600 text-white rounded-full h-10"
                    >
                      Đặt lịch ngay
                    </Button>

                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((service, index) => (
            <motion.div
              key={service.serviceNameId || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 rounded-[20px] overflow-hidden">
                <CardHeader className="p-0 relative">
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                    <img
                      src={service.image || "https://i.pinimg.com/474x/75/ab/fb/75abfb239c6dda8306f2c8bae6bf313f.jpg"}
                      alt={service.serviceName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {service.price && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-teal-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {service.price.toLocaleString()} VNĐ
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    {service.serviceName}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base line-clamp-2 mb-4">
                    {service.description || "Dịch vụ chăm sóc da chuyên nghiệp."}
                  </p>
                  <Button 
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-full h-10"
                  >
                    Đặt lịch ngay
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}