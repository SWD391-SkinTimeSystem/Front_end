import axiosInstance from "@/lib/axiosInstance";


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