import axiosInstance from "@/lib/axiosInstance";
import { Availability, rescheduleData } from "@/types/schedule";

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
    },

    doReschedule: async (data: rescheduleData) => {
        try {
            console.log("Rescheduling in Service...", data);
            const response = await axiosInstance.post(`${API_URL}/reschedule`, 
                data
        );
            return response;
        } catch (error) {
            console.error("Error rescheduling:", error);
            throw error;
        }
    },
    getTherapistSchedule: async() => {
        try {
            console.log("Get scheduleschedule in Service...", );
            const response = await axiosInstance.get(`${API_URL}`);
            return response.data;
        } 
        catch (error) {
            console.error("Error get scheduleschedule:", error);
            throw error;
        }
    }

};
