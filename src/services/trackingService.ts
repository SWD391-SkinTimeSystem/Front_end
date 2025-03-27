import axiosInstance from "@/lib/axiosInstance";
import { Check } from "@/types/tracking";
const API_URL = "/tracking";

export const trackingService = {
    checkinTracking: async (scheduleId: string, otpInput: string) => {
        try {
        const response = await axiosInstance.post("/tracking/checkin", { scheduleId, otpInput });
        return response.data;
        } catch (error) {
          console.error("Error checking in:", error);
        }
      },

    checkoutTracking: async (scheduleId: string) => {
        try {
          const response = await axiosInstance.post("/tracking/checkout", {scheduleId});
          return response.data;
        } catch (error) {
          console.error("Error checking out:", error);
        }
      },

      getCheckCheckIn: async (scheduleId: string) => {
        try {
          const response = await axiosInstance.get(`${API_URL}/check/${scheduleId}`);
          const data: Check = response.data.data.data;
          return data.isCheckin;
        } catch (error) {
          console.error("Error checking out:", error);
        }
      },


};