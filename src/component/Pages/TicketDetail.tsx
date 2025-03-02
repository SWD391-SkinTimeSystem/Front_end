import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Ticket, CircleDot, Download, HelpCircle, XCircle } from "lucide-react";

type TicketStatus = "paid" | "checked-in" | "no-refund" | "refunded" | "canceled" | "used" | "expired";

interface TicketData {
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

const TicketDetail: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
//kkklkkkl
  useEffect(() => {
    fetch("/ticket.json")
      .then((res) => res.json())
      .then((data: TicketData[]) => {
        const ticket = data.find((t) => t.id === ticketId);
        setTicketData(ticket || null);
      })
      .catch((err) => console.error("Error fetching ticket data:", err));
  }, [ticketId]);

  if (!ticketData) {
    return <div className="p-5 text-center text-gray-500">Đang tải dữ liệu...</div>;
  }

  const { label, color } = getStatusLabel(ticketData.status);

  const handleCancelTicket = () => {
    alert("Bạn có chắc chắn muốn hủy vé?");
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-xl rounded-lg">
        {/* Tiêu đề căn giữa */}
        <h1 className="text-center text-3xl font-bold text-green-800">{ticketData.eventTitle}</h1>

        {/* Chia thành 2 cột */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mô tả bên trái */}
          <div>
            <p className="text-gray-600">{ticketData.eventDescription}</p>
          </div>

          {/* QR Code bên phải */}
          <div className="flex justify-center">
            {ticketData.qrCodeUrl && (
              <motion.img
                src={ticketData.qrCodeUrl}
                alt="QR Code"
                className="w-56 h-56 border border-gray-300 rounded-lg shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-inner">
          <p className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-gray-700" />
            <strong>Ngày:</strong> {ticketData.date}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-700" />
            <strong>Giờ:</strong> {ticketData.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-700" />
            <strong>Địa điểm:</strong> {ticketData.location}
          </p>
          <p className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-gray-700" />
            <strong>Mã vé:</strong> {ticketData.ticketNumber}
          </p>
          <p className="flex items-center gap-2">
            <CircleDot className="w-5 h-5 text-gray-700" />
            <strong>Trạng thái:</strong>
            <span className={`px-3 py-1 ml-2 rounded-lg text-white ${color}`}>
              {label}
            </span>
          </p>
        </div>

        {/* Hành động */}
        <div className="mt-6 flex justify-between">
          <Button className="flex items-center gap-2 bg-green-600 text-white">
            <Download className="w-5 h-5" />
            Tải vé
          </Button>
          <Button variant="secondary" className="flex items-center gap-2 text-gray-700">
            <HelpCircle className="w-5 h-5" />
            Liên hệ hỗ trợ
          </Button>
        </div>

        {/* Nút hủy vé - Chỉ hiển thị nếu trạng thái là "paid" */}
        {ticketData.status === "paid" && (
          <div className="mt-4">
            <Button
              onClick={handleCancelTicket}
              className="w-full flex items-center gap-2 bg-red-500 text-white"
            >
              <XCircle className="w-5 h-5" />
              Hủy vé
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetail;
