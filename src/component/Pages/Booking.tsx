import React from 'react';
import Stepper from '../Molecules/Stepper';
import { Clock } from 'lucide-react';
import {
     Carousel,
     CarouselContent,
     CarouselItem,
     CarouselNext,
     CarouselPrevious,
} from "@/components/ui/carousel"
import SkinTherapistCard from '../Molecules/SkinTherapistCard';
import { Button } from '@/components/ui/button';
import DateTimePicker from '../Molecules/DateTimePicker';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import PaymentMethods from '../Molecules/Payment';
import { motion } from 'framer-motion';
const Booking: React.FC = () => {
     const [showMessage, setShowMessage] = useState(false);
     const [currentStep, setCurrentStep] = useState(1);
     const [selectedTherapist, setSelectedTherapist] = useState(false);
     const [selectedDate, setSelectedDate] = useState('');
     const [selectedTime, setSelectedTime] = useState('');
     const [isOpen, setIsOpen] = useState(true);
     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
     const handleButtonClick = () => {
          setShowMessage(true);
          setCurrentStep(2);
     };
     const handleSelectTherapist = (status: boolean) => {
          setSelectedTherapist(status);
          console.log('Chuyên viên đã được chọn');
          console.log(selectedTherapist);
          setCurrentStep(2);
     }
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
     return (
          <div>
               {/* Thanh tiến trình  */}
               <div className='grid justify-items-end p-4 border shadow-md'>
                    <Stepper currentStep={currentStep} />
               </div>
               {/* Booking của tôi  */}
               <div className="m-5">
                    <h1 className="text-xl font-semibold mb-5">Dịch vụ đã chọn</h1>
                    <div
                         key={11} // Thêm key vào phần tử ngoài cùng
                         className="shadow-xl overflow-hidden transition-transform transform hover:translate-y-1"
                    >
                         <div className="flex m-5">
                              <img
                                   src="https://hasaki.vn/_next/image?url=https%3A%2F%2Fmedia.hcdn.vn%2Fcatalog%2Fproduct%2Fd%2Fu%2Fduong-da-trang-sang-cong-nghe-aqua-mesoderm-1700128205.jpg&w=640&q=75"
                                   alt="appointment.serviceName"
                                   className="w-[120px] h-[120px] rounded-[10px] object-cover"
                              />
                              <div className="pl-4 flex-1">
                                   <h3 className="text-base font-semibold text-gray-800 mb-1">
                                        Mesoderm Dưỡng Sáng Vitamin C-20% Vùng Mặt (Tây Ban Nha)

                                   </h3>

                                   <p className="flex items-center py-1 text-base text-gray-600">
                                        <Clock className="w-4 h-4 mr-1" />
                                        2 Giờ
                                   </p>
                                   <button
                                        className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-semibold text-blue-500 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                   >
                                        Xem chi tiết
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
               {/* Chọn chuyên viên  */}
               <div className='m-5'>
                    <div className='flex justify-between my-5'>
                         <h1 className="text-xl font-semibold mb-5">Chọn chuyên viên</h1> {showMessage && (
                              <p className="text-green-600 mt-2">
                                   Hệ thống sẽ chọn chuyên viên cho bạn, vui lòng chọn thời gian và hình thức thanh toán ở bước kế tiếp
                              </p>
                         )}
                         {!showMessage && !selectedTherapist && (
                              <Button className="bg-emerald-700 mt-2 justify-center" onClick={handleButtonClick}>
                                   Hãy xếp chuyên viên cho tôi
                              </Button>
                         )}
                    </div>
                    {selectedTherapist && (
                         <p className="text-green-600 mt-2">
                              Bạn đã chọn chuyên viên thành công. Vui lòng chọn thời gian và hình thức thanh toán ở bước kế tiếp.
                         </p>
                    )}
                    {!showMessage && !selectedTherapist && (
                         <div className='w-[95%] mx-auto'>
                              <Carousel>
                                   <CarouselContent>
                                        <CarouselItem className='basis-1/4'>
                                             <SkinTherapistCard onButtonClick={() => handleSelectTherapist(true)} />
                                        </CarouselItem>
                                        <CarouselItem className='basis-1/4'>
                                             <SkinTherapistCard onButtonClick={() => handleSelectTherapist(true)} />
                                        </CarouselItem>
                                        <CarouselItem className='basis-1/4'>
                                             <SkinTherapistCard onButtonClick={() => handleSelectTherapist(true)} />
                                        </CarouselItem>
                                        <CarouselItem className='basis-1/4'>
                                             <SkinTherapistCard onButtonClick={() => handleSelectTherapist(true)} />
                                        </CarouselItem>
                                        <CarouselItem className='basis-1/4'>
                                             <SkinTherapistCard onButtonClick={() => handleSelectTherapist(true)} />
                                        </CarouselItem>
                                        <CarouselItem className='basis-1/4'>
                                             <SkinTherapistCard onButtonClick={() => handleSelectTherapist(true)} />
                                        </CarouselItem>

                                   </CarouselContent>
                                   <CarouselPrevious />
                                   <CarouselNext />
                              </Carousel>

                         </div>
                    )}
                    {selectedTherapist && (
                         <div className='gap-2'>
                              <Card className="w-full border border-gray-200 rounded-none mt-5">
                                   <div className='flex flex-row'>
                                        <div className="p-5">
                                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasA2pIuXSoyfPGdEt31yg6uLf8549ghjqEg&s" alt="" />

                                        </div>
                                        <CardContent className="p-5">

                                             <h2 className="text-lg font-semibold text-gray-900">
                                                  Dương Ngọc Thúy Hoa
                                             </h2>
                                             <p className="text-sm text-gray-600 mt-2 mb-1">
                                                  Bác sĩ đã có 10 năm kinh nghiệm trong việc làm đẹp và tư vấn thẩm mỹ
                                             </p>
                                             <div className="flex items-center mt-2">
                                                  <span className="text-yellow-500">★★★★★</span>
                                                  <span className="text-gray-600 text-sm ml-2">14 đánh giá | 68 Hỏi đáp</span>
                                             </div>
                                             <div className="flex gap-2 mt-4">
                                                  <Dialog>
                                                       <DialogTrigger>
                                                            <Button variant="link">Xem Certificate</Button>
                                                       </DialogTrigger>
                                                       <DialogContent>
                                                            <DialogHeader>
                                                                 <DialogTitle>Mô tả Certificate</DialogTitle>
                                                                 <DialogDescription>
                                                                      <img
                                                                           src="https://thiepmung.com/uploads/worigin/2022/04/16/lam-giay-chung-nhan-thanh-tich-dep-nhat_9c193.jpg"
                                                                           alt="Aqua Mesoderm"
                                                                           className="rounded-lg shadow-lg w-full max-w-xl"
                                                                      />
                                                                 </DialogDescription>
                                                            </DialogHeader>
                                                       </DialogContent>
                                                  </Dialog>
                                                  <Button className="bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-md" onClick={() => handleSelectTherapist(false)}>
                                                       Đổi chuyên viên
                                                  </Button>
                                             </div>
                                        </CardContent>
                                   </div>
                              </Card>
                         </div>
                    )}

               </div>

               {/* chọn lịch  */}
               <div className='m-5'>
                    <DateTimePicker onDateChange={handleSelectedDate} onTimeChange={handleSelectedTime} />
               </div>
               {/* Hiển thị số tiền cần thanh toán cho dịch vụ  */}
               <div className='m-5'>
               <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <strong>Cần đặt cọc:</strong>
            <span className="text-lg font-bold text-emerald-700">
              34.000đ
            </span>
          </div>
                    <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                         transition={{ duration: 0.3 }}
                         className="overflow-hidden"
                    >
                         <div className="mt-2 p-4 bg-gray-100 rounded-lg shadow-inner">
                              <p className="flex justify-between">
                                   <span>Tổng tiền:</span>
                                   <span>340.000đ</span>
                              </p>
                              <p className="flex justify-between">
                                   <span>Voucher giảm:</span>
                                   <span>40.000đ</span>
                              </p>
                              <p className="flex justify-between">
                                   <span>Cần phải cọc:</span>
                                   <span>34.000đ (10% số tiền)</span>
                              </p>
                              <p className="flex justify-between text-emerald-700 font-bold border-t pt-2 mt-2">
                                   <span>Cần thanh toán:</span>
                                   <span>34.000đ</span>
                              </p>
                         </div>
                    </motion.div>
                    </div>
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
                         <Button className="bg-emerald-700">
                              Thanh Toán
                         </Button>
                    </div>
               </div>
          </div>
     );
};

export default Booking;