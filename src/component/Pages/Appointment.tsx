import React, { useEffect, useState } from "react";
import { AppointmentList, AppointmentItem } from "../../components/ui/appointmentlist";
import { ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


const AppointmentPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"upcoming" | "completed" | "cancel">("upcoming");
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("/appointments.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data.appointments);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  // Tính số lượng cho mỗi trạng thái (hiển thị badge)
  const counts = {
    upcoming: appointments.filter((a) => a.status === "upcoming").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancel: appointments.filter((a) => a.status === "cancel").length,
  };

  // Lọc theo activeFilter
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeFilter
  );

  const handleViewDetails = (serviceId: number) => {
    console.log(`Xem chi tiết lịch hẹn với serviceId: ${serviceId}`);
    navigate(`/appointment-detail/${serviceId}`);

  };

  return (
    <div className="max-w-screen-lg mx-auto p-5">
      {/* Tabs với icon và badges */}
      <div className="flex space-x-4 border-b border-gray-200">
        {/* Tab: Upcoming */}
        <button
          onClick={() => setActiveFilter("upcoming")}
          className={`relative px-4 py-2 text-sm font-medium flex items-center 
            ${
              activeFilter === "upcoming"
                ? "text-indigo-600 border-b-2 border-indigo-500"
                : "text-gray-500"
            }
          `}
        >
          {/* Icon */}
          <ClockIcon className="w-4 h-4 mr-1" />
          <span>Sắp diễn ra</span>
          {/* Badge */}
          <span
            className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
          >
            {counts.upcoming}
          </span>
        </button>

        {/* Tab: Completed */}
        <button
          onClick={() => setActiveFilter("completed")}
          className={`relative px-4 py-2 text-sm font-medium flex items-center 
            ${
              activeFilter === "completed"
                ? "text-indigo-600 border-b-2 border-indigo-500"
                : "text-gray-500"
            }
          `}
        >
          {/* Icon */}
          <CheckCircleIcon className="w-4 h-4 mr-1" />
          <span>Đã hoàn thành</span>
          {/* Badge */}
          <span
            className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
          >
            {counts.completed}
          </span>
        </button>

        {/* Tab: Cancel */}
        <button
          onClick={() => setActiveFilter("cancel")}
          className={`relative px-4 py-2 text-sm font-medium flex items-center 
            ${
              activeFilter === "cancel"
                ? "text-indigo-600 border-b-2 border-indigo-500"
                : "text-gray-500"
            }
          `}
        >
          {/* Icon */}
          <XCircleIcon className="w-4 h-4 mr-1" />
          <span>Đã hủy </span>
          {/* Badge */}
          <span
            className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
          >
            {counts.cancel}
          </span>
        </button>
      </div>

      {/* Danh sách lịch hẹn */}
      <div className="mt-6">
        {filteredAppointments.length > 0 ? (
          <AppointmentList
            appointments={filteredAppointments}
            onViewDetails={handleViewDetails}
          />
        ) : (
          <div className="text-center text-gray-500 mt-10">
            Danh sách trống
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
