import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
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
  Check,
  X,
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
import { CopyBookingDetail } from '../../../types/booking';
import { format, addMinutes, differenceInMinutes, addDays } from "date-fns";
import { vi } from "date-fns/locale";
import { CheckInOutButton } from './CheckInOutButton';
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

// Utility Functions
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
  const [dateRange, setDateRange] = useState<{
    minDate: Date | null;
    maxDate: Date | null;
  }>({
    minDate: null,
    maxDate: null
  });

  // Cascade Cancellation Function
  const handleCascadeCancellation = async (canceledStepIndex: number) => {
    const updatedDetails = [...booking.details];
    
    // Hủy các bước từ bước bị hủy trở đi
    for (let i = canceledStepIndex; i < updatedDetails.length; i++) {
      if (updatedDetails[i].status.toLowerCase() === 'notstarted') {
        try {
          const success = await onUpdateStatus(booking.id, i, 'canceled');
          if (success) {
            updatedDetails[i].status = 'canceled';
          }
        } catch (error) {
          console.error(`Failed to cancel step ${i}:`, error);
        }
      }
    }
    
    // Cập nhật trạng thái tổng thể của booking thành canceled
    // Sử dụng onUpdateStatus với stepIndex là -1 để cập nhật trạng thái booking
    try {
      // Chúng ta sẽ gọi onUpdateStatus với stepIndex là -1 
      // để chỉ định đây là cập nhật cho toàn bộ booking
      const success = await onUpdateStatus(booking.id, -1, 'canceled');
      if (success) {
        booking.status = 'canceled';
      }
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
    
    toast.warning(`Các bước sau bước ${canceledStepIndex + 1} và toàn bộ lịch hẹn đã bị hủy`);
  };

  // Time-based Effects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); 
    return () => clearInterval(timer);
  }, []);
  
  // Auto-cancellation Effect
  useEffect(() => {
    booking.details.forEach((detail, index) => {
      if (detail.status.toLowerCase() === 'notstarted' && detail.reservedDate && detail.startTime) {
        const serviceDateTime = parseTime(detail.reservedDate.toString(), detail.startTime);
        const timeLimit = addMinutes(serviceDateTime, 15);
  
        if (currentTime > timeLimit && !checkedInSteps.includes(index)) {
          onUpdateStatus(booking.id, index, 'canceled').then(success => {
            if (success) {
              booking.details[index].status = 'canceled';
              handleCascadeCancellation(index);
            }
          });
        }
      }
    });
  }, [currentTime, booking.details, checkedInSteps, onUpdateStatus]);

  // Booking Progress Calculations
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

  // Scheduling Handlers
  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    
    try {
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
        
        booking.details[nextStepIndex].reservedDate = selectedDate;
        booking.details[nextStepIndex].startTime = selectedTimeSlot;
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

  // Check-in Handler
  const handleCheckIn = async (bookingId: string, stepIndex: number, code: string) => {
    const success = await onCheckIn(bookingId, stepIndex, code);
    if (success) {
      setCheckedInSteps(prev => [...prev, stepIndex]);
      setCheckInTimes(prev => ({...prev, [stepIndex]: new Date()}));
    }
    return success;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-green-50">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-green-800">
                Chi tiết lịch hẹn 
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
                {booking.details.map((detail, index) => {
                  const detailStatus = getStepStatusConfig(detail.status);
                  const isActiveStep = currentStepIndex === index;
                  const isPastStep = index < currentStepIndex;
                  
                  const isStepCanceled = detail.status.toLowerCase() === 'canceled';
                  const isAfterCanceledStep = index > booking.details.findIndex(d => d.status.toLowerCase() === 'canceled');
                  
                  return (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg ${
                        isStepCanceled ? 'border-red-200 bg-red-50 opacity-60' : 
                        isPastStep ? 'border-gray-200 bg-gray-50' :
                        isActiveStep ? 'border-blue-200 bg-blue-50' : 
                        'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-3 ${
                            isStepCanceled ? 'bg-red-500 text-white' :
                            isPastStep ? 'bg-gray-500 text-white' :
                            isActiveStep ? 'bg-blue-500 text-white' : 
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {isStepCanceled ? <X className="h-5 w-5" /> : 
                             isPastStep ? <Check className="h-5 w-5" /> : (index + 1)}
                          </div>
                          <div>
                            <h4 className="font-medium">{detail.serviceDetailsName}</h4>
                            {detail.reservedDate && detail.startTime ? (
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Calendar className="h-4 w-4 mr-1" />
                                {format(new Date(detail.reservedDate), "dd/MM/yyyy", { locale: vi })}
                                <span className="mx-2">•</span>
                                <Clock className="h-4 w-4 mr-1" />
                                {detail.startTime} - {detail.startEnd}
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
                        </div>
                      </div>
                      
                      {isStepCanceled && isAfterCanceledStep && (
                        <div className="text-xs text-red-600 mt-2">
                          Bước này bị hủy do các bước trước bị hủy
                        </div>
                      )}
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingDetailView; 