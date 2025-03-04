import axiosInstance from "@/lib/axiosInstance";

import { Service } from "@/types/services";

const API_URL = "/service";

export const serviceService = {
     getListServices : async () => {
          const response = await axiosInstance.get(`${API_URL}`);
          if(response.data.success) {

               return response.data.data;
          }else {
               throw new Error(response.data.message);
          }
     },

    
        // testcommitdane
     getService : async (id: string) => {
          const response = await axiosInstance.get(`${API_URL}/${id}`);
          console.log("lỗi ở serviceService",  response.data )
          return response.data.serviceDetails;
     },
     createService : async (service: Service) => {
          const response = await axiosInstance.post(`${API_URL}`, service);
          return response.data;
     },
     updateService : async (service: Service) => {
          const response = await axiosInstance.put(`${API_URL}/${service.id}`, service);
          return response.data;
     },
     deleteService : async (id: string) => {
          const response = await axiosInstance.delete(`${API_URL}/${id}`);
          return response.data;
     },
         
     getFeedback : async (id: string) => {
          const response = await axiosInstance.get(`/feedback/service/${id}`);
          return response.data;
     }
}