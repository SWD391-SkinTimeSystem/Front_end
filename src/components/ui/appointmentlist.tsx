import React from "react";

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
            key={appointment.serviceId}
            className="flex bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:translate-y-1"
          >
            <img
              src={appointment.thumbnail}
              alt={appointment.serviceName}
              className="w-40 h-40 object-cover"
            />
            <div className="p-4 flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {appointment.serviceName}
              </h3>

              {/* Hiển thị ngày giờ từ reservedDate */}
              <p className="text-sm text-gray-500">
                {date} - {time}
              </p>

              {/* Hiển thị chuyên viên chăm sóc da (skinTherapistName) */}
              <p className="text-gray-600 mt-1">
                {appointment.skinTherapistName}
              </p>

              {/* Mô tả */}
              <p className="text-gray-700 mt-2 line-clamp-3">
                {appointment.description || ""}
              </p>

              <button
                className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => onViewDetails(appointment.serviceId)}
              >
                Xem chi tiết
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
