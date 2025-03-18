
import { BookingDetail } from '../../../types/booking';

// Dữ liệu mẫu cho một dịch vụ không có lộ trình, trạng thái chưa bắt đầu
export const singleServiceBooking: BookingDetail = {
  id: "BK-20250316-001",
  checkInCode: "CK98765",
  therapistName: "Nguyễn Thanh Hương",
  thumbnail: "https://placehold.co/600x400/e2f6e9/34a853?text=Facial+Treatment",
  serviceName: "Chăm sóc da mặt chuyên sâu",
  status: "Not_started",
  totalStep: 1,
  description: "Liệu trình chăm sóc da mặt chuyên sâu giúp làm sạch và dưỡng ẩm cho da, áp dụng công nghệ mới nhất.",
  details: [
    {
      serviceDetailsName: "Chăm sóc da mặt chuyên sâu",
      startTime: "20:35",
      startEnd: "22:00",
      status: "Not_started",
      reservedDate: new Date("2025-03-18")
    }
  ]
};

// Dữ liệu mẫu cho một lộ trình điều trị (nhiều bước)
export const treatmentPlanBooking: BookingDetail = {
  id: "BK-20250316-002",
  checkInCode: "CK12345",
  therapistName: "Trần Minh Đức",
  thumbnail: "https://placehold.co/600x400/e2f6e9/34a853?text=Acne+Treatment",
  serviceName: "Lộ trình điều trị mụn chuyên sâu",
  status: "Not_started",
  totalStep: 5,
  description: "Lộ trình điều trị mụn chuyên sâu kết hợp nhiều phương pháp để làm sạch da, giảm viêm và ngăn ngừa mụn tái phát.",
  details: [
    {
      serviceDetailsName: "Bước 1: Tư vấn và phân tích da",
      startTime: "09:00",
      startEnd: "10:00",
      status: "Not_started",
      reservedDate: new Date("2025-02-15")
    },
    {
      serviceDetailsName: "Bước 2: Điều trị và làm sạch sâu",
      startTime: "09:30",
      startEnd: "11:00",
      status: "Not_started",
      reservedDate: new Date("2025-03-01")
    },
    {
      serviceDetailsName: "Bước 3: Điều trị chuyên sâu với sản phẩm đặc trị",
      startTime: "10:00",
      startEnd: "11:30",
      status: "Not_started",
      reservedDate: new Date("2025-03-15")
    },
    {
      serviceDetailsName: "Bước 4: Phục hồi và tái tạo da",
      startTime: "14:00",
      startEnd: "15:30",
      status: "Not_started",
      reservedDate: new Date("2025-03-29")
    },
    {
      serviceDetailsName: "Bước 5: Kiểm tra kết quả và tư vấn duy trì",
      startTime: "16:00",
      startEnd: "17:00",
      status: "Not_started",
      reservedDate: new Date("2025-04-12")
    }
  ]
};

// Dữ liệu mẫu cho một dịch vụ đã hoàn thành
export const completedBooking: BookingDetail = {
  id: "BK-20250316-003",
  checkInCode: "CK45678",
  therapistName: "Lê Thị Mai Anh",
  thumbnail: "https://placehold.co/600x400/e2f6e9/34a853?text=Hair+Removal",
  serviceName: "Triệt lông vĩnh viễn công nghệ Laser",
  status: "Not_started",
  totalStep: 1,
  description: "Dịch vụ triệt lông vĩnh viễn bằng công nghệ Laser tiên tiến, an toàn và hiệu quả.",
  details: [
    {
      serviceDetailsName: "Triệt lông vĩnh viễn vùng nách",
      startTime: "13:00",
      startEnd: "14:00",
      status: "Completed",
      reservedDate: new Date("2025-03-10")
    },
    {
      serviceDetailsName: "Triệt lông vĩnh viễn vùng nách",
      startTime: "13:00",
      startEnd: "14:00",
      status: "Not_started",
      reservedDate: new Date("2025-03-10")
    }
  ]
};

// Dữ liệu mẫu cho một lộ trình đã bị hủy
export const cancelledBooking: BookingDetail = {
  id: "BK-20250316-004",
  checkInCode: "CK56789",
  therapistName: "Phạm Văn Hải",
  thumbnail: "https://placehold.co/600x400/e2f6e9/34a853?text=Skin+Whitening",
  serviceName: "Lộ trình trẻ hóa và làm trắng da",
  status: "Cancelled",
  totalStep: 3,
  description: "Khách hàng đã hủy do lịch trình cá nhân thay đổi. Đã hoàn lại 70% phí theo chính sách.",
  details: [
    {
      serviceDetailsName: "Bước 1: Tẩy tế bào chết và làm sạch chuyên sâu",
      startTime: "11:00",
      startEnd: "12:30",
      status: "Cancelled",
      reservedDate: new Date("2025-03-05")
    },
    {
      serviceDetailsName: "Bước 2: Đắp mặt nạ đặc trị và massage",
      startTime: "11:00",
      startEnd: "12:30",
      status: "Cancelled",
      reservedDate: new Date("2025-03-19")
    },
    {
      serviceDetailsName: "Bước 3: Trẻ hóa da bằng công nghệ Thermage",
      startTime: "11:00",
      startEnd: "13:00",
      status: "Cancelled",
      reservedDate: new Date("2025-04-02")
    }
  ]
};

// Tập hợp tất cả các booking mẫu
export const mockBookings: Record<string, BookingDetail> = {
  "single": singleServiceBooking,
  "treatment": treatmentPlanBooking,
  "completed": completedBooking,
  "cancelled": cancelledBooking,
};

export const getMockBooking = (id: string): Promise<BookingDetail> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === "single") resolve(singleServiceBooking);
      else if (id === "treatment") resolve(treatmentPlanBooking);
      else if (id === "completed") resolve(completedBooking);
      else if (id === "cancelled") resolve(cancelledBooking);
      else reject(new Error("Booking not found"));
    }, 500); // Giả lập độ trễ mạng
  });
};
