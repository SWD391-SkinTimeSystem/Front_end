import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from 'react';

const WhyChooseUs: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const chooseSections = [
    {
      image: "https://i.pinimg.com/474x/f5/8a/dd/f58addb601f3ad2087fcad00368a81f0.jpg",
      title: "Chuyên Gia Hàng Đầu",
      description: "Đội ngũ chuyên gia da liễu giàu kinh nghiệm, tận tâm tư vấn và mang đến liệu trình chăm sóc da phù hợp nhất với bạn."
    },
    {
      image: "https://i.pinimg.com/474x/f2/34/5e/f2345eaa660c4245b5b8060d619ed8ee.jpg",
      title: "Công Nghệ Hiện Đại",
      description: "Ứng dụng công nghệ tiên tiến trong liệu trình chăm sóc da, giúp tối ưu hiệu quả và đảm bảo an toàn tuyệt đối cho làn da của bạn."
    },
    {
      image: "https://i.pinimg.com/474x/53/d6/d8/53d6d8e31ccf3530c323ae4e4a3cd6e8.jpg",
      title: "Trải Nghiệm Đẳng Cấp",
      description: "Không gian thư giãn sang trọng, dịch vụ chuyên nghiệp giúp bạn tận hưởng giây phút làm đẹp thoải mái và hiệu quả nhất."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
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
    <section 
      className="bg-[#f4f9f4] py-16 px-4 rounded-[30px] border-2 border-white/30 mt-12"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {chooseSections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="flex flex-col items-center"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "backOut"
                }}
                className="relative z-10 w-48 h-48 -mb-24 overflow-hidden"
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full rounded-full object-cover border-8 border-white shadow-lg"
                />
              </motion.div>
              <Card
                className="pt-24 pb-8 px-6 w-full h-full relative shadow-lg border border-gray-300 
                hover:shadow-2xl hover:bg-gradient-to-br from-gray-50 to-gray-100 
                transition-all duration-300 rounded-[50px]"
              >
                <CardContent className="text-center">
                  <h3 className="text-xl font-semibold mb-3 text-blue-800">
                    {section.title}
                  </h3>
                  <p className="text-gray-600">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;