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
import { BookingDetail } from '../../../types/booking';
import { format, parseISO, addMinutes, addHours, differenceInMinutes } from "date-fns";
import { vi } from "date-fns/locale";
import { CheckInOutButton } from './CheckInOutButton';

// Get enhanced status display configuration
const getEnhancedStatusConfig = (status: string, isTreatmentPlan: boolean, completedSteps: number, totalSteps: number) => {
  // Basic status from backend
  const backendStatus = status.toLowerCase();
  
  // Enhanced UI status
  let uiStatus = backendStatus;
  
  if (backendStatus === 'not_started') {
    uiStatus = 'Chưa hoàn thành';
  } else if (backendStatus === 'completed') {
    uiStatus = 'Đã hoàn thành';
  } else if (backendStatus === 'canceled') {
    uiStatus = 'Đã hủy';
  }
    
  // If it's a treatment plan and not canceled, check for in-progress status
  if (isTreatmentPlan && backendStatus === 'not_started' && completedSteps > 0) {
    uiStatus = 'Đang thực hiện';
  }
  
  // Configuration for UI display
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

// Get step status configuration
const getStepStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return { color: 'bg-green-100 text-green-800', icon: <CheckCircle2 className="h-4 w-4 mr-1" />, label: 'Đã hoàn thành' };
    case 'not_started':
      return { color: 'bg-blue-100 text-blue-800', icon: <Clock className="h-4 w-4 mr-1" />, label: 'Chưa hoàn thành' };
    case 'canceled':
      return { color: 'bg-red-100 text-red-800', icon: <X className="h-4 w-4 mr-1" />, label: 'Đã hủy' };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: <Clock className="h-4 w-4 mr-1" />, label: 'Chưa hoàn thành' };
  }
};

// Function to parse time from string (HH:MM format)
const parseTime = (dateStr: string, timeStr: string): Date => {
  const date = new Date(dateStr);
  const [hours, minutes] = timeStr.split(':').map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

interface BookingDetailViewProps {
  booking: BookingDetail;
  onBack: () => void;
  onCheckIn: (bookingId: string, stepIndex: number, code: string) => Promise<boolean>;
  onCheckOut: (bookingId: string, stepIndex: number) => Promise<boolean>;
  onUpdateStatus: (bookingId: string, stepIndex: number, status: string) => Promise<boolean>;
}

const BookingDetailView: React.FC<BookingDetailViewProps> = ({ 
  booking, 
  onBack, 
  onCheckIn, 
  onCheckOut,
  onUpdateStatus 
}) => {
  const [checkedInSteps, setCheckedInSteps] = useState<number[]>([]);
  const [checkInTimes, setCheckInTimes] = useState<{[key: number]: Date}>({});
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // every minute
    return () => clearInterval(timer);
  }, []);
  
  // Check for auto-cancellation
  useEffect(() => {
    booking.details.forEach((detail, index) => {
      if (detail.status.toLowerCase() === 'not_started') {
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
  
  // useEffect(() => {
  //   if (!booking?.details?.length) return;
  
  //   const updatedDetails = booking.details.map((detail, index) => {
  //     if (detail.status.toLowerCase() === "not_started") {
  //       const serviceDateTime = parseTime(detail.reservedDate.toString(), detail.startTime);
  //       const timeLimit = addMinutes(serviceDateTime, 15);
  
  //       if (currentTime > timeLimit && !checkedInSteps.includes(index)) {
  //         onUpdateStatus(booking.id, index, "canceled").then((success) => {
  //           if (success) {
  //             setBooking((prev) => ({
  //               ...prev,
  //               details: prev.details.map((d, i) =>
  //                 i === index ? { ...d, status: "canceled" } : d
  //               ),
  //             }));
  //           }
  //         });
  //       }
  //     }
  //     return detail;
  //   });
  // }, [currentTime, booking.id, checkedInSteps, onUpdateStatus]);
  
  const completedSteps = booking.details.filter(detail => 
    detail.status.toLowerCase() === 'completed'
  ).length;
  
  const progress = (completedSteps / booking.totalStep) * 100;
  
  const statusConfig = getEnhancedStatusConfig(
    booking.status, 
    booking.isTretmentPlan, 
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
    }
    return success;
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
              {/* Only show check-in code if at least one step has been checked in */}
              {checkedInSteps.length > 0 && (
                <CardDescription className="mt-1">
                  Mã check-in: <span className="font-mono font-bold">{booking.checkInCode}</span>
                </CardDescription>
              )}
            </div>
            <div className="flex flex-col items-end">
              <Badge className={`${statusConfig.color} flex items-center px-3 py-1`}>
                {statusConfig.icon}
                {statusConfig.label}
              </Badge>
              <span className="text-sm text-gray-500 mt-2">
                {booking.isTretmentPlan ? 'Lộ trình điều trị' : 'Dịch vụ đơn lẻ'}
              </span>
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
                  const detailStatus = getStepStatusConfig(detail.status);
                  const isActiveStep = currentStepIndex === index;
                  const isPastStep = index < currentStepIndex;
                  
                  // Kiểm tra xem bước này đã checkin chưa
                  const isStepCheckedIn = checkedInSteps.includes(index);
                  
                  // Check thời gian dịch vụ đó
                  const serviceDateTime = parseTime(detail.reservedDate.toString(), detail.startTime);
                  const serviceEndDateTime = parseTime(detail.reservedDate.toString(), detail.startEnd);
                  
                  // Check-in window opens 15 minutes before service time
                  const checkInWindowStart = addMinutes(serviceDateTime, -15);
                  
                  // Tự động hủy nếu quá 15p kể từ giờ dvu mà chưa checkin
                  const autoCancelTime = addMinutes(serviceDateTime, 15);
                  
                  // có thể checkin từ trước 15p giờ dvu
                  const isWithinCheckInWindow = currentTime >= checkInWindowStart && currentTime <= autoCancelTime;
                  
                  // có thể checkout sau 1h từ giờ checkin
                  const checkInTime = checkInTimes[index];
                  const canShowCheckOut = checkInTime && 
                                          differenceInMinutes(currentTime, checkInTime) >= 60;
                  
                  // A step can only be checked in if it's the active step, not started, 
                  // not already checked in, and within check-in window
                  const canCheckIn = isActiveStep && 
                                     detail.status.toLowerCase() === 'not_started' && 
                                     !isStepCheckedIn &&
                                     isWithinCheckInWindow;
                  
                  // A step can only be checked out if it's been checked in and at least an hour has passed
                  const canCheckOut = isActiveStep && 
                                      detail.status.toLowerCase() === 'not_started' && 
                                      isStepCheckedIn &&
                                      canShowCheckOut;
                  
                  const isStepCompleted = detail.status.toLowerCase() === 'completed';
                  const isStepCanceled = detail.status.toLowerCase() === 'canceled';
                  
                  return (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg ${
                        isStepCompleted ? 'border-green-200 bg-green-50' : 
                        isStepCanceled ? 'border-red-200 bg-red-50' :
                        isActiveStep ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-3 ${
                            isStepCompleted ? 'bg-green-500 text-white' : 
                            isStepCanceled ? 'bg-red-500 text-white' :
                            isActiveStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {isStepCompleted ? <Check className="h-5 w-5" /> : 
                             isStepCanceled ? <X className="h-5 w-5" /> : (index + 1)}
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
                        
                        <div className="flex items-center">
                          <Badge className={`${detailStatus.color} flex items-center px-2 mr-3`}>
                            {detailStatus.icon}
                            {detailStatus.label}
                          </Badge>
                          
                          {!isStepCanceled && (canCheckIn || canCheckOut) && (
                            <CheckInOutButton 
                              bookingId={booking.id}
                              stepIndex={index}
                              checkInCode={booking.checkInCode}
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
          
          <div className="flex gap-3">
            <Button variant="outline" className="text-gray-600">
              <Printer className="h-4 w-4 mr-2" />
              In thông tin
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingDetailView;