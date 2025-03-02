import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type TicketStatus = "paid" | "checked-in" | "no-refund" | "refunded" | "canceled" | "used" | "expired";


interface Ticket {
  id: string;
  eventTitle: string;
  eventDescription: string;
  date: string;
  time: string;
  location: string;
  ticketNumber: string;
  status: TicketStatus;
  qrCodeUrl?: string;
}
//kkkkkkkk
const getStatusLabel = (status: TicketStatus) => {
  switch (status) {
    case "paid":
      return { label: "Đã thanh toán", color: "bg-blue-500" };
    case "checked-in":
      return { label: "Đã check-in", color: "bg-green-500" };
    case "no-refund":
      return { label: "Không hoàn tiền", color: "bg-yellow-500" };
    case "refunded":
      return { label: "Đã hoàn tiền", color: "bg-purple-500" };
    case "canceled":
      return { label: "Đã hủy", color: "bg-red-500" };
    case "used":
      return { label: "Đã sử dụng", color: "bg-gray-500" };
    case "expired":
      return { label: "Hết hạn", color: "bg-orange-500" };
    default:
      return { label: "Không xác định", color: "bg-gray-300" };
  }
};

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/ticket.json");
        const data = await res.json();
        
        setTimeout(() => {
          setTickets(data);
          setIsLoading(false);
        }, 800);
        
      } catch (error) {
        console.error("Lỗi khi tải vé:", error);
      }
    };
  
    fetchTickets();
  }, []);
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-green-600 text-xl font-medium">
          Đang tải danh sách vé...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-green-800">
          Danh Sách Vé Đã Mua
        </h1>
      </header>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 gap-6">
        {tickets.length === 0 ? (
          <p className="text-center text-green-700 text-lg">
            Bạn chưa mua vé nào.
          </p>
        ) : (
          tickets.map((ticket) => {
            const { label, color } = getStatusLabel(ticket.status);
            return (
              <div
                key={ticket.id}
                className="ticket-card flex items-center bg-white p-4 shadow-md rounded-lg border border-green-300 transition transform hover:scale-105"
              >
                {ticket.qrCodeUrl && (
                  <div className="mr-4">
                    <img
                      src={ticket.qrCodeUrl}
                      alt="QR Code"
                      className="w-24 h-24 object-cover rounded-md border border-green-200"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-green-700">
                    {ticket.eventTitle}
                  </h2>
                  <p className="mt-1 text-gray-600">{ticket.eventDescription}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center">
                      <span className="font-medium text-green-600 mr-2">
                        Ngày:
                      </span>
                      <span className="text-gray-700">{ticket.date}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-green-600 mr-2">
                        Giờ:
                      </span>
                      <span className="text-gray-700">{ticket.time}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-green-600 mr-2">
                        Địa điểm:
                      </span>
                      <span className="text-gray-700">{ticket.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-green-600 mr-2">
                        Mã vé:
                      </span>
                      <span className="text-green-800 font-bold">
                        {ticket.ticketNumber}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-green-600 mr-2">
                        Trạng thái:
                      </span>
                      <span
                        className={`px-3 py-1 text-sm font-bold text-white rounded-lg ${color}`}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="ml-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600"
                 onClick={() => navigate(`/ticket-detail/${ticket.id}`)}
                >
                  Chi tiết
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyTickets;
