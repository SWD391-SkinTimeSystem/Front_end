import { Service } from '@/types/services';
import { Clock } from 'lucide-react';
import React from 'react';

interface BookingServiceInfoCardProps {
     service?: Service;
}

const BookingServiceInfoCard:React.FC<BookingServiceInfoCardProps> = ({service}) => {
     console.log("service", service);
     return (
          <div>
          <h1 className="text-xl font-semibold mb-5">Dịch vụ đã chọn</h1>
          <div
               key={11} // Thêm key vào phần tử ngoài cùng
               className="shadow-xl overflow-hidden transition-transform transform hover:translate-y-1"
          >
               <div className="flex m-5">
                    <img
                         src={service?.thumbnail}
                         alt={service?.serviceName}
                         className="w-[120px] h-[120px] rounded-[10px] object-cover"
                    />
                    <div className="pl-4 flex-1">
                         <h3 className="text-base font-semibold text-gray-800 mb-1">
                              {service?.serviceName}

                         </h3>

                         <p className="flex items-center py-1 text-base text-gray-600">
                              <Clock className="w-4 h-4 mr-1" />
                              {service?.duration} Giờ
                         </p>
                         <button
                              className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-semibold text-blue-500 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                         >
                              Xem chi tiết
                         </button>
                    </div>
               </div>
          </div>
          </div>
     );
};

export default BookingServiceInfoCard;