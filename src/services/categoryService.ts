import axiosInstance from "@/lib/axiosInstance";

const API_URL = "/category";

export const categoryService = {
     getCategory : async () => {
          const response = await axiosInstance.get(`${API_URL}`);
          if(response.data.success) {
               return response.data.data;
          }else {
               throw new Error(response.data.message);
          }
     },

    }