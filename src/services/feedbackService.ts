import axiosInstance from "@/lib/axiosInstance";

import { Feedback } from "@/types/feedback";

const API_URL = "/feedback";

export const feedbackService = {

     createService : async (feedback: Feedback) => {
          const response = await axiosInstance.post(`${API_URL}/booking/create`, feedback);
          return response.data;
     },
   
}