import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  ChevronLeft,
  Printer,
  Check,
  X,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookingDetail }  from '../../../types/booking';
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case 'Completed':
      return { color: 'bg-green-100 text-green-800', icon: <CheckCircle2 className="h-4 w-4 mr-1" /> };
    case 'Upcoming':
      return { color: 'bg-blue-100 text-blue-800', icon: <Clock className="h-4 w-4 mr-1" /> };
    case 'Cancelled':
      return { color: 'bg-red-100 text-red-800', icon: <X className="h-4 w-4 mr-1" /> };
    case 'In progress':
      return { color: 'bg-yellow-100 text-yellow-800', icon: <AlertCircle className="h-4 w-4 mr-1" /> };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: <Clock className="h-4 w-4 mr-1" /> };
  }
};

interface BookingDetailViewProps {
  booking: BookingDetail;
  onBack: () => void;
}

const BookingDetailView: React.FC<BookingDetailViewProps> = ({ booking, onBack }) => {
  console.log(booking.status);
  const statusConfig = getStatusConfig(booking.status);
  
  // Calculate current step based on completed services
  const completedSteps = booking.details.filter(detail => 
    new Date(detail.reservedDate) < new Date() || 
    (booking.status.toLowerCase() === 'completed')
  ).length;
  
  const progress = (completedSteps / booking.totalStep) * 100;
  
  const statusConfig = getEnhancedStatusConfig(
    booking.status, 
    completedSteps, 
    booking.totalStep
  );
  
  const currentStepIndex = booking.details.findIndex(detail => 
    detail.status.toLowerCase() === 'not_started'
  );

  const handleCheckIn = async (bookingId: string, stepIndex: number, code: string) => {
    const success = await onCheckIn(bookingId, stepIndex, code);
    if (success) {
      const now = new Date();
      setCheckedInSteps(prev => [...prev, stepIndex]);
      setCheckInTimes(prev => ({...prev, [stepIndex]: now}));
      console.log(stepIndex)
    }
    return success;
  };
  
  const handleCheckOut = async (bookingId: string, stepIndex: number) => {
    const success = await onCheckOut(bookingId, stepIndex);
    
    if (success) {
      if (stepIndex < booking.totalStep - 1) {
        const nextIndex = stepIndex + 1;
        setNextStepIndex(nextIndex);
        
        const minDate = addDays(new Date(), 7); 
        const maxDate = addDays(minDate, 7);    
        console.log("Checkout success:", success);
console.log("Step index:", stepIndex);
console.log("Total steps:", booking.totalStep);
console.log("Should show dialog:", stepIndex < booking.totalStep - 1);
        setDateRange({
          minDate,
          maxDate
        });
        
        setShowScheduleDialog(true);
      }
    }
    return success;
  };
  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    
    try {
      // Fetch available time slots for the selected date
      const slots = await fetchAvailableTimeSlots(date);
      setAvailableTimeSlots(slots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      toast.error("Không thể tải khung giờ có sẵn. Vui lòng thử lại sau.");
      setAvailableTimeSlots([]);
    }
  };
  
  const handleScheduleConfirm = async () => {
    if (!nextStepIndex || !selectedDate || !selectedTimeSlot) {
      setScheduleError("Vui lòng chọn ngày và giờ hẹn.");
      return;
    }
    
    setIsScheduling(true);
    setScheduleError(null);
    
    try {
      const success = await onScheduleNextStep(
        booking.id, 
        nextStepIndex, 
        selectedDate, 
        selectedTimeSlot
      );
      
      if (success) {
        toast.success("Đã lên lịch thành công cho bước tiếp theo!");
        setShowScheduleDialog(false);
        
        // Update the booking details in state to reflect the new schedule
        booking.details[nextStepIndex].reservedDate = selectedDate;
        booking.details[nextStepIndex].startTime = selectedTimeSlot;
        // Calculate end time (assuming 1-hour duration)
        const [hour, minute] = selectedTimeSlot.split(':').map(Number);
        booking.details[nextStepIndex].startEnd = `${hour + 1}:${minute.toString().padStart(2, '0')}`;
      } else {
        setScheduleError("Không thể lên lịch. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error scheduling next step:", error);
      setScheduleError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setIsScheduling(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="text-green-600 hover:text-green-700 hover:bg-green-50 p-2"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Quay lại danh sách
        </Button>
      </div>
      
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-green-50">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-green-800">
                Chi tiết lịch hẹn #{booking.id}
              </CardTitle>
              <CardDescription className="mt-1">
                Mã check-in: <span className="font-mono font-bold">{booking.checkInCode}</span>
              </CardDescription>
            </div>
            <div className="flex flex-col items-end">
              <Badge className={`${statusConfig.color} flex items-center px-3 py-1`}>
                {statusConfig.icon}
                {booking.status}
              </Badge>
              {/* <span className="text-sm text-gray-500 mt-2">
                {booking.isTretmentPlan ? 'Lộ trình điều trị' : 'Dịch vụ đơn lẻ'}
              </span> */}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column with service info */}
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={booking.thumbnail || "/api/placeholder/300/200"} 
                  alt={booking.serviceName}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-green-700">{booking.serviceName}</h3>
                <p className="text-gray-600 text-sm mt-2">{booking.description}</p>
              </div>
              
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/api/placeholder/40/40" alt={booking.therapistName} />
                  <AvatarFallback className="bg-green-100 text-green-800">
                    {booking.therapistName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-gray-500">Chuyên viên</div>
                  <div className="font-medium">{booking.therapistName}</div>
                </div>
              </div>
            </div>
            
            {/* Right column with details */}
            <div className="md:w-2/3">
              {booking.totalStep > 1 && (
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-green-700">
                      Tiến độ lộ trình: {completedSteps}/{booking.totalStep} bước
                    </span>
                    <span className="text-sm text-gray-500">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2 bg-gray-100" />
                </div>
              )}
              
              <h3 className="font-semibold text-green-700 mb-4">
                {booking.totalStep > 1 ? 'Chi tiết các bước trong lộ trình' : 'Chi tiết dịch vụ'}
              </h3>
              
              <div className="space-y-4">
                {booking.details.map((detail, index) => {
                  const isPast = new Date(detail.reservedDate) < new Date();
                  const isCompleted = booking.status.toLowerCase() === 'completed' || isPast;
                  
                  return (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-3 ${
                            isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {isCompleted ? <Check className="h-5 w-5" /> : (index + 1)}
                          </div>
                          <div>
                            <h4 className="font-medium">{detail.serviceDetailsName}</h4>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {format(new Date(detail.reservedDate), "dd/MM/yyyy", { locale: vi })}
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 mr-1" />
                              {detail.startTime} - {detail.startEnd}
                            </div>
                          </div>
                        </div>
                        
                        {index < booking.details.length - 1 && !isCompleted && (
                          <Button disabled size="sm" variant="outline" className="text-gray-500">
                            {index === 0 ? 'Bước tiếp theo' : 'Chờ hoàn thành'}
                          </Button>
                        )}
                        
                        {isCompleted && (
                          <Badge className="bg-green-100 text-green-800 px-2">
                            <Check className="h-3 w-3 mr-1" /> Hoàn thành
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
        
        <Separator />
        
        <CardFooter className="p-6 flex flex-wrap justify-between gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Ghi chú thêm</h4>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="notes">
                <AccordionTrigger className="text-sm text-green-600">Xem ghi chú</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
                    {booking.description ? booking.description : 'Không có ghi chú cho lịch hẹn này.'}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="text-gray-600">
              <Printer className="h-4 w-4 mr-2" />
              In thông tin
            </Button>
            {booking.status.toLowerCase() === 'upcoming' && (
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Cập nhật trạng thái
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingDetailView;