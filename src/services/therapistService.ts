import axiosInstance from "@/lib/axiosInstance";
import { TherapistAvailabilityResponse } from "@/types/schedule";

const API_URL = "/therapist";

export const therapistService = {
     getListTherapists: async () => {
          const response = await axiosInstance.get(`${API_URL}`);
          if (response.data.success) {
               return response.data.data;
          } else {
               throw new Error(response.data.message);
          }
     },
     getTherapist: async (id: string) => {
          const response = await axiosInstance.get(`${API_URL}/${id}`);
          return response.data;
     },
     getTherapistAvailability: async (therapistId: string): Promise<any> => {
          try {
               const response = await axiosInstance.get<TherapistAvailabilityResponse>(`/schedule/therapist/${therapistId}/availability`);
               console.log(response);
               return response.data.data;
          } catch (error) {
               console.error("Error fetching therapist availability:", error);
               throw error;
          }
     },

     getSkinTherapistByDateTime : async (date: string, time: string, duration: number) => {
          const response = await axiosInstance.get(`${API_URL}/available`, {
              params: { date, time, duration }
          });
          return response.data;
      }
      
}