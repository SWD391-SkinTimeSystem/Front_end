import React, { useEffect, useState } from "react";
import { AppointmentList, AppointmentItem } from "../../components/ui/appointmentlist";
import { ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import api from "../../api"; 

const AppointmentPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"not_started" | "finished" | "canceled">("not_started");
  // const [appointments, setAppointments] = useState([]);

  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);

  const navigate = useNavigate(); 

  // useEffect(() => {
  //   fetch("/appointments.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAppointments(data.appointments);
  //     })
  //     .catch((error) => console.error("Error fetching appointments:", error));
  // }, []);



  const getAppointmentByCustomerId = async () => {
    try {
      const customerId = "12345"; 
      const response = await api.get<{ appointments: AppointmentItem[] }>(
        `/bookings?customerId=${customerId}`
      );
            // const response = { data: { appointments: [] } };
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách lịch hẹng:", error);
    
    }
  };
  

  useEffect(() => {
    getAppointmentByCustomerId();
  }, []);

  // Tính số lượng cho mỗi trạng thái (để hiển thị badge)
  const counts = {
    not_started: appointments.filter((a) => a.status as "not_started" === "not_started").length,
    finished: appointments.filter((a) => a.status as "finished" === "finished").length,
    canceled: appointments.filter((a) => a.status as "canceled" === "canceled").length,
  };
  type AppointmentStatus = "not_started" | "finished" | "canceled";

  // Lọc danh sách theo activeFilter
  const filteredAppointments = appointments.filter(
    (appointment) => (appointment.status as AppointmentStatus) === activeFilter
  );
  

  const handleViewDetails = (serviceId: number) => {
    console.log(`Xem chi tiết lịch hẹn với serviceId: ${serviceId}`);
    navigate(`/account/appointment-detail/${serviceId}`);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-5">
      <h1 className="text-xl font-semibold mb-5">Booking của tôi</h1>
      {/* Tabs với icon và badges */}
      <div className="flex space-x-4 border-b border-gray-200">
        {/* Tab: not_started */}
        <button
          onClick={() => setActiveFilter("not_started")}
          className={`relative px-4 py-2 text-sm font-medium flex items-center 
            ${
              activeFilter === "not_started"
                ? "text-emerald-700 border-b-4 border-emerald-700"
                : "text-gray-500"
            }
          `}
        >
          <ClockIcon className="w-4 h-4 mr-1" />
          <span>Sắp diễn ra</span>
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {counts.not_started}
          </span>
        </button>

        {/* Tab: finished */}
        <button
          onClick={() => setActiveFilter("finished")}
          className={`relative px-4 py-2 text-sm font-medium flex items-center 
            ${
              activeFilter === "finished"
                ? "text-emerald-700 border-b-2 border-emerald-700"
                : "text-gray-500"
            }
          `}
        >
          <CheckCircleIcon className="w-4 h-4 mr-1" />
          <span>Đã hoàn thành</span>
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {counts.finished}
          </span>
        </button>

        {/* Tab: canceled */}
        <button
          onClick={() => setActiveFilter("canceled")}
          className={`relative px-4 py-2 text-sm font-medium flex items-center 
            ${
              activeFilter === "canceled"
                ? "text-emerald-700 border-b-2 border-emerald-700"
                : "text-gray-500"
            }
          `}
        >
          <XCircleIcon className="w-4 h-4 mr-1" />
          <span>Đã hủy</span>
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {counts.canceled}
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
          <div className="text-center text-gray-500 mt-10">Danh sách trống</div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
