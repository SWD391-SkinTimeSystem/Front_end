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
     },
     getBooking: async(page: number, pageSize: number) => {
          try {
               const response = await axiosInstance.get(`${API_URL}`,
               {
                    params: {
                         page,
                         pageSize
                    }
               });
               return response.data;
          } catch (error) {
               throw error;
          }
     }
}