import axiosInstance from "@/lib/axiosInstance";


const API_URL = "/booking";

export const bookingService = {
     getListBookingsByCustomer : async (status: string ) => {
          const response = await axiosInstance.get(`${API_URL}/status/${status}`);
          if(response.data.success) {

               return response.data;
          }else {
               throw new Error(response.data.message);
          }
     },
        
     getBookingDetail : async (id: string) => {
          const response = await axiosInstance.get(`${API_URL}/${id}`);
          return response.data.data;
     },
    
    
}