import { create } from "zustand";

interface BookingStore {
  bookingCompleted: number;
  bookingNotStarted: number;
  bookingCanceled: number;
  setBookings: (bookings: any[], filter: "NotStarted" | "Completed" | "Canceled") => void;
}

const useBookingStore = create<BookingStore>((set) => ({
  bookingCompleted: 0,
  bookingNotStarted: 0,
  bookingCanceled: 0,
  
  setBookings: (bookings, filter) => {
    set(() => ({
      bookingCompleted: filter === "Completed" ? bookings.length : 0,
      bookingNotStarted: filter === "NotStarted" ? bookings.length : 0,
      bookingCanceled: filter === "Canceled" ? bookings.length : 0,
    }));
  },
}));

export default useBookingStore;
