import useCreateTicket from "@/hooks/useTicket";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TicketCard } from "../Organisms/TicketCard";



const MyTickets: React.FC = () => {
  // const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<"Paid" | "CheckedIn" | "Canceled">("Paid");

  const { getTicketByStatus, tickets, error1, loading } = useCreateTicket();
  useEffect(() => {
    getTicketByStatus(activeFilter);
  }, [activeFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-green-600 text-xl font-medium">
          Đang tải danh sách vé...
        </span>
      </div>
    );
  }
  console.log(tickets);
  console.log(tickets)
  
  return (
    // <div className="min-h-screen bg-green-50 py-10">
    //   <header className="mb-10 text-center">
    //     <h1 className="text-4xl font-bold text-green-800">
    //       Danh Sách Vé Đã Mua
    //     </h1>
    //   </header>
    //   <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 gap-6">
    //     {tickets.length === 0 ? (
    //       <p className="text-center text-green-700 text-lg">
    //         Bạn chưa mua vé nào.
    //       </p>
    //     ) : (
    //       tickets.map((ticket) => {
    //         const { label, color } = getStatusLabel(ticket.status);
    //         return (
    //           <div
    //             key={ticket.ticket_id}
    //             className="ticket-card flex items-center bg-white p-4 shadow-md rounded-lg border border-green-300 transition transform hover:scale-105"
    //           >
    //             {ticket.qr_code && (
    //               <div className="mr-4">
    //                 <img
    //                   src={ticket.qr_code}
    //                   alt="QR Code"
    //                   className="w-24 h-24 object-cover rounded-md border border-green-200"
    //                 />
    //               </div>
    //             )}

    //             <div className="flex-1">
    //               <h2 className="text-2xl font-semibold text-green-700">
    //                 {ticket.event_name}
    //               </h2>
    //               <p className="mt-1 text-gray-600">{ticket.total_amount}</p>
    //               <div className="mt-2 space-y-1">
    //                 <div className="flex items-center">
    //                   <span className="font-medium text-green-600 mr-2">
    //                     Ngày: 
    //                   </span>
    //                   <span className="text-gray-700">{ticket.purchase_date}</span>
    //                 </div>
    //                 <div className="flex items-center">
    //                   <span className="font-medium text-green-600 mr-2">
    //                     Giờ:
    //                   </span>
    //                   <span className="text-gray-700">{ticket.time}</span>
    //                 </div>
    //                 {/* <div className="flex items-center">
    //                   <span className="font-medium text-green-600 mr-2">
    //                     Địa điểm:
    //                   </span>
    //                   <span className="text-gray-700">{ticket.location}</span>
    //                 </div> */}
    //                 <div className="flex items-center">
    //                   <span className="font-medium text-green-600 mr-2">
    //                     Mã vé:
    //                   </span>
    //                   <span className="text-green-800 font-bold">
    //                     {ticket.otp_code}
    //                   </span>
    //                 </div>
    //                 <div className="flex items-center">
    //                   <span className="font-medium text-green-600 mr-2">
    //                     Trạng thái:
    //                   </span>
    //                   <span
    //                     className={`px-3 py-1 text-sm font-bold text-white rounded-lg ${color}`}
    //                   >
    //                     {label}
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* <button className="ml-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600"
    //              onClick={() => navigate(`/ticket-detail/${ticket.ticket_id}`)}
    //             >
    //               Chi tiết
    //             </button> */}
    //           </div>
    //         );
    //       })
    //     )}
    //   </div>
    // </div>
    <div className="max-w-screen-lg mx-auto p-5">
    <h1 className="text-xl font-semibold mb-5">Vé của tôi</h1>
    {/* Tabs với icon và badges */}
    <div className="flex space-x-4 border-b border-gray-200">
      {/* Tab: not_started */}
      <button
        onClick={() => setActiveFilter("Paid")}
        className={`relative px-4 py-2 text-sm font-medium flex items-center 
          ${
            activeFilter === "Paid"
              ? "text-emerald-700 border-b-4 border-emerald-700"
              : "text-gray-500"
          }
        `}
      >
        <ClockIcon className="w-4 h-4 mr-1" />
        <span>Sắp diễn ra</span>
        {/* <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {bookingNotStarted}
        </span> */}
      </button>

      {/* Tab: completed */}
      <button
        onClick={() => setActiveFilter("CheckedIn")}
        className={`relative px-4 py-2 text-sm font-medium flex items-center 
          ${
            activeFilter === "CheckedIn"
              ? "text-emerald-700 border-b-2 border-emerald-700"
              : "text-gray-500"
          }
        `}
      >
        <CheckCircleIcon className="w-4 h-4 mr-1" />
        <span>Đã hoàn thành</span>
        {/* <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {bookingCompleted}
        </span> */}
      </button>

      {/* Tab: canceled */}
      <button
        onClick={() => setActiveFilter("Canceled")}
        className={`relative px-4 py-2 text-sm font-medium flex items-center 
          ${
            activeFilter === "Canceled"
              ? "text-emerald-700 border-b-2 border-emerald-700"
              : "text-gray-500"
          }
        `}
      >
        <XCircleIcon className="w-4 h-4 mr-1" />
        <span>Đã hủy</span>
        {/* <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {bookingCanceled}
        </span> */}
      </button>
    </div>

    {/* Danh sách lịch hẹn */}
    <div className="mt-6">
      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : error1 ? (
        <div className="text-center text-red-500 mt-10">{error1}</div>
      ) : tickets.length > 0 ? (
        <TicketCard Tickets={tickets}/>
      ) : (
        <div className="text-center text-gray-500 mt-10">Danh sách trống</div>
      )}
    </div>
  </div>
  );
};

export default MyTickets;
