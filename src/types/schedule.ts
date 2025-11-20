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
   