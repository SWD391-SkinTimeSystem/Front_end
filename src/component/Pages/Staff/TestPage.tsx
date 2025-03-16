
import { useState } from 'react';
import BookingDetailView from './BookingDetailView';
import { 
  singleServiceBooking, 
  treatmentPlanBooking, 
} from './bookingDetailTestData';
// import {CheckInOutActions} from './CheckinCheckout'

const TestPage = () => {
  // mấy cái import từ './bookingDetailTestData' là để dữ liệu để test ui, ông có thể thay những cái func trong đấy bằng nhiều loại booking để coi ui như nào 
  // chưa rõ quyền staff được xem những booking gì, nếu chỉ xem được booking đang có của nó thì mạnh dạn xóa code đi nha,nhá ko sao 
  const [booking] = useState(singleServiceBooking);
  
  const handleBack = () => {
    console.log('Back button clicked');
  };

  return (
    <>
    <BookingDetailView booking={booking} onBack={handleBack} />
    {/* <CheckInOutActions booking={booking} onStatusUpdate={() => console.log('Status updated')} /> */}

    </>
  )
};

export default TestPage;