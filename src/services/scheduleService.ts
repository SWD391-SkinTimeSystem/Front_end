import axiosInstance from "@/lib/axiosInstance";
import { Availability } from "@/types/schedule";

const API_URL = "/schedule";

export const scheduleService = {
     getAvailabilityByDate: async (date: string): Promise<Availability[]> => {
         try {
             const response = await axiosInstance.get<Availability[]>(`${API_URL}/availability`, {
                 params: { date } // Thêm date vào query string
             });
             return response.data;
         } catch (error) {
             console.error("Error fetching therapist availability:", error);
             throw error;
         }
     }
 };
 