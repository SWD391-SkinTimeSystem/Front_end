// src/components/ui/BookingList.tsx
import React from "react";
import { CircleUser, MapPin } from "lucide-react";
import { formatDate } from "../../lib/utils";

export interface BookingItem {
  id: string;
  status: string; 
  date: Date;
  therapistName: string;
  serviceName: string;
  thumbnail: string;
  isTretmentPlan: boolean;
  timeStart: string;
  description: string;  
}

interface BookingListProps {
  bookings: BookingItem[];
  onViewDetails: (id: string) => void;
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "Not_started":
      return "Sắp diễn ra";
    case "Completed":
      return "Đã hoàn thành";
    case "Canceled":
      return "Đã hủy";
    default:
      return status;
  }
};

export const BookingList: React.FC<BookingListProps> = ({
  bookings,
  onViewDetails,
}) => {
  console.log ("vao trang booking list nè");

  return (
    <div className="space-y-5">
      {bookings.map((booking) => {
        const date = formatDate(booking.timeStart);
        return (
          <div
            key={booking.id}
            className="bg-gray-100 rounded-[30px] shadow-md overflow-hidden transition-transform transform hover:translate-y-1"
          >
            <div className="h-10 flex items-center justify-between flex-row border-b border-gray-300 mr-5 ml-5 mt-2">
              <div className="flex flex-row">
                <p>
                  Ngày hẹn:{" "}
                  <span className="text-green-400 font-bold">{date}</span>{" "}
                  <span className="mr-2 ml-2">|</span>
                </p>
                <p className="text-orange-400 font-semibold">
                  {getStatusLabel(booking.status)}
                </p>
              </div>
              <button
                className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center font-sans text-xs font-semibold text-blue-500 transition-all"
                onClick={() => onViewDetails(booking.id)}
              >
                Xem chi tiết
              </button>
            </div>

            <div className="flex m-5">
              <img
                src={booking.thumbnail}
                alt={booking.serviceName}
                className="w-[120px] h-[120px] rounded-[10px] object-cover"
              />
              <div className="pl-4 flex-1">
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  {booking.serviceName}
                </h3>
                <p className="flex items-center py-1 text-base text-gray-600">
                  <CircleUser className="w-4 h-4 mr-1" />
                  {booking.therapistName}
                </p>
                <p className="flex items-center py-1 text-base text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {booking.description || ""}
                </p>
                <strong>Dịch vụ có lộ trình không: </strong>
                <span className="text-mg font-bold text-emerald-700">
                  {booking.isTretmentPlan ? "Có" : "Không"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
