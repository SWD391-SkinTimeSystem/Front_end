import axiosInstance from "@/lib/axiosInstance";
import { QuestionResponse } from "@/types/question";

const API_URL = "/question";
const RECOMMENDATION_API_URL = "/question/recommendations";

export const questionService = {
     getListQuestions: async () => {
          const response = await axiosInstance.get(`${API_URL}`);
          return response.data;
     },
     doQuestion: async (Qdata: QuestionResponse) => {
          try {
               const response = await axiosInstance.post(RECOMMENDATION_API_URL, 
                    Qdata
               );
               return response.data;
          } catch (error) {
               console.error("Error sending question recommendations:", error);
               throw error;
          }

     }
}