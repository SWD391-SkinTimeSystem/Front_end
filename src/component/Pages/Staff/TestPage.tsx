import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { BookingDetail} from '../../../types/booking';
import BookingDetailView from './BookingDetailView';

// import { BookingService } from './BookingService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
// import { useCopyBookingDetail } from '@/hooks/useCusBooking';
import { useBookingDetail } from '@/hooks/useCusBooking';
import { useTracking } from '@/hooks/useTracking';
import { trackingService } from '@/services/trackingService';
// import { addDays } from 'date-fns';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<{ id: string }>();

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { bookingDetail } = useBookingDetail(id);
  const { fetchCheckin, fetchCheckout } = useTracking();
  
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get('id') || 'treatment';
  
  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      if (bookingDetail && booking !== bookingDetail) {
        bookingDetail.details.sort((a, b) => a.step - b.step);
        setBooking(bookingDetail);
      }
      try {
        setError(null);
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Không thể tải thông tin lịch hẹn');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingDetail, booking]);

  const handleBack = () => {
    navigate('/bookings');
  };

  const handleCheckIn = async (bookingId: string, stepIndex: number, code: string): Promise<boolean> => {
    if (!booking) return false;
    console.log(booking.details[stepIndex].checkInCode)
    if (code === booking.details[stepIndex].checkInCode) {
      const result = await fetchCheckin(booking.details[stepIndex].scheduleID, code);
      console.log(result);
      toast("Check-in thành công");
      return true;
    }
    
    toast("Check-in thất bại");
    return false;
  };

  const handleCheckOut = async (bookingId: string, stepIndex: number): Promise<boolean> => {
    if (!booking) return false;

    const result = await fetchCheckout(booking.details[stepIndex].scheduleID);
    console.log(result);
    toast("Check-out thành công");
    return true;
  };

  const handleUpdateStatus = async (bookingId: string, stepIndex: number, status: string): Promise<boolean> => {
    if (!booking) return false;
    
    // Xử lý trường hợp đặc biệt khi stepIndex là -1 (cập nhật trạng thái booking)
    if (stepIndex === -1) {
      const updatedBooking = JSON.parse(JSON.stringify(booking)) as BookingDetail;
      updatedBooking.status = status;
      setBooking(updatedBooking);
      console.log(`Updating overall booking status to ${status}`);
      return true;
    }

    const updatedBooking = JSON.parse(JSON.stringify(booking)) as BookingDetail;
    updatedBooking.details[stepIndex].status = status;
    
    // Kiểm tra xem tất cả các bước đã bị hủy (canceled) hoặc hoàn thành (completed) chưa
    const allCompletedOrCanceled = updatedBooking.details.every(detail => 
      detail.status.toLowerCase() === "completed" || detail.status.toLowerCase() === "cancelled" || detail.status.toLowerCase() === "canceled"
    );
    
    // Kiểm tra nếu hủy một bước và có bất kỳ bước nào bị hủy, thì cập nhật trạng thái booking thành "Cancelled"
    if (status.toLowerCase() === "canceled" || status.toLowerCase() === "cancelled") {
      updatedBooking.status = "Cancelled";
    } 
    // Nếu tất cả các bước đều đã hoàn thành, cập nhật trạng thái booking thành "Completed"
    else if (updatedBooking.details.every(detail => detail.status.toLowerCase() === "completed")) {
      updatedBooking.status = "Completed";
    }
    
    console.log(`Updating status for booking ${bookingId}, step ${stepIndex} to ${status}`);
    setBooking(updatedBooking);
    return true;
  };
  
  const handleScheduleNextStep = async (
    bookingId: string, 
    stepIndex: number, 
    date: Date, 
    time: string
  ): Promise<boolean> => {
    if (!booking) return false;
    
    const updatedBooking = JSON.parse(JSON.stringify(booking)) as BookingDetail;
    
    // Update the next step's scheduling information
    updatedBooking.details[stepIndex].reservedDate = date;
    updatedBooking.details[stepIndex].startTime = time;
    
    // Calculate and set end time (assuming 1-hour duration)
    const [hour, minute] = time.split(':').map(Number);
    updatedBooking.details[stepIndex].startEnd = `${hour + 1}:${minute.toString().padStart(2, '0')}`;
    
    // Generate a new check-in code for this step
    updatedBooking.details[stepIndex].checkInCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    toast("Lên lịch thành công cho bước tiếp theo");
    setBooking(updatedBooking);
    return true;
  };
  
  const fetchAvailableTimeSlots = async (date: Date): Promise<{ time: string; available: boolean }[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock time slots
        const slots = [
          { time: '09:00', available: true },
          { time: '10:00', available: true },
          { time: '11:00', available: true },
          { time: '13:00', available: true },
          { time: '14:00', available: true },
          { time: '15:00', available: true },
          { time: '16:00', available: false },
          { time: '17:00', available: true }
        ];
        resolve(slots);
      }, 500);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin lịch hẹn...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-medium text-red-600 mb-4">{error}</h3>
        <Button onClick={() => window.location.reload()}>Thử lại</Button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-medium text-gray-600 mb-4">Không tìm thấy thông tin lịch hẹn</h3>
        <Button onClick={handleBack}>Quay lại danh sách</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <BookingDetailView 
        booking={booking}
        onBack={handleBack}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
        onUpdateStatus={handleUpdateStatus}
        onScheduleNextStep={handleScheduleNextStep}
        fetchAvailableTimeSlots={fetchAvailableTimeSlots}
      />
    </div>
  );
};

export default TestPage;