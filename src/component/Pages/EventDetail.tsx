import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PaymentMethods from "../Molecules/Payment";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
  eventStatus: string;
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id as string, 10);
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    useEffect(() => {
      fetch("/events.json")
        .then((res) => res.json())
        .then((data) => setEvents(data));
    }, []);

  const event = events.find((event) => event.id === id);
  
  if (isNaN(eventId)) {
    // xử lý trường hợp id không phải số
    return <div>Invalid event ID</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  const remainingPayment = event.ticketPrice;

  const handleSelectPaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
    console.log('Hình thức thanh toán đã được chọn');
    console.log(selectedPaymentMethod);
}

  return (
    <div className="p-4">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-80 object-cover rounded-lg"
      />
      <div className="p-4 border-b">
        <h1 className="text-lg font-bold">{event.title}</h1>
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold">{event.date}</p>
        <p className="text-gray-500">{event.location}</p>
        <p className="mt-4">{event.description}</p>
        <div className="mt-4">
          <p>
            <strong>Total Tickets:</strong> {event.totalTickets}
          </p>
          <p>
            <strong>Available Tickets:</strong> {event.availableTickets}
          </p>
          <p>
            <strong>Ticket Price:</strong> ${event.ticketPrice}
          </p>
          <p>
            <strong>Event Status:</strong> {event.eventStatus}
          </p>
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <strong>Còn cần thanh toán:</strong>
            <span className="text-lg font-bold text-emerald-700">
              {remainingPayment.toLocaleString("vi-VN")} đ
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
                <span>{event.ticketPrice.toLocaleString("vi-VN")} đ</span>
              </p>
              <p className="flex justify-between text-emerald-700 font-bold border-t pt-2 mt-2">
                <span>Cần thanh toán:</span>
                <span>{remainingPayment.toLocaleString("vi-VN")} đ</span>
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
                         <Button className="bg-emerald-700">
                              Thanh Toán
                         </Button>
                    </div>
               </div>
    </div>
  );
}
