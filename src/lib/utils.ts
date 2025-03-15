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