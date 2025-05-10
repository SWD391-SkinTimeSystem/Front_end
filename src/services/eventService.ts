import axiosInstance from "@/lib/axiosInstance";
import { CreateEvent } from "@/types/event";
import { create } from "domain";
import { stat } from "fs";


const API_URL = "/event";

export const eventService = {
     getListEvents : async (page: number, pageSize : number) => {
          const response = await axiosInstance.get(`${API_URL}/available`, {
               params: {
                    page,
                    pageSize
               }
          });
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


     createEvent : async (event: CreateEvent, eventImage : File) => {
          try {
               const formData = new FormData();
               formData.append("EventName", event.EventName);
        formData.append("Description", event.Description);
        formData.append("Date", event.Date);
        formData.append("StartTime", event.StartTime);
        formData.append("EndTime", event.EndTime);
        formData.append("Location", event.Location);
        formData.append("Price", event.Price.toString());  // Đảm bảo gửi số dưới dạng chuỗi
        formData.append("Capacity", event.Capacity.toString());
               formData.append("EventImage", eventImage);

               const response = await axiosInstance.post(`${API_URL}/create`, formData, {
                    headers: {
                         "Content-Type": "multipart/form-data",
                     },     
               });

               return response.data.data;
             } catch (error) {
               console.error("Error create event:", error);
               throw error;
             }
     }
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

const fileToBinaryString = (file: File): Promise<string> => {
     return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.readAsDataURL(file); // Chuyển file thành binary string
         reader.onload = () => resolve(reader.result as string);
         reader.onerror = (error) => reject(error);
     });
 };