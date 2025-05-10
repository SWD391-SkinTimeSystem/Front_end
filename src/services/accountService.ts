import axiosInstance from "@/lib/axiosInstance";

const API_URL = "/account";

export const accountService = {
    getListAccount : async () => {
          const response = await axiosInstance.get(`${API_URL}/list/`);
          if(response.data.success) {
               return response.data.data;
          }else {
               throw new Error(response.data.message);
          }
     },
        
    //  getBookingDetail : async (id: string) => {
    //       const response = await axiosInstance.get(`${API_URL}/${id}`);
    //       return response.data.data;
    //  },
    
    
}