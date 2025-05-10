import React, { useState, useEffect } from 'react';
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
  Clock3,
  Hourglass
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
import { BookingDetail, CopyBookingDetail } from '../../../types/booking';
import { format, parseISO, addMinutes, addHours, differenceInMinutes, addDays } from "date-fns";
import { vi } from "date-fns/locale";
import { CheckInOutButton } from './CheckInOutButton';
// import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCheckCheckin, useTracking } from '@/hooks/useTracking';
import { trackingService } from '@/services/trackingService';

const getEnhancedStatusConfig = (status: string, completedSteps: number, totalSteps: number) => {
  const backendStatus = status.toLowerCase();
  
  let uiStatus = backendStatus;
  
  if (backendStatus === 'notstarted') {
    uiStatus = 'Chưa hoàn thành';
  } else if (backendStatus === 'completed') {
    uiStatus = 'Đã hoàn thành';
  } else if (backendStatus === 'canceled') {
    uiStatus = 'Đã hủy';
  }
    
  if (totalSteps > 1 && backendStatus === 'notstarted') {
    uiStatus = 'Đang thực hiện';
  }
  
  switch (uiStatus) {
    case 'Đã hoàn thành':
      return { color: 'bg-green-100 text-green-800', icon: <CheckCircle2 className="h-4 w-4 mr-1" />, label: uiStatus };
    case 'Chưa hoàn thành':
      return { color: 'bg-blue-100 text-blue-800', icon: <Clock className="h-4 w-4 mr-1" />, label: uiStatus };
    case 'Đã hủy':
      return { color: 'bg-red-100 text-red-800', icon: <X className="h-4 w-4 mr-1" />, label: uiStatus };
    case 'Đang thực hiện':
      return { color: 'bg-yellow-100 text-yellow-800', icon: <Hourglass className="h-4 w-4 mr-1" />, label: uiStatus };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: <Clock className="h-4 w-4 mr-1" />, label: uiStatus };
  }
};

const getStepStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return { color: 'bg-green-100 text-green-800', icon: <CheckCircle2 className="h-4 w-4 mr-1" />, label: 'Đã hoàn thành' };
    case 'notstarted':
      return { color: 'bg-blue-100 text-blue-800', icon: <Clock className="h-4 w-4 mr-1" />, label: 'Chưa hoàn thành' };
    case 'canceled':
      return { color: 'bg-red-100 text-red-800', icon: <X className="h-4 w-4 mr-1" />, label: 'Đã hủy' };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: <Clock className="h-4 w-4 mr-1" />, label: 'Chưa hoàn thành' };
  }
};

const parseTime = (dateStr: string, timeStr: string): Date => {
  const date = new Date(dateStr);
  const [hours, minutes] = timeStr.split(':').map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingDetailViewProps {
  booking: CopyBookingDetail;
  onBack: () => void;
  onCheckIn: (bookingId: string, stepIndex: number, code: string) => Promise<boolean>;
  onCheckOut: (bookingId: string, stepIndex: number) => Promise<boolean>;
  onUpdateStatus: (bookingId: string, stepIndex: number, status: string) => Promise<boolean>;
  onScheduleNextStep: (bookingId: string, stepIndex: number, date: Date, time: string) => Promise<boolean>;
  fetchAvailableTimeSlots: (date: Date) => Promise<TimeSlot[]>;
}

const BookingDetailView: React.FC<BookingDetailViewProps> = ({ 
  booking, 
  onBack, 
  onCheckIn, 
  onCheckOut,
  onUpdateStatus,
  onScheduleNextStep,
  fetchAvailableTimeSlots
}) => {
  const [checkedInSteps, setCheckedInSteps] = useState<number[]>([]);
  const [checkInTimes, setCheckInTimes] = useState<{[key: number]: Date}>({});
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [nextStepIndex, setNextStepIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  
  // Date range for next step scheduling
  const [dateRange, setDateRange] = useState<{
    minDate: Date | null;
    maxDate: Date | null;
  }>({
    minDate: null,
    maxDate: null
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); 
    return () => clearInterval(timer);
  }, []);
  
  // Check for auto-cancellation
  useEffect(() => {
    booking.details.forEach((detail, index) => {
      if (detail.status.toLowerCase() === 'notstarted' && detail.reservedDate && detail.startTime) {
        const serviceDateTime = parseTime(detail.reservedDate.toString(), detail.startTime);
        const timeLimit = addMinutes(serviceDateTime, 15);
  
        // Nếu quá thời gian 15 phút mà chưa check-in, auto cancel
        if (currentTime > timeLimit && !checkedInSteps.includes(index)) {
          onUpdateStatus(booking.id, index, 'canceled').then(success => {
            if (success) {
              // Cập nhật lại booking.details trong state ngay lập tức
              booking.details[index].status = 'canceled';
            }
          });
        }
      }
    });
  }, [currentTime, booking.details, checkedInSteps, onUpdateStatus]);
  
  const completedSteps = booking.details.filter(detail => 
    detail.status.toLowerCase() === 'completed'
  ).length;
  
  const progress = (completedSteps / booking.totalStep) * 100;
  
  const statusConfig = getEnhancedStatusConfig(
    booking.status, 
    completedSteps, 
    booking.totalStep
  );
  
  const currentStepIndex = booking.details.findIndex(detail => 
    detail.status.toLowerCase() === 'notstarted'
  );

  const handleCheckIn = async (bookingId: string, stepIndex: number, code: string) => {
    const success = await onCheckIn(bookingId, stepIndex, code);
    const isCheckIn = await trackingService.getCheckCheckIn(booking.details[stepIndex].scheduleID);
    if (success) {
      setCheckedInSteps(prev => [...prev, stepIndex]);
      setCheckInTimes(isCheckIn.checkinTime);
    }
    return success;
  };
  
//   const handleCheckOut = async (bookingId: string, stepIndex: number) => {
//     const success = await onCheckOut(bookingId, stepIndex);
    
//     if (success) {
//       if (stepIndex < booking.totalStep - 1) {
//         const nextIndex = stepIndex + 1;
//         setNextStepIndex(nextIndex);
        
//         const minDate = addDays(new Date(), 7); 
//         const maxDate = addDays(minDate, 7);    
//         console.log("Checkout success:", success);
// console.log("Step index:", stepIndex);
// console.log("Total steps:", booking.totalStep);
// console.log("Should show dialog:", stepIndex < booking.totalStep - 1);
//         setDateRange({
//           minDate,
//           maxDate
//         });
        
//         setShowScheduleDialog(true);
//       }
//     }
//     return success;
//   };
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
            </div>
            <div className="flex flex-col items-end">
              <Badge className={`${statusConfig.color} flex items-center px-3 py-1`}>
                {statusConfig.icon}
                {statusConfig.label}
              </Badge>
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
                {booking.details.map((detail, index)  => {
                  const detailStatus = getStepStatusConfig(detail.status);
                  const isActiveStep = currentStepIndex === index;
                  const isPastStep = index < currentStepIndex;
                  const check = trackingService.getCheckCheckIn(detail.scheduleID);
                  // Kiểm tra xem bước này đã checkin chưa
                  const isStepCheckedIn = check;
                  
                  // Kiểm tra xem bước trước đã hoàn thành chưa
                  const isPreviousStepCompleted = index === 0 ||
                      (index > 0 && booking.details[index - 1].status.toLowerCase() === 'completed');
                  
                  // Kiểm tra xem bước hiện tại đã được lên lịch chưa
                  const isStepScheduled = Boolean(detail.reservedDate && detail.startTime);
                  
                  let serviceDateTime;
                  let serviceEndDateTime;
                  let checkInWindowStart;
                  let autoCancelTime;
                  
                  if (isStepScheduled) {
                    // Check thời gian dịch vụ đó
                    serviceDateTime = parseTime(detail.reservedDate.toString(), detail.startTime);
                    serviceEndDateTime = parseTime(detail.reservedDate.toString(), detail.startEnd);
                    
                    // Check-in window opens 15 minutes before service time
                    checkInWindowStart = addMinutes(serviceDateTime, -15);
                    
                    // Tự động hủy nếu quá 15p kể từ giờ dvu mà chưa checkin
                    autoCancelTime = addMinutes(serviceDateTime, 15);
                  }
                  
                  // có thể checkin từ trước 15p giờ dvu
                  const isWithinCheckInWindow = isStepScheduled && 
                      currentTime >= checkInWindowStart! && 
                      currentTime <= autoCancelTime!;
                  
                  // có thể checkout sau 1h từ giờ checkin
                  const checkInTime = checkInTimes[index];
                  const canShowCheckOut = checkInTime && 
                                          differenceInMinutes(currentTime, checkInTime) >= 1;
                  
                  // A step can only be checked in if:
                  // - It's the active step
                  // - It's not started
                  // - Not already checked in
                  // - Within check-in window
                  // - Previous step is completed
                  const canCheckIn = isActiveStep && 
                                     detail.status.toLowerCase() === 'notstarted' && 
                                     !isStepCheckedIn &&
                                     isWithinCheckInWindow &&
                                     isPreviousStepCompleted &&
                                     isStepScheduled;
                  
                  // A step can only be checked out if:
                  // - It's been checked in
                  // - At least an hour has passed since check-in
                  const canCheckOut = isActiveStep && 
                                      detail.status.toLowerCase() === 'notstarted' && 
                                      isStepCheckedIn &&
                                      canShowCheckOut;
                  
                  const isStepCompleted = detail.status.toLowerCase() === 'completed';
                  const isStepCanceled = detail.status.toLowerCase() === 'canceled';
                  
                  // For steps that aren't scheduled yet but previous step is completed
                  const needsScheduling = detail.status.toLowerCase() === 'notstarted' && 
                                         !isStepScheduled && 
                                         isPreviousStepCompleted;
                  
                  return (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg ${
                        isStepCompleted ? 'border-green-200 bg-green-50' : 
                        isStepCanceled ? 'border-red-200 bg-red-50' :
                        needsScheduling ? 'border-yellow-200 bg-yellow-50' :
                        isActiveStep ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-3 ${
                            isStepCompleted ? 'bg-green-500 text-white' : 
                            isStepCanceled ? 'bg-red-500 text-white' :
                            needsScheduling ? 'bg-yellow-500 text-white' :
                            isActiveStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {isStepCompleted ? <Check className="h-5 w-5" /> : 
                             isStepCanceled ? <X className="h-5 w-5" /> : (index + 1)}
                          </div>
                          <div>
                            <h4 className="font-medium">{detail.serviceDetailsName}</h4>
                            {isStepScheduled ? (
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Calendar className="h-4 w-4 mr-1" />
                                {format(new Date(detail.reservedDate), "dd/MM/yyyy", { locale: vi })}
                                <span className="mx-2">•</span>
                                <Clock className="h-4 w-4 mr-1" />
                                {detail.startTime} - {detail.startEnd}
                              </div>
                            ) : needsScheduling ? (
                              <div className="text-sm text-yellow-600 mt-1">
                                Cần lên lịch cho bước này
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500 mt-1">
                                Chưa có lịch hẹn
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Badge className={`${detailStatus.color} flex items-center px-2 mr-3`}>
                            {detailStatus.icon}
                            {detailStatus.label}
                          </Badge>
                          
                          {needsScheduling && (
                            <Button 
                              variant="outline" 
                              className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                              onClick={() => {
                                setNextStepIndex(index);
                                
                                // Calculate date range for scheduling (7 days from now)
                                const minDate = addDays(new Date(), 7);
                                const maxDate = addDays(minDate, 7);
                                
                                setDateRange({
                                  minDate,
                                  maxDate
                                });
                                
                                setShowScheduleDialog(true);
                              }}
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Lên lịch
                            </Button>
                          )}
                          
                          {!isStepCanceled && (canCheckIn || canCheckOut) && (
                            <CheckInOutButton 
                              bookingId={booking.id}
                              stepIndex={index}
                              checkInCode={detail.checkInCode}
                              isCheckedIn={isStepCheckedIn} 
                              onCheckIn={handleCheckIn} 
                              onCheckOut={onCheckOut}
                            />
                          )}
                        </div>
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
          
          {/* <div className="flex gap-3">
            <Button variant="outline" className="text-gray-600">
              <Printer className="h-4 w-4 mr-2" />
              In thông tin
            </Button>
          </div> */}
        </CardFooter>
      </Card>
      
      {/* Schedule Next Step Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Lên lịch cho bước tiếp theo</DialogTitle>
            <DialogDescription>
              Chọn ngày và giờ phù hợp cho bước tiếp theo của lộ trình.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Chọn ngày (có sẵn từ {dateRange.minDate?.toLocaleDateString('vi')})</Label>
              <div className="flex justify-center p-2">
                {/* Calendar component for date selection */}
                <div className="inline-block">
                  <input
                    type="date"
                    className="border rounded p-2"
                    min={dateRange.minDate?.toISOString().split('T')[0]}
                    max={dateRange.maxDate?.toISOString().split('T')[0]}
                    onChange={(e) => handleDateSelect(new Date(e.target.value))}
                  />
                </div>
              </div>
            </div>
            
            {selectedDate && (
              <div className="space-y-2">
                <Label>Chọn giờ</Label>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      type="button"
                      variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                      className={`${
                        !slot.available ? 'bg-red-50 text-red-500 border-red-200 cursor-not-allowed' : 
                        selectedTimeSlot === slot.time ? 'bg-green-600 hover:bg-green-700 text-white' : 
                        'hover:bg-green-50'
                      }`}
                      disabled={!slot.available}
                      onClick={() => setSelectedTimeSlot(slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {scheduleError && (
              <div className="text-sm text-red-500">{scheduleError}</div>
            )}
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowScheduleDialog(false)}
            >
              Hủy
            </Button>
            <Button
              type="button"
              disabled={isScheduling || !selectedDate || !selectedTimeSlot}
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleScheduleConfirm}
            >
              {isScheduling ? "Đang xử lý..." : "Xác nhận lịch hẹn"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingDetailView;