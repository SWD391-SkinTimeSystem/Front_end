
import { useEffect, useState } from 'react';
import BookingDetailView from './BookingDetailView';
import { 
  singleServiceBooking, 
  treatmentPlanBooking, 
} from './bookingDetailTestData';
import { BookingDetail } from '@/types/booking';
import { useBookingDetailStaff } from '@/hooks/useCusBooking';
// import {CheckInOutActions} from './CheckinCheckout'

const TestPage = () => {
  // mấy cái import từ './bookingDetailTestData' là để dữ liệu để test ui, ông có thể thay những cái func trong đấy bằng nhiều loại booking để coi ui như nào 
  // chưa rõ quyền staff được xem những booking gì, nếu chỉ xem được booking đang có của nó thì mạnh dạn xóa code đi nha,nhá ko sao 
  // const [booking, setBooking] = useState<BookingDetail | null>(null);
  const { bookingDetail, loading, error } = useBookingDetailStaff("1a092d6d-0a7e-4e5f-bbf5-3328fbcaad16");
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(bookingDetail);
  // console.log(bookingDetail);
  const handleBack = () => {
    console.log('Back button clicked');
  };
  

  return (
    <>
    <BookingDetailView booking={bookingDetail} onBack={handleBack} />
    {/* <CheckInOutActions booking={booking} onStatusUpdate={() => console.log('Status updated')} /> */}

    </>
  )
};

export default TestPage;