import axiosInstance from "@/lib/axiosInstance";

import { Ticket } from "@/types/ticket";

const API_URL = "/ticket";

export const ticketService = {
     getListTicketsByCustomer: async (status: string) => {
          try {
              const response = await axiosInstance.get(`${API_URL}`, { params: { status } });
              return response.data; // Trả về dữ liệu thực tế
          } catch (error) {
              console.error("Error fetching tickets:", error);
              throw error; // Ném lỗi để xử lý ở nơi gọi hàm
          }
      },
        
    
    createTicket: async (paymentRequest: Ticket) => {
        const response = await axiosInstance.post(`${API_URL}/register`, paymentRequest);
        return response.data;
      },

//     getTicket: async (status: string) => {
//         const response = await axiosInstance.get(`${API_URL}?status=${status}`);
//         return response.data;
//       }
}