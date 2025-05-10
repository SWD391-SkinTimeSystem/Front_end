import axiosInstance from "@/lib/axiosInstance";

import { Ticket } from "@/types/ticket";

const API_URL = "/ticket";

export const ticketService = {
     getListTicketsByCustomer : async (status: string ) => {
          const response = await axiosInstance.get(`${API_URL}/status/${status}`);
          if(response.data.success) {

               return response.data;
          }else {
               throw new Error(response.data.message);
          }
     },
        
    
    createTicket: async (paymentRequest: Ticket) => {
        const response = await axiosInstance.post(`${API_URL}/register`, paymentRequest);
        return response.data;
      },

    getTicket: async (status: string) => {
        const response = await axiosInstance.get(`${API_URL}?status=${status}`);
        return response.data;
      }
}