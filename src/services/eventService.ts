import axiosInstance from "@/lib/axiosInstance";
import { stat } from "fs";


const API_URL = "/event";

export const eventService = {
     getListEvents : async () => {
          const response = await axiosInstance.get(`${API_URL}/available`);
          if(response.data.success) {
               return response.data.data;
          }else {
               throw new Error(response.data.message);
          }
     },

     getEvent : async (id: string) => {
          const response = await axiosInstance.get(`${API_URL}/${id}`);
          return response.data;
     },

     getEventState : async ( page: number, pageSize: number, status: number) => {
          const response = await axiosInstance.get(`${API_URL}/status`, 
               {
                    params: {
                         page,
                         pageSize,
                         status,
                    }
               }
          );
          if(response.data.success) {
               return response.data.data;
          }else {
               throw new Error(response.data.message);
          }
     },

     updateEventState : async (id: string, status: number) => {
          try {
            const response = await axiosInstance.post(`${API_URL}/state`, { id, status });
            return response.data;
          } catch (error) {
            console.error("Error updating event state:", error);
            throw error;
          }
        },
    //  createService : async (service: Service) => {
    //       const response = await axiosInstance.post(`${API_URL}`, service);
    //       return response.data;
    //  },
    //  updateService : async (service: Service) => {
    //       const response = await axiosInstance.put(`${API_URL}/${service.id}`, service);
    //       return response.data;
    //  },
    //  deleteService : async (id: string) => {
    //       const response = await axiosInstance.delete(`${API_URL}/${id}`);
    //       return response.data;
    //  }
}