import axiosInstance from "@/lib/axiosInstance";
import {BookingType} from "@/types/booking";

const API_URL = "/booking";

export const bookingService = {
     createBooking: async (data: BookingType) => {
          try {
               const response = await axiosInstance.post(`${API_URL}`, data);
               return response.data;
          } catch (error) {
               throw error;
          }
     }
}