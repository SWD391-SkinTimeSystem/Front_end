import { useNavigate } from "react-router-dom";
import { Event } from "@/types/event";

interface ListEventsProps {
     events: Event[];
   }


export default function EventList ({events = []}: ListEventsProps) {
  const navigate = useNavigate();
  console.log("Events in EList:", events);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Sự kiện sắp diễn ra</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.event_id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600">{event.description}</p>
              <p className="mt-2 text-gray-500">
                🗓 {event.start_date.toString()} - 🕒 {event.start_time}
              </p>
              <p className="text-gray-500">📍 {event.location}</p>
              <p className="mt-2 font-bold text-green-600">💰 {event.price.toLocaleString()}đ</p>
              <button 
                className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                onClick={() => navigate(`/event-detail/${event.event_id}`)}
              >
                Mua vé ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
