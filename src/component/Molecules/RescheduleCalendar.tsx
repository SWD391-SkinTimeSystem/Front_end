import { useState } from "react";
import { cn, getFormattedDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Availability } from "@/types/schedule";

interface DateTimePickerProps {
     onTimeChange: (time: string) => void;
     onDateChange: (date: string) => void;
     availableTime?: Availability;
     reservedDate: Date;
     scheduleId: string
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

const fetchWeekDays = (reservedDate: Date) => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 6); // Giới hạn đến 7 ngày sau

  const days = [];
  let currentDate = new Date(reservedDate); // Bắt đầu từ reservedDate

  while (currentDate <= maxDate) {
      days.push({
          day: currentDate.toLocaleDateString("vi-VN", { weekday: "long" }),
          date: currentDate.toISOString().split("T")[0], // YYYY-MM-DD
      });

      currentDate.setDate(currentDate.getDate() + 1); // Tăng 1 ngày
  }

  return days;
};

const RescheduleCalendar: React.FC<DateTimePickerProps> = ({ onDateChange, onTimeChange, availableTime, reservedDate, scheduleId}) => {
     const [weekDays] = useState(fetchWeekDays(reservedDate));
     const [selectedDate, setSelectedDate] = useState(weekDays[0].date);
     const [selectedTime, setSelectedTime] = useState<string | null>(null);
     // gọi slot rãnh theo ngày ;
     // giờ là load ngày theo chuyên viên hay là load ngày theo date \
     const availableSlots = availableTime?.[selectedDate] ?? {}; // Tránh lỗi undefined
     // nếu không có availableSlot thì sẽ hiển thị theo data.data[timetime]
     console.log(availableSlots)
     console.log(selectedDate)
      console.log(scheduleId)
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
                   
                    {weekDays.map((day) => (
                         <Button 
                              key={day.date}
                              className={cn( 
                                   "w-[150px] text-sm font-medium py-5 hover:bg-orange-500 hover:text-white",
                                   selectedDate === day.date ? "bg-orange-500" : "bg-blue-200 text-blue-800"
                              )}
                              onClick={() => {
                                   onDateChange(day.date)
                                   setSelectedDate(day.date)
                              }}
                         >
                              {day.day}<br />
                         </Button>
                    ))}
                   
               </div>
               <div className="grid grid-cols-6 gap-2 mt-4">
                    {fixedTimeSlots.map((time) => {
                         // Kiểm tra xem slot có rảnh không (tránh lỗi khi availableTime[selectedDate] undefined)
                         const isAvailable = availableTime?.[selectedDate]?.[time + ":00"] ?? false;
                              return (
                                   <Button
                                   disabled={!isAvailable} // Chặn cả khi disable=true hoặc slot bận
                                   key={time}
                                   className={cn(
                                       "px-3 py-2 border rounded-md hover:bg-orange-500 hover:text-white",
                                       !isAvailable
                                           ? "bg-gray-300 text-gray-600 cursor-not-allowed" // Slot bận
                                           : selectedTime === time
                                               ? "bg-orange-500 text-white" // Slot được chọn
                                               : "bg-green-200 text-green-800" // Slot rảnh
                                   )}
                                   onClick={!isAvailable ? undefined : () => {
                                       setSelectedTime(time);
                                       onTimeChange(time);
                                   }}
                               >
                                   {time}
                               </Button>
                               
                              );
                    })}
               </div>
          </Card>
     );
};

export default RescheduleCalendar;
