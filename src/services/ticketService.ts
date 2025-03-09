import axiosInstance from "@/lib/axiosInstance";


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
        
    
}