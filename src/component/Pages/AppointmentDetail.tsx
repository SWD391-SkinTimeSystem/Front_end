import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AppointmentItem } from "../../components/ui/appointmentlist";
import { Button } from "@/components/ui/button"

function formatDateTime(isoString: string) {
  const dateObj = new Date(isoString);
  return dateObj.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const AppointmentDetailPage: React.FC = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<AppointmentItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/appointments.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.appointments.find(
          (item: AppointmentItem) => item.serviceId === Number(id)
        );
        setAppointment(found || null);
      })
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!appointment) {
    return <div className="p-5 text-center text-gray-500">Đang tải dữ liệu...</div>;
  }

  const remainingPayment =
    appointment.totalPayment - appointment.deposit - appointment.voucherDiscount;

  return (
    <div className="w-full p-6 bg-white">
      <h2 className="font-semibold pl-4 border-l-4 border-emerald-700 text-xl mb-5">
        Chi tiết lịch hẹn
      </h2>  <div className="p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row mb-4">
          <img
            src={appointment.thumbnail || "https://via.placeholder.com/150"}
            alt={appointment.serviceName}
            className="w-40 h-40 object-cover rounded-lg shadow-md mr-4"
          />
          <div className="flex-1">
            <p className="text-xl font-semibold">{appointment.serviceName}</p>
            <p><strong>Chuyên viên:</strong> {appointment.skinTherapistName}</p>
            <p><strong>Trạng thái:</strong> {appointment.status}</p>
            <p><strong>Mã checkin:</strong> {appointment.checkinCode}</p>
            <p className="mt-2 text-gray-600">{appointment.description}</p>
          </div>
        </div>

        <p><strong>Ngày giờ thực hiện:</strong> {formatDateTime(appointment.startTime)} - {formatDateTime(appointment.endTime)}</p>
        <p><strong>Số lượng dịch vụ:</strong> {appointment.quantity}</p>
        <p><strong>Tiền mỗi dịch vụ:</strong> {appointment.pricePerService.toLocaleString("vi-VN")} đ</p>

        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <strong>Còn cần thanh toán:</strong>
            <span className="text-lg font-bold text-emerald-700">
              {remainingPayment.toLocaleString("vi-VN")} đ
            </span>
          </div>
          {/* <div className="flex mr-auto gap-2">
            <button className="bg-black text-white px-4 py-2 rounded-lg">Hủy lịch hẹn</button>
            <button className="bg-black text-white px-4 py-2 rounded-lg">Đổi lịch</button>
          </div> */}
          <div className="grid place-items-end mt-3">
            <div className="flex gap-5">
              <Button  variant="secondary" className="text-emerald-700">
                Hủy lịch hẹn
              </Button>
              <Button className="bg-emerald-700">
                Đổi lịch
              </Button>
            </div>
          </div>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-4 bg-gray-100 rounded-lg shadow-inner">
              <p className="flex justify-between">
                <span>Tổng tiền:</span>
                <span>{appointment.totalPayment.toLocaleString("vi-VN")} đ</span>
              </p>
              <p className="flex justify-between">
                <span>Voucher giảm:</span>
                <span>-{appointment.voucherDiscount.toLocaleString("vi-VN")} đ</span>
              </p>
              <p className="flex justify-between">
                <span>Đã cọc:</span>
                <span>-{appointment.deposit.toLocaleString("vi-VN")} đ</span>
              </p>
              <p className="flex justify-between text-emerald-700 font-bold border-t pt-2 mt-2">
                <span>Cần thanh toán:</span>
                <span>{remainingPayment.toLocaleString("vi-VN")} đ</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>

  );
};

export default AppointmentDetailPage;
