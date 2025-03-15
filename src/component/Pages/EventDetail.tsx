import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import PaymentMethods from "../Molecules/Payment";
import type { EventDetail } from "@/types/event";
import { useParams } from "react-router-dom";
import { useEventDetail } from "@/hooks/useEvent";
import useCreateTicket from "@/hooks/useTicket";
import { Ticket } from "@/types/ticket";
import { formatCurrency, formatEventDate } from "@/lib/utils";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
export default function EventDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { eventDetail, loading, error } = useEventDetail(id);
  console.log(id);
  const { createTicket, tickets, error1 } = useCreateTicket();
  const remainingPayment = eventDetail?.ticket_price;
  console.log(eventDetail);
  const handleSelectPaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
    console.log('Hình thức thanh toán đã được chọn');
  }
  const ticketData: Ticket = {
    eventId: id,
    price: eventDetail?.ticket_price,
    paymentMethod: selectedPaymentMethod,
    totalAmount: "1",
    successCallbackUrl: "http://localhost:5173/payment/success",
    failureCallbackUrl: "http://localhost:5173/payment/fail",
  };

  const handlePayment = async () => {
    console.log(JSON.stringify(ticketData));
    const response = await createTicket(ticketData); // Gọi ngay thay vì chờ state cập nhật
    if (response.success) {
      window.location.href = response.data; // Chuyển hẳn sang trang mới
    } else {
      console.error("Booking failed:", response.message);
    }

  };

  return (
    <div className="p-4">
      <img
        src={eventDetail?.image}
        alt={eventDetail?.title}
        className="w-full h-80 object-cover rounded-lg"
      />
      <div className="p-4 border-b">
        <h1 className="text-lg font-bold">{eventDetail?.title}</h1>
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold">{formatEventDate(eventDetail?.date)}</p>
        <p className="text-lg font-semibold">{eventDetail?.end_time}</p>
        <p className="mt-4">{eventDetail?.content}</p>
        <div className="mt-4">
          <p>
            <strong>Số lượng vé:</strong> {eventDetail?.total_ticket_amount}
          </p>
          <p>
            <strong>Vé còn lại:</strong> {eventDetail?.available_ticket}
          </p>
          <p>
            <strong>Giá trên mỗi vé:</strong> {formatCurrency(eventDetail?.ticket_price)}
          </p>
          <p>
            <strong>Địa điểm :</strong> {eventDetail?.location}
          </p>
          {/* <p>
            <strong>Event Status:</strong> {eventDetail?.event_status}
          </p> */}
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <strong>Còn cần thanh toán:</strong>
            <span className="text-lg font-bold text-emerald-700">
              {formatCurrency(remainingPayment)}
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
                <span>Giá vé:</span>
                <span>{formatCurrency(eventDetail?.ticket_price)}</span>
              </p>
              <p className="flex justify-between text-emerald-700 font-bold border-t pt-2 mt-2">
                <span>Cần thanh toán:</span>
                <span>{formatCurrency(remainingPayment)}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className='m-5 grid place-items-end'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-emerald-700 text-white">Chọn phương thức thanh toán</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              {/* <DialogTitle>Share link</DialogTitle> */}
              {/* <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription> */}
            </DialogHeader>
            <PaymentMethods onPaymentMethodChange={handleSelectPaymentMethod} />

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button className="bg-emerald-700 text-white" type="button" onClick={handlePayment} variant="secondary">
                  Thanh Toán
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* Button thanh toán  */}
      {/* <div className="grid place-items-end m-5">
        <div className="flex gap-5">
          <Button variant="secondary" className="text-emerald-700" onClick={() => window.history.back()}>
            Hủy
          </Button>
          <Button  >
          </Button>
        </div>
      </div> */}
    </div>
  );
}
