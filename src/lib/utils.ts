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
