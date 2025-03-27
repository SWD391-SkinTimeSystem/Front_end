import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronDown } from "lucide-react";
import { BookingDetail } from "@/types/booking";
import { bookingService } from "@/services/bookingCusService";
import { formatDateTime, getStatusLabel, isDateInNext7Days, isWithin48Hours } from "@/lib/utils";
import FeedbackModal from "../Molecules/Feedback";
import RescheduleCalendar from "../Molecules/RescheduleCalendar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useTherapist } from "@/hooks/useTherapist";
import { is } from "date-fns/locale";
import { useAvailability } from "@/hooks/useSchedule";
import { toast } from "react-toastify";

const BookingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [bookingDetail, setBookingDetail] = useState<BookingDetail | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [openCancelModel, setOpenCancelModel] = useState(false);
  const [step, setStep] = useState({
    scheduleId: "",
    reservedDate: new Date()
  });
  const [notify, setNotify] = useState('');
  const navigate = useNavigate();
  const { schedule, IsTherapistloading, fetchTherapistAvailability } = useTherapist(1, 11);
  const { doSchedule, data, isLoading, error } = useAvailability();
  const [flat, setFlat] = useState(false);
  console.log(bookingDetail)
  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        const data = await bookingService.getBookingDetail(id!);
        setBookingDetail(data);
      } catch (err) {
        console.error("Error fetching booking detail:", err);
      }
    };
    fetchBookingDetail();
  }, [id, flat]);
  console.log(bookingDetail);
  useEffect(() => {
    console.log(bookingDetail?.therapistId);
    fetchTherapistAvailability(bookingDetail?.therapistId);
  }, [bookingDetail, flat]);
  console.log(schedule);
  if (IsTherapistloading) {
    return <div>Loading...</div>;
  }
  const handleSelectedTime = (time: string) => {
    setSelectedTime(time);
    console.log('Giờ đã được chọn');
    console.log(selectedTime);
  }
  const handleSelectedDate = (date: string) => {
    setSelectedDate(date);
    console.log('Ngày đã được chọn');
    setSelectedTime(""); // Reset giờ khi đổi ngày
  }
  if (!bookingDetail) {
    return (
      <div className="p-5 text-center text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  }
  const cancel = () => {
    console.log(bookingDetail.transactionId);
    setOpenCancelModel(false);
  }
  // const twoDaysAgo = new Date();
  // twoDaysAgo.setDate(twoDaysAgo.getDate() + 2);
  const triggerReschedule = (scheduleId: string, reservedDate: Date) => {
    setOpen(true);
    setStep((prev) => ({ ...prev, scheduleId, reservedDate }));
  }
  const handleReschedule = async () => {
    if (selectedDate === "" || selectedTime === "") {
      setNotify('Vui lòng chọn ngày và giờ hẹn');
      return;
    }
    var data = {
      idSchedule: step.scheduleId,
      date: selectedDate,
      timeStart: `${selectedTime}:00`
    }
    const response = await doSchedule(data);
    if (response.success) {
      setNotify('');
      toast.success('Đổi lịch thành công');
      setFlat(!flat);
      setOpen(false);
    }
  };
  return (
    <div className="w-full p-6 bg-white">
      <h2 className="font-semibold pl-4 border-l-4 border-emerald-700 text-xl mb-5">
        Chi tiết lịch hẹn
      </h2>
      <div className="p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row mb-4">
          <img
            src={bookingDetail.thumbnail || "https://via.placeholder.com/150"}
            alt={bookingDetail.serviceName}
            className="w-40 h-40 object-cover rounded-lg shadow-md mr-4"
          />
          <div className="flex-1">
            <p className="text-xl font-semibold">
              {bookingDetail.serviceName}
            </p>
            <p>
              <strong>Chuyên viên:</strong> {bookingDetail.therapistName}
            </p>
            <p>
              <strong>Trạng thái:</strong> {getStatusLabel(bookingDetail.status)}
            </p>
            {/* <p>
              <strong>Mã checkin:</strong> {bookingDetail.checkInCode}
            </p> */}
            <p className="mt-2 text-gray-600">
              {bookingDetail.description}
            </p>
          </div>
        </div>

        <p>
          <strong>Ngày giờ thực hiện:</strong>{" "}
          {formatDateTime(bookingDetail.details[0]?.reservedDate)} -{" "}
          {/* {formatDateTime(
            bookingDetail.details[bookingDetail.details.length - 1]?.startEnd
          )} */}
          {bookingDetail.details[0]?.startTime}
        </p>
        {bookingDetail.status === "NotStarted" && (
          <div className="grid place-items-end mt-4">
            <Button variant="secondary" onClick={() => setOpenCancelModel(true)} className="bg-red-600 text-white hover:bg-red-700">
              Hủy lịch
            </Button>
          </div>
        )}
        {bookingDetail.status === "Completed" && (
          <div className="grid place-items-end mt-4">
            {/* <Button
                className="bg-emerald-700 text-white"
                onClick={() =>
                  navigate(`/account/feedback/${bookingDetail.id}`)
                }
              >
                Feedback: Đánh giá chung & chi tiết dịch vụ
              </Button> */}
            <FeedbackModal BookingId={bookingDetail.id} TherapistName={bookingDetail.therapistName} />
          </div>
        )}
        <div className="mt-4 border-t pt-4">

          <div className="relative pl-8 border-l-2 border-dotted border-emerald-500">
            {bookingDetail.details.map((step, index) => (
              <div key={index} className="mb-6 relative">
                <div className="absolute -left-4 top-1 bg-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md">
                  <CheckCircle size={16} />
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <p className="font-semibold text-lg">
                    {step.serviceDetailsName} | {getStatusLabel(step.status)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Ngày hẹn: {formatDateTime(step.reservedDate)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Thời gian: {step.startTime} -{" "}
                    {step.startEnd}
                  </p>
                  <p className="mt-2 text-gray-600">
                    {step?.description}
                  </p>

                  {isDateInNext7Days(new Date(step.reservedDate)) ? (
                    step.status === "NotStarted" && bookingDetail.status === "NotStarted" ? (
                      <Button
                        className="mt-2 bg-emerald-700 text-white"
                        onClick={() => triggerReschedule(step.scheduleID, step.reservedDate)}
                      >
                        Đổi lịch
                      </Button>
                    ) : null
                  ) : (
                    <p className="text-red-500 mt-2">
                      Bạn chỉ được đổi lịch trong vòng 7 ngày trước ngày hẹn / và chỉ được đổi một lần duy nhất
                    </p>
                  )}
                  {/* <Button className="mt-2 bg-emerald-700 text-white">
                      Đổi lịch
                    </Button> */}
                  {/* 
                        {step.status === "NotStarted" && bookingDetail.status === "NotStarted" && (
                          <Button className="mt-2 bg-emerald-700 text-white">
                            Đổi lịch
                          </Button>
                        )} */
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Reschedule model  */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent className="max-w-[1500px] w-full mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Đổi lịch hẹn</DialogTitle>
            <DialogDescription>
              <p>Lưu ý: Bạn chỉ đổi theo lịch rãnh của người phụ trách trị liệu cho bạn.</p>
              {notify!=='' &&
              <p className="text-lg font-semibold text-red-600 bg-red-100 border border-red-500 p-3 rounded-lg shadow-md">
              {notify}
            </p> 
              }
              <p>
                <strong>Chuyên viên:</strong> {bookingDetail.therapistName}
              </p>
            </DialogDescription>
          </DialogHeader>
          <RescheduleCalendar scheduleId={step.scheduleId} reservedDate={step.reservedDate} onTimeChange={handleSelectedTime} onDateChange={handleSelectedDate} availableTime={schedule?.availability} />
          <DialogFooter>
            <Button className="mt-2 bg-emerald-700 text-white" onClick={handleReschedule}>
              Đổi lịch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel schedule model  */}
      <Dialog open={openCancelModel} onOpenChange={setOpenCancelModel}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Hủy lịch hẹn</DialogTitle>
            <DialogDescription>
              <h1>
              💡 Lưu ý:
              </h1>
              <p>Nếu khách hàng hủy trong vòng 48 giờ trước khi bắt đầu, họ sẽ không được hoàn tiền.</p>
              <p>Nếu khách hàng hủy trước hơn 48 giờ, họ sẽ được hoàn tiền.</p>
              <p> Sau khi kiểm tra, bạn 
                
                sẽ
                {isWithin48Hours(new Date(step.reservedDate)) ? " không " : " có thể "} được hoàn tiền vì hủy lịch.</p>
                  
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="mt-2 bg-red-600 text-white" onClick={cancel}>
              Hủy lịch
              </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingDetailPage;
