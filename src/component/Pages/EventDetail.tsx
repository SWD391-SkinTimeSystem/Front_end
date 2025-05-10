import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import PaymentMethods from "../Molecules/Payment";
import type { EventDetail } from "@/types/event";
import { useParams } from "react-router-dom";
import { useEventDetail } from "@/hooks/useEvent";
import useCreateTicket  from "@/hooks/useTicket";
import { Ticket } from "@/types/ticket";


export default function EventDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { eventDetail, loading, error } = useEventDetail(id);
  console.log(id);
  const { createTicket, ticket, error1 } = useCreateTicket();
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
  successCallbackUrl: "https://example.com/success",
  failureCallbackUrl: "https://example.com/failure",
};

  const handlePayment = async () => {
   
    console.log(JSON.stringify(ticketData));
    await createTicket(ticketData);
    console.log(ticket);
    window.location.href = ticket;
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
        <p className="text-lg font-semibold">{eventDetail?.date}</p>
        <p className="text-gray-500">{eventDetail?.location}</p>
        <p className="mt-4">{eventDetail?.content}</p>
        <div className="mt-4">
          <p>
            <strong>Total Tickets:</strong> {eventDetail?.total_ticket_amount}
          </p>
          <p>
            <strong>Available Tickets:</strong> {eventDetail?.available_ticket}
          </p>
          <p>
            <strong>Ticket Price:</strong> ${eventDetail?.ticket_price}
          </p>
          <p>
            <strong>Event Status:</strong> {eventDetail?.event_status}
          </p>
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <strong>Còn cần thanh toán:</strong>
            <span className="text-lg font-bold text-emerald-700">
              {remainingPayment} đ
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
                <span>{eventDetail?.ticket_price}đ</span>
              </p>
              <p className="flex justify-between text-emerald-700 font-bold border-t pt-2 mt-2">
                <span>Cần thanh toán:</span>
                <span>{remainingPayment} đ</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className='m-5'>
                    <PaymentMethods onPaymentMethodChange={handleSelectPaymentMethod} />
               </div>
               {/* Button thanh toán  */}
               <div className="grid place-items-end m-5">
                    <div className="flex gap-5">
                         <Button variant="secondary" className="text-emerald-700" onClick={() => window.history.back()}>
                              Hủy
                         </Button>
                         <Button onClick={handlePayment} className="bg-emerald-700">
                              Thanh Toán
                         </Button>
                    </div>
               </div>
    </div>
  );
}
