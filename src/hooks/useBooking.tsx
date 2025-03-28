import { bookingService } from "@/services/bookingService";
import { BookingType, BookingTable, BookingTherapist } from "@/types/booking";
import { useState } from "react";

export const useBooking = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [berror, setbError] = useState<Error | null>(null);
     const [bookings, setBookings] = useState<BookingTable[]>([]);
     const [bookingTherapistTable, setBookingTherapistTable] = useState<BookingTherapist[]>([]);
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
     const getBooking = async (page: number, pageSize: number) => {
          setIsLoading(true);
          setbError(null);
          try {
            const response = await bookingService.getBooking(page, pageSize);
            setBookings(response.data.content);
            return response.data.content;
          }
          catch (err) {
            setbError(err as Error);
            throw err;
          }
          finally {
            setIsLoading(false);
          }
        };
     const getTherapistBooking = async (status: string) => {
        setIsLoading(true);
        setbError(null);
        try {
          const response = await bookingService.getTherapistBooking(status);
          setBookingTherapistTable(response.data);
          return response.data;
        } catch (err) {
          setbError(err as Error);
          throw err;
        } finally {
          setIsLoading(false);
        }
      }
     return { getTherapistBooking, bookingTherapistTable, getBooking, bookings, createBooking, isLoading, berror };
   };