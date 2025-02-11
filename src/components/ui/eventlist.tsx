import React from "react";
// event listlist
interface EventItem {
  id: number;
  name: string;
  capacity: number;
  price: number;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  thumbnail: string;
  status: string;
  description: string;
}

interface Props {
  events: EventItem[];
  onViewDetails: (id: number, type: "event") => void;
}

const EventList: React.FC<Props> = ({ events}) => {

  return (
    <div className="space-y-5">
      {events.map((event) => (
        <div key={event.id} className="flex bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:translate-y-1">
          <img src={event.thumbnail} alt={event.name} className="w-40 object-cover" />
          <div className="p-4 w-3/5">
            <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
            <p className="text-gray-500 text-sm">{event.eventDate} - {event.startTime} to {event.endTime}</p>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-pink-600 font-bold">{event.price} VND</p>
            <p className="text-gray-700 mt-2 line-clamp-3">{event.description}</p>
            <button
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Xem thêm
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
