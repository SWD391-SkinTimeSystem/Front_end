import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Availability } from "@/types/schedule";
import { useAvailability } from "@/hooks/useSchedule";

interface DateTimePickerProps {
     onTimeChange: (time: string) => void;
     onDateChange: (date: string) => void;
     disable?: boolean;
     availableTime?: Availability;
     checkAvailabelByDate: boolean;
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

// const fetchWeekDays = () => {
//      const today = new Date();
//      return Array.from({ length: 7 }, (_, i) => {
//           const date = new Date();
//           date.setDate(today.getDate() + i);
//           return {
//                day: date.toLocaleDateString("vi-VN", { weekday: "long" }),
//                date: date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })
//           };
//      });
// };
const fetchWeekDays = () => {
     const today = new Date();
     return Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(today.getDate() + i);
          return {
               day: date.toLocaleDateString("vi-VN", { weekday: "long" }),
               date: date.toISOString().split('T')[0]  // This gives YYYY-MM-DD format
          };
     });
};
const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDateChange, onTimeChange, availableTime, disable, checkAvailabelByDate }) => {
     const [weekDays] = useState(fetchWeekDays());
     const [selectedDate, setSelectedDate] = useState(weekDays[0].date);
     const [selectedTime, setSelectedTime] = useState<string | null>(null);
     const { data, isLoading, error } = useAvailability(checkAvailabelByDate, selectedDate) // Gọi hook khi checkAvailabelByDate = true
     // gọi slot rãnh theo ngày ;
     // giờ là load ngày theo chuyên viên hay là load ngày theo date \
     const availableSlots = availableTime?.[selectedDate] ?? {}; // Tránh lỗi undefined
     // nếu không có availableSlot thì sẽ hiển thị theo data.data[timetime]
     console.log(data)
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
                         <Button disabled={disable}
                              key={day.date}
                              className={cn( 
                                   "w-[150px] text-sm font-medium py-5",
                                   selectedDate === day.date ? "bg-orange-500" : "bg-gray-200"
                              )}
                              onClick={() => {
                                   onDateChange(day.date)
                                   setSelectedDate(day.date)
                              }}
                         >
                              {day.day} <br />
                         </Button>
                    ))}
                    <Button variant="ghost" size="icon">
                         <ChevronRight className="w-5 h-5" />
                    </Button>
               </div>
               <div className="grid grid-cols-6 gap-2 mt-4">
                    {fixedTimeSlots.map((time) => {
                         // Kiểm tra xem slot có rảnh không (tránh lỗi khi availableTime[selectedDate] undefined)
                         const isAvailable = availableTime?.[selectedDate]?.[time + ":00"]
                              ?? data?.data?.[time + ":00"]
                              ?? false; return (
                                   <Button
                                        disabled={disable} // Không cho phép chọn slot bận
                                        key={time}
                                        className={cn(
                                             "px-3 py-2 border rounded-md",
                                             isAvailable
                                                  ? (selectedTime === time ? "bg-green-700 text-white" : "bg-green-200 text-green-800")
                                                  : "cursor-not-allowed"
                                        )}
                                        onClick={() => {
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

export default DateTimePicker;
