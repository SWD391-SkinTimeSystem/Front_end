import React from "react";
import { Clock, CircleUser, MapPin } from "lucide-react";
export interface AppointmentItem {
  serviceId: number;
  serviceName: string;
  skinTherapistName: string;
  status: "upcoming" | "completed" | "cancel";
  createTime: string;
  totalPayment: number;
  voucher: string;
  reservedDate: string;
  startTime: string;
  endTime: string;
  quantity: number;
  pricePerService: number;
  voucherDiscount: number;  // Số tiền được giảm bởi voucher (nếu voucher = "" => 0)
  deposit: number;          // Đã cọc trước bao nhiêu
  checkinCode: string;
  thumbnail: string;
  description: string;
}


// Props cho AppointmentList
interface AppointmentListProps {
  appointments: AppointmentItem[];
  onViewDetails: (serviceId: number) => void;
}

// Hàm format date/time 
function formatDate(isoString: string) {
  const dateObj = new Date(isoString);
  return dateObj.toLocaleDateString("vi-VN");
}

function formatTime(isoString: string) {
  const dateObj = new Date(isoString);
  // Trả về dạng "HH:mm"
  return dateObj.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onViewDetails,
}) => {
  return (
    <div className="space-y-5">
      {appointments.map((appointment) => {
        // Tách riêng date/time từ reservedDate
        const date = formatDate(appointment.reservedDate);
        const time = formatTime(appointment.reservedDate);

        return (
          <div
            key={appointment.serviceId} // Thêm key vào phần tử ngoài cùng
            className="bg-gray-100 rounded-[30px] shadow-md overflow-hidden transition-transform transform hover:translate-y-1"
          >
            <div className="h-10 flex flex-1 items-center justify-between flex-row border-b border-gray-300 mr-5 ml-5 mt-2">
              <div className="flex flex-row">
                <p>
                  Ngày đặt hẹn :{" "}
                  <span className="text-green-400 font-bold">
                    {date} - {time}
                  </span>{" "}
                  <span className="mr-2 ml-2">|</span>
                </p>
                <p className="text-orange-400 font-semibold">Sắp diễn ra</p>
              </div>
              <button
                className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-semibold text-blue-500 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => onViewDetails(appointment.serviceId)}
              >
                Xem chi tiết
              </button>
            </div>

            <div className="flex m-5">
              <img
                src={appointment.thumbnail}
                alt={appointment.serviceName}
                className="w-[120px] h-[120px] rounded-[10px] object-cover"
              />
              <div className="pl-4 flex-1">
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  {appointment.serviceName}
                </h3>

                {/* Hiển thị ngày giờ từ reservedDate */}
                <p className="flex items-center py-1 text-base text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  2 Giờ
                </p>

                {/* Hiển thị chuyên viên chăm sóc da */}
                <p className="flex items-center py-1 text-base text-gray-600">
                  <CircleUser className="w-4 h-4 mr-1" />
                  {appointment.skinTherapistName}
                </p>

                {/* Mô tả */}
                <p className="flex items-center py-1 text-base text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {appointment.description || ""}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

