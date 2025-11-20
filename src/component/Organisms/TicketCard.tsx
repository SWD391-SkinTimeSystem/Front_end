// src/components/ui/BookingList.tsx
import React from "react";
import { CircleUser, MapPin } from "lucide-react";
import { formatDateAndTime, getStatusLabel } from "../../lib/utils";
import { TicketHistory } from "@/types/ticket";



interface TicketListProps {
  Tickets: TicketHistory[];
//   onViewDetails: (id: string) => void;
}



export const TicketCard: React.FC<TicketListProps> = ({
     Tickets,
//   onViewDetails,
}) => {
  console.log ("vao trang booking list nè");

  return (
    <div className="space-y-5">
      {Tickets.map((ticket) => {
     //    const time = formatDate(ticket.purchase_date);
        return (
          <div
            key={ticket.ticket_id}
            className="bg-gray-100 rounded-[30px] shadow-md overflow-hidden transition-transform transform hover:translate-y-1"
          >
            <div className="h-10 flex items-center justify-between flex-row border-b border-gray-300 mr-5 ml-5 mt-2">
              <div className="flex flex-row">
                <p>
                  Ngày hẹn:{" "}
                  <span className="text-green-400 font-bold">{formatDateAndTime(ticket.purchase_date)}</span> <span className="text-green-400 font-bold">
                    {/* {time} */}

                  </span>
                  <span className="mr-2 ml-2">|</span>
                </p>
                <p className="text-orange-400 font-semibold">
                  {getStatusLabel(ticket.status)}
                </p>
              </div>
              {/* <button
                className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center font-sans text-xs font-semibold text-blue-500 transition-all"
                onClick={() => onViewDetails(booking.id)}
              >
                Xem chi tiết
              </button> */}
            </div>

            <div className="flex m-5">
              <img
                src="https://static.hotdeal.vn/images/1722/1722076/60x60/369518-skin-spa-dac-tri-mun-mo-tham-nam-phuc-hoi-da-mien-tip.jpg"
               //  alt={booking.serviceName}
                className="w-[120px] h-[120px] rounded-[10px] object-cover"
              />
              <div className="pl-4 flex-1">
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  {ticket.event_name}
                </h3>
                <p className="flex items-center py-1 text-base text-gray-600">
                  {/* <CircleUser className="w-4 h-4 mr-1" /> */} Số lượng : 
                  {ticket.total_amount}
                </p>
                <p className="flex items-center py-1 text-base text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  Hasaki, Lê Văn Việt, Thành Phố Thủ Đức
                </p>
                {/* <strong>Dịch vụ có lộ trình không: </strong> */}
                <span className="text-mg font-bold text-emerald-700">
                  {ticket.otp_code}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
