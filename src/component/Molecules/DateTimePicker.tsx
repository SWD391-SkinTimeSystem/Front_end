import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DateTimePickerProps {
     onTimeChange: (time: string) => void;
     onDateChange: (date: string) => void;
}

const fixedTimeSlots = [
     "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
     "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];
const options = [
     { label: "Hết chỗ", value: "full", color: "bg-gray-300 text-gray-600" },
     { label: "Còn chỗ", value: "available", color: "bg-green-200 text-green-800" },
     { label: "Đang chọn", value: "selected", color: "bg-orange-500 text-white" },
];

const fetchWeekDays = () => {
     const today = new Date();
     return Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(today.getDate() + i);
          return {
               day: date.toLocaleDateString("vi-VN", { weekday: "long" }),
               date: date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })
          };
     });
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDateChange, onTimeChange }) => {
     const [weekDays] = useState(fetchWeekDays());
     const [selectedDate, setSelectedDate] = useState(weekDays[0].date);
     const [selectedTime, setSelectedTime] = useState<string | null>(null);
     return (
          <Card className="p-4">
               <div className="flex flex-row items-center mb-4">
               <h1 className="text-xl font-semibold mb-5">Chọn ngày giờ *</h1>
               {options.map((option) => (
        <Badge
          key={option.value}
          className={`px-3 py-1 px-2 mx-2 mb-3 rounded-full cursor-pointer ${option.color}`}
          // onClick={() => setSelected(option.value)}
        >
          {option.label}
        </Badge>
      ))}
               </div>
               
               <div className="flex items-center justify-between overflow-auto gap-2 w-full">
                    <Button variant="ghost" size="icon">
                         <ChevronLeft className="w-5 h-5" />
                    </Button>
                    {weekDays.map((day) => (
                         <button
                              key={day.date}
                              className={cn(
                                   "w-[150px] text-sm font-medium",
                                   selectedDate === day.date ? "bg-orange-500 text-white" : "bg-gray-200"
                              )}
                              onClick={() => {
                                   onDateChange(day.date)
                                   setSelectedDate(day.date)
                              }

                              }
                         >
                              {day.day} <br /> {day.date}
                         </button>
                    ))}
                    <Button variant="ghost" size="icon">
                         <ChevronRight className="w-5 h-5" />
                    </Button>
               </div>
               <div className="grid grid-cols-6 gap-2 mt-4">
                    {fixedTimeSlots.map((time) => (
                         <button
                              key={time}
                              className={cn(
                                   "px-3 py-2 border rounded-md",
                                   selectedTime === time ? "bg-orange-500 text-white" : "bg-gray-100"
                              )}
                              onClick={() => {
                                   setSelectedTime(time)
                                   onTimeChange(time)
                              }}
                         >
                              {time}
                         </button>
                    ))}
               </div>
               <Alert variant="destructive" className="my-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Thời gian không phù hợp</AlertTitle>
                    <AlertDescription>
                         Vui lòng chọn lại thời gian khác
                    </AlertDescription>
               </Alert>

          </Card>
     );
};

export default DateTimePicker;
