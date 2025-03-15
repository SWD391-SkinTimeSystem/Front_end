import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronDown } from "lucide-react";
import { BookingDetail } from "@/types/booking";
import { bookingService } from "@/services/bookingCusService";
import { formatDateTime, getStatusLabel } from "@/lib/utils";
import FeedbackModal from "../Molecules/Feedback";


const BookingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [bookingDetail, setBookingDetail] = useState<BookingDetail | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  console.log(bookingDetail)
  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        const data = await bookingService.getBookingDetail(id!);
        setBookingDetail(data);
      } catch (err) {
        console.error("Error fetching booking detail:", err);
      }
    };
    fetchBookingDetail();
  }, [id]);
  console.log(bookingDetail);
  if (!bookingDetail) {
    return (
      <div className="p-5 text-center text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  }
  return (
    <div className="w-full p-6 bg-white">
      <h2 className="font-semibold pl-4 border-l-4 border-emerald-700 text-xl mb-5">
        Chi tiết lịch hẹn
      </h2>
      <div className="p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row mb-4">
          <img
            src={bookingDetail.thumbnail || "https://via.placeholder.com/150"}
            alt={bookingDetail.serviceName}
            className="w-40 h-40 object-cover rounded-lg shadow-md mr-4"
          />
          <div className="flex-1">
            <p className="text-xl font-semibold">
              {bookingDetail.serviceName}
            </p>
            <p>
              <strong>Chuyên viên:</strong> {bookingDetail.therapistName}
            </p>
            <p>
              <strong>Trạng thái:</strong> {getStatusLabel(bookingDetail.status)}
            </p>
            <p>
              <strong>Mã checkin:</strong> {bookingDetail.checkInCode}
            </p>
            <p className="mt-2 text-gray-600">
              {bookingDetail.description}
            </p>
          </div>
        </div>

        <p>
          <strong>Ngày giờ thực hiện:</strong>{" "}
          {formatDateTime(bookingDetail.details[0]?.reservedDate)} -{" "}
          {/* {formatDateTime(
            bookingDetail.details[bookingDetail.details.length - 1]?.startEnd
          )} */}
          {bookingDetail.details[0]?.startTime}
        </p>
        {bookingDetail.status === "NotStarted" && (
            <div className="grid place-items-end mt-4">
              <Button variant="secondary" className="text-emerald-700">
                Hủy lịch
              </Button>
            </div>
          )}
          {bookingDetail.status === "Completed" && (
            <div className="grid place-items-end mt-4">
             {/* <Button
                className="bg-emerald-700 text-white"
                onClick={() =>
                  navigate(`/account/feedback/${bookingDetail.id}`)
                }
              >
                Feedback: Đánh giá chung & chi tiết dịch vụ
              </Button> */}
              <FeedbackModal BookingId={bookingDetail.id} TherapistName={bookingDetail.therapistName}/>
            </div>
          )}
        <div className="mt-4 border-t pt-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <strong>Chi tiết hành trình</strong>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="relative pl-8 border-l-2 border-dotted border-emerald-500">
              {bookingDetail.details.map((step, index) => (
                <div key={index} className="mb-6 relative">
                  <div className="absolute -left-4 top-1 bg-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md">
                    <CheckCircle size={16} />
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <p className="font-semibold text-lg">
                      {step.serviceDetailsName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Ngày hẹn: {formatDateTime(step.reservedDate)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Thời gian: {step.startTime} -{" "}
                      {step.startEnd}
                    </p>
                    <Button className="mt-2 bg-emerald-700 text-white">
                      Đổi lịch
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
