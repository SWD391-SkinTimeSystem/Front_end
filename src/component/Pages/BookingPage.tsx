// src/screens/BookingPage.tsx
import React, { useEffect, useState } from "react";
import { BookingList } from "../../components/ui/bookinglist";
import { ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/hooks/useCusBooking";
import useBookingStore from "@/store/store";

const BookingPage: React.FC = () => {
  // Chọn trạng thái hiển thị theo tab
  const [activeFilter, setActiveFilter] = useState<"NotStarted" | "Completed" | "Canceled">("NotStarted");
  const navigate = useNavigate();

  const { bookings, loading, error } = useBooking(activeFilter);
  const { setBookings, bookingCompleted, bookingNotStarted, bookingCanceled } = useBookingStore();

  console.log("Bookings:", bookings);
  const counts = {
    not_started: activeFilter === "NotStarted" ? bookings.length : 0,
    completed: activeFilter === "Completed" ? bookings.length : 0,
    canceled: activeFilter === "Canceled" ? bookings.length : 0,
  };
  useEffect(() => {
    setBookings(bookings, activeFilter);
  }, [bookings, activeFilter, setBookings]);

  const handleViewDetails = (id: string) => {
    console.log(`Xem chi tiết lịch hẹn với id: ${id}`);
    navigate(`/account/appointment-detail/${id}`);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-5">
      <h1 className="text-xl font-semibold mb-5">Booking của tôi</h1>
      {/* Tabs với icon và badges */}
      <div className="flex space-x-4 border-b border-gray-200">
        {/* Tab: not_started */}
        <button
          onClick={() => setActiveFilter("NotStarted")}
          className={`relative px-4 py-2 text-sm font-medium flex items-center 
            ${
              activeFilter === "NotStarted"
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
          onClick={() => setActiveFilter("Completed")}
          className={`relative px-4 py-2 text-sm font-medium flex items-center 
            ${
              activeFilter === "Completed"
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
        ) : error ? (
          <div className="text-center text-red-500 mt-10">{error}</div>
        ) : bookings.length > 0 ? (
          <BookingList bookings={bookings} onViewDetails={handleViewDetails} />
        ) : (
          <div className="text-center text-gray-500 mt-10">Danh sách trống</div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
