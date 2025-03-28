// Định nghĩa kiểu dữ liệu cho từng khung giờ của therapist
export type TimeSlot = {
     [key: string]: boolean; // Mỗi key là một khung giờ (ví dụ: "09:00:00"), value là true/false
   };
   
   // Định nghĩa kiểu dữ liệu cho lịch trình của therapist
   export type Availability = {
     [date: string]: TimeSlot; // Mỗi key là một ngày (ví dụ: "2025-03-04"), value là danh sách khung giờ
   };
   
   // Định nghĩa kiểu dữ liệu cho phản hồi từ API
   export type TherapistAvailabilityResponse = {
       therapist_id: string;
       availability: Availability;
   };
   
   export type rescheduleData ={
    idSchedule: string,
    date: string,
    timeStart: string
  }


  export type TherapistSchedule = {
    id: string;
    expected_date: string; // YYYY-MM-DD format
    expected_start_time: string; // HH:mm:ss format
    expected_end_time: string; // HH:mm:ss format
    status: string;
    status_id: number;
    service_id: string;
    step_id: string;
    step_name: string;
    step_order: number;
  };