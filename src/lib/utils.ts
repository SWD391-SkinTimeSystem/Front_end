import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
interface FormatTime {
  (seconds: number): string;
}

export const formatTime: FormatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`;
};
export const formatCurrency = (
  amount: number,
  locale: string = "vi-VN",
  currency: string = "VND"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};
// testcommitdane

export const removeSeconds = (time: string): string => {
  return time.slice(0, -3); // Cắt bỏ 3 ký tự cuối ":00"
};
export const formatDate = (date: string) => {
  return date.replace(/-/g, "/");
};

export const formatHour = (time: string) => {
  const [hour, minute, second] = time.split(":");  
  const formattedHour = hour.padStart(2, "0"); // Đảm bảo giờ luôn có 2 chữ số
  return `${formattedHour}:${minute}:00`;
};

export function hoursToMinutes(hours: number): number {
  return hours * 60;
}

export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

export const formatDateAndTime = (isoString: string): string => {
  const date = new Date(isoString);

  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

  return `${formattedDate} vào ${formattedTime} phút`;
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "NotStarted":
    case "paid":
      return "Sắp diễn ra";
    case "Completed":
    case "CheckedIn":
      return "Đã hoàn thành";
    case "Canceled":
    case "Canceled":
      return "Đã hủy";
    default:
      return status; // Trả về chính status nếu không khớp với các case trên
  }
};


export const formatEventDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
};

export const getFormattedDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Thêm 0 nếu <10
  const day = String(today.getDate()).padStart(2, "0"); // Thêm 0 nếu <10
  return `${year}-${month}-${day}`;
};

export const isDateInNext7Days = (date: Date): boolean => {
  const today = new Date(); // Ngày hôm nay
  today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00 để so sánh chính xác

  const next7Days = new Date(today);
  next7Days.setDate(today.getDate() + 7); // Ngày sau 7 ngày

  return date >= today && date <= next7Days;
};

export const isWithin48Hours = (date: Date): boolean => {
  const now = new Date(); // Lấy thời gian hiện tại
  const diffInMs = date.getTime() - now.getTime(); // Chênh lệch thời gian tính bằng milliseconds
  const diffInHours = diffInMs / (1000 * 60 * 60); // Chuyển đổi thành giờ

  return diffInHours <= 48; // Trả về true nếu nhỏ hơn hoặc bằng 48 giờ
};


export const  decodeJWTManual = (token: string) => {
  try {
    const payloadBase64 = token.split(".")[1]; // Lấy phần payload
    const decodedPayload = JSON.parse(atob(payloadBase64)); // Giải mã base64
    return decodedPayload;
  } catch (error) {
    console.error("Lỗi khi decode token:", error);
    return null;
  }
};

// Ví dụ sử dụng


export const switchCaseRole = (accessToken: string): string => {
  const decodedToken = decodeJWTManual(accessToken);
  switch (decodedToken.role.toLowerCase()) {
    case "custommer":
      return "/";
    case "manager":
      return "/manager/";
    case "therapist":
      return "/therapist/";
    case "staff":
      console.log("chuyển hướng sang staff");
      return "/staff/";
    case "admin":
      return "/admin/";
    default:
      return "/";
  }
};


