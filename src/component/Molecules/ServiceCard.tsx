import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Phone, User, Clock, CalendarDays } from "lucide-react";
import "../../styles/global.css";
import { Service } from "@/types/services";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";

interface ServicesProps {
  services: Service;
}

export default function ServiceCard({ services }: ServicesProps) {
  const navigate = useNavigate();

  const serviceId = services.id;
  const handleViewDetails = (serviceId: string) => {
    console.log(`Xem chi tiết dịch vụ với serviceId: ${serviceId}`);
    navigate(`/service-detail/${serviceId}`);
  };

  const handleViewBooking = () => {
    navigate(`/booking/${serviceId}`);
  };

  return (
    <Card className="border shadow-none rounded-none mt-3 cursor-pointer w-[300px] h-[500px] flex flex-col">
      {/* Header */}
      <div className="p-4">
        <p className="text-[10px] text-gray-500">Thẩm mỹ không xâm lấn</p>
        <h2 
          className="text-lg font-semibold text-gray-900 h-12 overflow-hidden line-clamp-2" 
          onClick={() => handleViewDetails(services.id)}
        >
          {services.serviceName}
        </h2>
      </div>

      {/* Image */}
      <div className="h-[250px] overflow-hidden">
        <img
          src={services.thumbnail}
          alt={services.serviceName}
          className="w-full h-full object-cover"
          onClick={() => handleViewDetails(services.id)}
        />
      </div>

      {/* Info */}
      <CardContent className="p-4 space-y-2 border flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <User fill="gray" size={16} className="text-gray-500" />
              <span className="font-semibold">6.903</span> người trải nghiệm
            </span>
            <span className="flex items-center gap-1">
              <Star size={16} fill="gray" className="text-gray-400" />
              <span>0</span> đánh giá
            </span>
          </div>

          {/* Giá & Thời gian */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-bold text-orange-600">
              {formatCurrency(Number(services.price))}
            </p>
            <div className="flex items-center justify-between">
              <Clock size={16}/>
              <p className="text-gray-500 text-sm m-2"> 
                {services.serviceDetails?.length} lần | {services.duration} phút
              </p>
            </div>
          </div>

          {/* Mô tả */}
          <p className="text-gray-600 text-sm mt-2 h-12 overflow-hidden line-clamp-2">
            {services.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <Button className="booking text-white flex-1">
            <Phone size={16} className="mr-1" /> 1800 6324 <br/>Nhấn phím 2
          </Button>
          <Button 
            className="bg-orange-500 text-white flex-1" 
            onClick={() => handleViewBooking()}
          >
            <CalendarDays size={17} />Đặt hẹn
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}