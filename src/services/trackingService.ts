import axiosInstance from "@/lib/axiosInstance";

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
          const response = await axiosInstance.put("/tracking/checkout", {scheduleId});
          return response.data;
        } catch (error) {
          console.error("Error checking out:", error);
        }
      },
};