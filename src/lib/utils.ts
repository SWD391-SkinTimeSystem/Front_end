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