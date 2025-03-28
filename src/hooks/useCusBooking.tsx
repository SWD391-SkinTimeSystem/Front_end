import {useState, useEffect} from 'react';
import { Booking, BookingDetail } from '@/types/booking';
import { bookingService } from '@/services/bookingCusService';

export const useBooking = (status : string) => {
     const [bookings, setBookings] = useState<Booking[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchBookings = async () => {

        try {
          const data = await bookingService.getListBookingsByCustomer(status);
          setBookings(data.data);
          console.log (data);
        } catch (error) {
          setError("Failed to fetch bookings");
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        // setLoading(true);
        fetchBookings();
      }, [status]);
    
      return { bookings, loading, error };
    };

export const useBookingDetail = (id : string) => {
    const [bookingDetail, setBookingDetail] = useState<BookingDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchBookingDetail = async () => {
          try {
               const data = await bookingService.getBookingDetail(id);
               setBookingDetail(data);
          } catch (error) {
               setError("failed to fetch bookingDetail");
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
        fetchBookingDetail();
      }, [id]);

     return { bookingDetail, loading, error };

}

// export const useBookingDetailStaff = (id : string) => {
//   const [bookingDetail, setBookingDetail] = useState<BookingDetail | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//    const [error, setError] = useState<string | null>(null);





// export const useCopyBookingDetail = (id : string) => {
//   const [bookingDetail, setBookingDetail] = useState<CopyBookingDetail | null>(null);
//   const [loading1, setLoading] = useState<boolean>(true);
//    const [error1, setError] = useState<string | null>(null);

//    const fetchBookingDetail = async () => {
//         try {
//              const data = await bookingService.getBookingDetail(id);
//              setBookingDetail(data.data);
//              setBookingDetail(data);
//         } catch (error) {
//              setError("failed to fetch bookingDetail");
//         } finally {
//              setLoading(false);
//         }
//    }

//    useEffect(() => {
//       fetchBookingDetail();
//     }, [id]);

//    return { bookingDetail, loading1, error1 };

// }