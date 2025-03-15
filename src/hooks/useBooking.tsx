import { bookingService } from "@/services/bookingService";
import { BookingType } from "@/types/booking";
import { useState } from "react";

export const useBooking = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [berror, setbError] = useState<Error | null>(null);
   
     const createBooking = async (data: BookingType) => {
       setIsLoading(true);
       setbError(null);
       try {
         const response = await bookingService.createBooking(data);
         return response;
       } catch (err) {
         setbError(err as Error); 
         throw err;
       } finally {
         setIsLoading(false);
       }
     };
   
     return { createBooking, isLoading, berror };
   };