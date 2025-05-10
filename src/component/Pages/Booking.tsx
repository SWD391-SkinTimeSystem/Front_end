import React, { useEffect } from 'react';
import Stepper from '../Molecules/Stepper';
import { Button } from '@/components/ui/button';
import DateTimePicker from '../Molecules/DateTimePicker';
import { useState } from 'react';
import PaymentMethods from '../Molecules/Payment';
import { useTherapist } from '@/hooks/useTherapist';
import ServicePaymentAmount from '../Molecules/ServicePaymentAmount';
import SkinTherapistList from '../Molecules/SkinTherapistList';
import BookingServiceInfoCard from '../Molecules/BookingServiceInfoCard';
import SkinTherapistDetail from '../Molecules/SkinTherapistDetail';
import { formatDate, formatHour, hoursToMinutes } from '@/lib/utils';
import { useBooking } from '@/hooks/useBooking';
import { BookingType } from '@/types/booking';

const Booking: React.FC = () => {
     const [showMessage, setShowMessage] = useState(false);
     const [currentStep, setCurrentStep] = useState(1);
     const [selectedTherapist, setSelectedTherapist] = useState('');
     const [selectedDate, setSelectedDate] = useState('');
     const [selectedTime, setSelectedTime] = useState('');
     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
     const [disable, setDisable] = useState(true);
     const [service, setService] = useState('');
     const { createBooking, isLoading, berror } = useBooking();

     const [CheckAvailableByDate, setCheckAvailableByDate] = useState(false);

     const [PaymentType, setPaymentType] = useState('');
     const handleSelectedDate = (date: string) => {
          setSelectedDate(date);
          console.log('Ngày đã được chọn');
          console.log(selectedDate);
          setCurrentStep(3);
     }
     const handleSelectedTime = (time: string) => {
          setSelectedTime(time);
          console.log('Giờ đã được chọn');
          console.log(selectedTime);
          setCurrentStep(3);
     }
     const handleSelectPaymentMethod = (method: string) => {
          setSelectedPaymentMethod(method);
          console.log('Hình thức thanh toán đã được chọn');
          console.log(selectedPaymentMethod);
          setCurrentStep(4);
     }
     const setSkinTherapistId = (id: string, disable: boolean) => {
          setSelectedTherapist(id);
          setPaymentType('ChooseTherapist');
          setDisable(disable);
          console.log(id);

     }
     const handleSelectRandomTherapist = () => {
          setDisable(false);
          setCheckAvailableByDate(true);
          setPaymentType('RandomTherapist');
          setSelectedTherapist('');
          setShowMessage(true);
          setCurrentStep(2);
     }
     const handleBackToSelect = () => {
          setShowMessage(false);
          setSelectedTherapist('');
          setPaymentType('ChooseTherapist');
          setDisable(true);
          setCurrentStep(1);
     }
     // cho đại 2 giờ đi tạy service sẽ lấy ở đây chứ không phải lấy trong đó. 
     // test thử lấy dữ liệu ra được không . 
     const { therapists, submitTherapist, schedule, loading, error, fetchAvailableTherapist, fetchTherapistAvailability } = useTherapist();
     useEffect(() => {

          console.log("selectedTherapist changed:", selectedTherapist);

          fetchTherapistAvailability(selectedTherapist);

     }, [selectedTherapist]);

     if (loading) {
          return <h1>Loading...</h1>;
     }
     if (error) {
          return <h1>{error}</h1>;
     }
     //lấy từ eventDetail xuống 
     console.log(selectedTherapist);
     console.log(schedule);

     console.log(formatDate(selectedDate), formatHour(selectedTime));
     // useEffect(() => {
     //      fetchTherapistAvailability()
     // }, [selectedDate, selectedTime]);
     const therapistDetail = therapists.find((therapist) => therapist.id === selectedTherapist);
     const fetchDataByDate = async () => {
          try {
               const therapistId = await fetchAvailableTherapist(
                    formatDate(selectedDate),
                    formatHour(selectedTime),
                    hoursToMinutes(2)
               ); 
               const newBookingData: BookingType = {
                    serviceId: "08dd5ebe-4937-452d-8853-4af0f4e0a2ed",
                    serviceDate: selectedDate,
                    serviceHour: formatHour(selectedTime),
                    therapistId: therapistId,
                    returnURL: "http://localhost:5173/payment/success",
                    voucherCode: '',
                    failureURL: "http://localhost:5173/payment/fail",
                    paymentMethod: selectedPaymentMethod,
                };
                console.log("Booking Data:", JSON.stringify(newBookingData));

                const response = await createBooking(newBookingData); // Gọi ngay thay vì chờ state cập nhật
                if (response.success) {
                    window.location.href = response.data; // Chuyển hẳn sang trang mới
               } else {
                    console.error("Booking failed:", response.message);
                }
               
          } catch (error) {
               console.error("Error fetching available therapist:", error);
          }
     }
     const handleBooking = async () => {
          const newBookingData: BookingType = {
               serviceId: "08dd5ebe-4937-452d-8853-4af0f4e0a2ed",
               serviceDate: selectedDate,
               serviceHour: formatHour(selectedTime),
               therapistId: selectedTherapist,
               returnURL: "http://localhost:5173/payment/success",
               voucherCode: '',
               failureURL: "http://localhost:5173/payment/fail",
               paymentMethod: selectedPaymentMethod,
           };
           console.log("Booking Data:",JSON.stringify(newBookingData));

           const response = await createBooking(newBookingData);
           if (response.success) {
               window.location.href = response.data; // Chuyển hẳn sang trang mới
          } else {
               console.error("Booking failed:", response.message);
           }
     }



     console.log(PaymentType);
     console.log(submitTherapist);

     // console.log(bookingData);
     return (
          <div>
               {/* Thanh tiến trình  */}
               <div className='grid justify-items-end p-4 border shadow-md'>
                    <Stepper currentStep={currentStep} />
               </div>
               {/* Booking của tôi  */}
               <div className="m-5">
                    <BookingServiceInfoCard />
               </div>
               {/* Chọn chuyên viên  */}
               <div className='m-5'>
                    <div className='flex justify-between my-5'>
                         <h1 className="text-xl font-semibold mb-5">Chọn chuyên viên</h1> {showMessage && (
                              <div className='flex flex-row justify-between my-5'>
                                   <p className="text-green-600 text-left mt-2 mr-5">
                                        Hệ thống sẽ chọn chuyên viên cho bạn, vui lòng chọn thời gian và hình thức thanh toán ở bước kế tiếp
                                   </p>
                                   <Button onClick={() => handleBackToSelect()} className="bg-emerald-700">
                                        Tôi muốn chọn lại
                                   </Button>
                              </div>
                         )}
                         {!showMessage && !selectedTherapist && (
                              <Button className="bg-emerald-700 mt-2 justify-center" onClick={() => handleSelectRandomTherapist()}>
                                   Hãy xếp chuyên viên cho tôi
                              </Button>
                         )}
                    </div>
                    {selectedTherapist && (
                         <>
                              <p className="text-green-600 mt-2">
                                   Bạn đã chọn chuyên viên thành công. Vui lòng chọn thời gian và hình thức thanh toán ở bước kế tiếp.
                              </p>
                              <SkinTherapistDetail
                                   changeTherapist={() => {
                                        setSelectedTherapist('')
                                        setDisable(true)
                                   }}
                                   therapistId={therapistDetail} />
                         </>

                    )}
                    {!showMessage && !selectedTherapist && (
                         <SkinTherapistList onData={setSkinTherapistId} therapists={therapists} />
                    )}
               </div>

               {/* chọn lịch  */}
               <div className='m-5'>
                    <DateTimePicker checkAvailabelByDate={CheckAvailableByDate} disable={disable} availableTime={schedule?.availability} onDateChange={handleSelectedDate} onTimeChange={handleSelectedTime} />
               </div>
               {/* Hiển thị số tiền cần thanh toán cho dịch vụ  */}
               <div className='m-5'>
                    <ServicePaymentAmount amount={340000} />
               </div>
               {/* Chọn hình thức thanh toán  */}
               <div className='m-5'>
                    <PaymentMethods onPaymentMethodChange={handleSelectPaymentMethod} />
               </div>
               {/* Button thanh toán  */}
               <div className="grid place-items-end m-5">
                    <div className="flex gap-5">
                         <Button variant="secondary" className="text-emerald-700">
                              Hủy
                         </Button>
                         <Button className="bg-emerald-700"
                              onClick={PaymentType === "ChooseTherapist" ? handleBooking : fetchDataByDate}
                         >
                              Thanh Toán
                         </Button>
                    </div>
               </div>
          </div>
     );
};

export default Booking;