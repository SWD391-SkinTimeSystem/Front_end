import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutUs: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-[#f4f9f4] py-16 px-4 rounded-[30px] border-2 border-white/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Multi-Image Gallery */}
          <motion.div 
            className="grid grid-cols-2 gap-6"
            variants={itemVariants}
          >
            <motion.div 
              className="grid gap-6"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-white shadow-lg rounded-2xl overflow-hidden h-64"
                variants={itemVariants}
              >
                <img 
                  src="https://i.pinimg.com/474x/38/31/5a/38315a090ce5609a0d6f4bca30737c12.jpg" 
                  alt="Spa Interior" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <motion.div 
                className="bg-white shadow-lg rounded-2xl overflow-hidden h-48"
                variants={itemVariants}
              >
                <img 
                  src="https://i.pinimg.com/474x/fe/87/dd/fe87dddd707d5223a27e2e579a014896.jpg" 
                  alt="Skincare Tools" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            </motion.div>
            <motion.div 
              className="grid gap-6 mt-12"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-white shadow-lg rounded-2xl overflow-hidden h-48"
                variants={itemVariants}
              >
                <img 
                  src="https://i.pinimg.com/474x/51/37/a7/5137a721114d0fdc7022bae00f5ff7ef.jpg" 
                  alt="Professional Treatment" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <motion.div 
                className="bg-white shadow-lg rounded-2xl overflow-hidden h-64"
                variants={itemVariants}
              >
                <img 
                  src="https://i.pinimg.com/474x/9b/01/68/9b016832abc52b3461c828c8859a3dcd.jpg" 
                  alt="Spa Team" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="flex flex-col justify-center"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl font-semibold text-[#2c5e3a] mb-6"
              variants={itemVariants}
            >
              Về Chúng Tôi
            </motion.h2>
            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-0 space-y-4">
                <motion.p 
                  className="text-[#2c5e3a]/80 leading-relaxed"
                  variants={itemVariants}
                >
                  Là không gian chăm sóc da chuyên sâu với triết lý "Vẻ đẹp từ sự tự nhiên". Chúng tôi kết hợp giữa công nghệ tiên tiến và các phương pháp chăm sóc da thuần tự nhiên.
                </motion.p>
                <motion.p 
                  className="text-[#2c5e3a]/80 leading-relaxed"
                  variants={itemVariants}
                >
                  Với đội ngũ chuyên gia dày dặn kinh nghiệm, chúng tôi cam kết mang đến những liệu trình chăm sóc da toàn diện, phục hồi và nuôi dưỡng làn da một cách nhẹ nhàng và hiệu quả.
                </motion.p>
                <motion.div 
                  className="space-y-3"
                  variants={itemVariants}
                >
                  {[
                    "Công nghệ điều trị hiện đại",
                    "Liệu trình được cá nhân hóa", 
                    "Sản phẩm chiết xuất từ thiên nhiên"
                  ].map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center space-x-3"
                      variants={itemVariants}
                    >
                      <svg className="w-6 h-6 text-[#2c5e3a]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#2c5e3a]/90">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;