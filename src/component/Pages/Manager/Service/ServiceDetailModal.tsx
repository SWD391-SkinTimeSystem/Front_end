// import React, { useState } from 'react';
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogDescription 
// } from "@/components/ui/dialog";
// import { 
//   Carousel, 
//   CarouselContent, 
//   CarouselItem, 
//   CarouselNext, 
//   CarouselPrevious 
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import { Clock, Tag, Info } from "lucide-react";

// const colors = {
//   primary: '#326e51', // Green
//   background: '#f0fdf4', // Light green background
//   text: '#064e3b', // Dark green text
//   accent: '#f1f1f1', // Bright green
// };

// interface Service {
//   id: string;
//   serviceName: string;
//   serviceGroupName: string;
//   description: string;
//   duration: number;
//   thumbnail: string;
//   price: number;
//   serviceDetails: ServiceDetailType[];
//   serviceImages: string[];
// }
// interface ServiceDetailType {
//   id: string;        
//   name: string;
//   description: string;
//   step: number;
//   duration: number;
//   dateToNextStep: number;
// };


// interface ServiceDetailModalProps {
//   service: Service;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ 
//   service, 
//   isOpen, 
//   onClose 
// }) => {
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   // Combine thumbnail with additional images
//   const allImages = [service.thumbnail, ...(service.serviceImages || [])];

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl" style={{ backgroundColor: colors.background }}>
//         <DialogHeader>
//           <DialogTitle 
//             className="text-2xl font-bold"
//             style={{ color: colors.text }}
//           >
//             {service.serviceName}
//           </DialogTitle>
//           <DialogDescription>
//             Chi tiết dịch vụ chăm sóc da
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Image Gallery */}
//           <div>
//             <Carousel 
//               opts={{ startIndex: activeImageIndex }}
//               onSlideChange={(api) => {
//                 if (api) setActiveImageIndex(api.selectedScrollSnap());
//               }}
//             >
//               <CarouselContent>
//                 {allImages.map((img, index) => (
//                   <CarouselItem key={index}>
//                     <Card>
//                       <CardContent className="flex items-center justify-center p-0">
//                         <img 
//                           src={img} 
//                           alt={`${service.serviceName} - Hình ${index + 1}`} 
//                           className="w-full h-80 object-cover rounded-lg"
//                         />
//                       </CardContent>
//                     </Card>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious />
//               <CarouselNext />
//             </Carousel>

//             {/* Thumbnail Preview */}
//             <div className="flex space-x-2 mt-4 overflow-x-auto">
//               {allImages.map((img, index) => (
//                 <img 
//                   key={index}
//                   src={img} 
//                   alt={`Thumbnail ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer ${
//                     index === activeImageIndex 
//                       ? 'border-2 border-green-500' 
//                       : 'opacity-60 hover:opacity-100'
//                   }`}
//                   onClick={() => setActiveImageIndex(index)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Service Details */}
//           <div>
//             <div className="mb-4">
//               <p className="text-gray-600 mb-4">{service.description}</p>

//               <div className="flex items-center mb-2">
//                 <Clock className="h-5 w-5 mr-2" style={{ color: colors.text }} />
//                 <span style={{ color: colors.text }}>
//                   Thời gian: {service.duration} phút
//                 </span>
//               </div>

//               <div className="flex items-center">
//                 <Tag className="h-5 w-5 mr-2" style={{ color: colors.text }} />
//                 <span style={{ color: colors.text }}>
//                   Giá: {service.price.toLocaleString('vi-VN')} VNĐ
//                 </span>
//               </div>
//             </div>

//             <h3 
//               className="text-lg font-semibold mb-4"
//               style={{ color: colors.text }}
//             >
//               Quy trình thực hiện
//             </h3>

//             {service.serviceDetails && service.serviceDetails.length > 0 ? (
//               <div className="space-y-4">
//                 {service.serviceDetails.map((detail) => (
//                   <div 
//                     key={detail.id} 
//                     className="border-l-4 pl-4 py-2"
//                     style={{ borderColor: colors.primary }}
//                   >
//                     <h4 
//                       className="font-medium flex items-center"
//                       style={{ color: colors.text }}
//                     >
//                       <span 
//                         className="w-6 h-6 rounded-full mr-2 flex items-center justify-center text-white"
//                         style={{ 
//                           backgroundColor: colors.primary 
//                         }}
//                       >
//                         {detail.step}
//                       </span>
//                       {detail.name}
//                     </h4>
//                     <p className="text-gray-600 text-sm mt-1">
//                       {detail.description}
//                     </p>
//                     <div 
//                       className="flex items-center mt-2 text-xs"
//                       style={{ color: colors.text }}
//                     >
//                       <Clock className="h-3 w-3 mr-1" />
//                       <span>{detail.duration} phút</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 italic">
//                 Chưa có thông tin chi tiết quy trình
//               </p>
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ServiceDetailModal;


import React, { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Pencil,
  Plus,
  Eye,
  Clock,
  Tag,
  Image as ImageIcon,
  MapIcon
} from "lucide-react";
import { FormProvider, useForm } from 'react-hook-form';


interface Service {
  id: string;
  serviceName: string;
  serviceGroupName: string;
  description: string;
  duration: number;
  thumbnail: string;
  serviceImages: string[];
  price: number;
  serviceDetails: ServiceDetailType[];
}

interface ServiceDetailType {
  id: string;
  name: string;
  description: string;
  step: number;
  duration: number;
}

interface ServiceDetailModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}
const colors = {
  primary: '#326e51', 
  secondary: '#4CAF50', 
  background: '#f0fdf4', 
  text: '#064e3b', 
  accent: '#e6f3e6', 
};
export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const allImages = [service.thumbnail, ...(service.serviceImages || [])];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl" style={{ backgroundColor: colors.background }}>
        <DialogHeader>
          <DialogTitle
            className="text-2xl font-bold"
            style={{ color: colors.text }}
          >
            {service.serviceName}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {service.serviceGroupName}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <Carousel
              opts={{ startIndex: activeImageIndex }}
              onSlideChange={(api) => {
                if (api) setActiveImageIndex(api.selectedScrollSnap());
              }}
            >
              <CarouselContent>
                {allImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="flex items-center justify-center p-0">
                        <img
                          src={img}
                          alt={`${service.serviceName} - Hình ${index + 1}`}
                          className="w-full h-96 object-cover rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded cursor-pointer transition-all duration-300 ${index === activeImageIndex
                      ? 'border-2 border-green-500 scale-105'
                      : 'opacity-60 hover:opacity-100'
                    }`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Service Details */}
          <div>
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{service.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3" style={{ color: colors.secondary }} />
                  <div>
                    <p className="text-sm text-gray-600">Thời gian</p>
                    <p className="font-semibold" style={{ color: colors.text }}>
                      {service.duration} phút
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Tag className="h-6 w-6 mr-3" style={{ color: colors.secondary }} />
                  <div>
                    <p className="text-sm text-gray-600">Giá dịch vụ</p>
                    <p className="font-semibold" style={{ color: colors.text }}>
                      {service.price.toLocaleString('vi-VN')} VNĐ
                    </p>
                  </div>
                </div>
              </div>

              <h3
                className="text-lg font-semibold mb-4 flex items-center"
                style={{ color: colors.text }}
              >
                <MapIcon className="h-5 w-5 mr-2" />
                Lộ trình thực hiện
              </h3>

              {/* {service.serviceDetails && service.serviceDetails.length > 0 ? ( */}
              {service?.serviceDetails?.length > 0 ? (
                <div className="space-y-4 ml-6">
                  {service.serviceDetails.map((detail) => (
                    <div
                      key={detail.id}
                      className="border-l-4 pl-4 py-3 hover:bg-green-50 transition-colors"
                      style={{ borderColor: colors.primary }}
                    >
                      <div className="flex items-center mb-2">
                        <span
                          className="w-7 h-7 rounded-full mr-3 flex items-center justify-center text-white font-bold"
                          style={{
                            backgroundColor: colors.primary
                          }}
                        >
                          {detail.step}
                        </span>
                        <h4
                          className="font-semibold"
                          style={{ color: colors.text }}
                        >
                          {detail.name}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm ml-10">
                        {detail.description}
                      </p>
                      <div
                        className="flex items-center mt-2 text-xs ml-10"
                        style={{ color: colors.text }}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{detail.duration} phút</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic text-center">
                  Chưa có thông tin chi tiết lộ trình
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

