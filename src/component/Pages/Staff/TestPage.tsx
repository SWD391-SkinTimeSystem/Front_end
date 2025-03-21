import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { BookingDetail } from '../../../types/booking';
import BookingDetailView from './BookingDetailView';
import { getMockBooking } from './bookingDetailTestData';
// import { BookingService } from './BookingService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
// import { addDays } from 'date-fns';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get('id') || 'treatment';  
  
  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const data = await getMockBooking(bookingId);
        setBooking(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Không thể tải thông tin lịch hẹn');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const handleBack = () => {
    navigate('/bookings');
  };

  const handleCheckIn = async (bookingId: string, stepIndex: number, code: string): Promise<boolean> => {
    if (!booking) return false;
    
    console.log(booking.details[stepIndex].checkInCode)
    if (code === booking.details[stepIndex].checkInCode) {
      const updatedBooking = JSON.parse(JSON.stringify(booking)) as BookingDetail;
      toast("Check-in thành công");
      setBooking(updatedBooking);
      return true;
    }
    
    toast("Check-in thất bại");
    return false;
  };

  const handleCheckOut = async (bookingId: string, stepIndex: number): Promise<boolean> => {
    if (!booking) return false;
    
    const updatedBooking = JSON.parse(JSON.stringify(booking)) as BookingDetail;
    
    updatedBooking.details[stepIndex].status = "Completed";
    
    if (updatedBooking.totalStep === 1 || 
        updatedBooking.details.every(detail => detail.status === "Completed" || detail.status === "Cancelled")) {
      updatedBooking.status = "Completed";
    }
    
    toast("Check-out thành công");
    setBooking(updatedBooking);
    return true;
  };

  const handleUpdateStatus = async (bookingId: string, stepIndex: number, status: string): Promise<boolean> => {
    if (!booking) return false;
    
    const updatedBooking = JSON.parse(JSON.stringify(booking)) as BookingDetail;
    updatedBooking.details[stepIndex].status = status;
    
    if (status === "Cancelled" && 
        updatedBooking.details.every(detail => 
          detail.status === "Completed" || detail.status === "Cancelled")) {
      updatedBooking.status = "Cancelled";
    } else if (updatedBooking.details.every(detail => detail.status === "Completed")) {
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

  const renderSampleSelector = () => (
    <div className="flex gap-4 mb-6 flex-wrap">
      <h3 className="w-full font-medium text-gray-700">Chọn mẫu booking để xem:</h3>
      <Button 
        variant={bookingId === 'single' ? 'default' : 'outline'}
        onClick={() => navigate(`${location.pathname}?id=single`)}
      >
        Dịch vụ đơn lẻ
      </Button>
      <Button 
        variant={bookingId === 'treatment' ? 'default' : 'outline'}
        onClick={() => navigate(`${location.pathname}?id=treatment`)}
      >
        Lộ trình điều trị
      </Button>
      <Button 
        variant={bookingId === 'completed' ? 'default' : 'outline'}
        onClick={() => navigate(`${location.pathname}?id=completed`)}
      >
        Đã hoàn thành
      </Button>
      <Button 
        variant={bookingId === 'cancelled' ? 'default' : 'outline'}
        onClick={() => navigate(`${location.pathname}?id=cancelled`)}
      >
        Đã hủy
      </Button>
    </div>
  );

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
      {renderSampleSelector()}
      
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