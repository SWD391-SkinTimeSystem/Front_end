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
    const response = await createTicket(ticketData);
    if (response.success) {
      window.location.href = response.data;
    } else {
      console.error("Booking failed:", response.message);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-80 overflow-hidden">
          <img
            src={eventDetail?.image}
            alt={eventDetail?.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">{eventDetail?.title}</h1>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-lg text-gray-600">
                <strong>🗓 Ngày diễn ra:</strong> {formatEventDate(eventDetail?.date)}
              </p>
              <p className="text-lg text-gray-600">
                <strong>🕒 Giờ kết thúc:</strong> {eventDetail?.end_time}
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-600">
                <strong>📍 Địa điểm:</strong> {eventDetail?.location}
              </p>
            </div>
          </div>

          <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: eventDetail?.content ?? "" }} />

          <div className="grid md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <p><strong>Số lượng vé:</strong> {eventDetail?.total_ticket_amount}</p>
              <p><strong>Vé còn lại:</strong> {eventDetail?.available_ticket}</p>
            </div>
            <div>
              <p><strong>Giá trên mỗi vé:</strong> {formatCurrency(eventDetail?.ticket_price)}</p>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <div 
              className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded" 
              onClick={() => setIsOpen(!isOpen)}
            >
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

          <div className="mt-6">
            <PaymentMethods onPaymentMethodChange={handleSelectPaymentMethod} />
            <Button 
              className="w-full mt-4" 
              style={{ backgroundColor: '#326e51' }}
              type="button" 
              onClick={handlePayment}
            >
              Thanh Toán
            </Button>
          </div>
        </div>
      </div>
      
      {/* Existing commented sections preserved */}
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