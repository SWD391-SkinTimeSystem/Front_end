import axiosInstance from "@/lib/axiosInstance";

const API_URL = "/ticket";

export const ticketEvent = {
     getListTicketEvent : async (eventId: string ) => {
          const response = await axiosInstance.get(`${API_URL}/${eventId}/list`);
          if(response.data.success) {
               return response.data;
          }else {
               throw new Error(response.data.message);
          }
     },

    checkInTicket : async (ticketId: string, eventId: string, otp: string) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/${ticketId}/checkin`, {
                params: { eventId, otp }
            });
            return response.data;
        } catch (error) {
            console.error("Error checking in ticket:", error);
            throw error;
        }
    },
        
}