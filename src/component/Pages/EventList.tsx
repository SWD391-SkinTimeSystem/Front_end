import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
interface Event {
  Id: number;
  Title: string;
  Content: string;
  Image: string;
  Date: string;
  Location: string;
  TotalTickets: number;
  AvailableTickets: number;
  TicketPrice: number;
  EventStatus: string;
}

const events: Event[] = [
  {
    Id: 1,
    Title: "The Skin Confidence Workshop",
    Content: "Nisi aliquam velit enim in laborit. Minim proident magna eiusmod...",
    Image: "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg",
    Date: "31/02/2025",
    Location: "123 Main Street, LA, CA",
    TotalTickets: 100,
    AvailableTickets: 50,
    TicketPrice: 50,
    EventStatus: "Open",
  },
  {
    Id: 2,
    Title: "The Ultimate Skin Retreat",
    Content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    Image: "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg",
    Date: "31/02/2025",
    Location: "456 Sunset Blvd, CA",
    TotalTickets: 200,
    AvailableTickets: 100,
    TicketPrice: 100,
    EventStatus: "Open",
  },
];

export default function EventPage() {
  const [, setSelectedEvent] = useState<Event | null>(null);
  return (
    <div className="space-y-6">
      {events.map((event) => (
        <Link to={`/event/${event.Id}`} key={event.Id}>
        <Card
          className="cursor-pointer"
          onClick={() => setSelectedEvent(event)}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <img
              src={event.Image}
              alt={event.Title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <CardTitle>{event.Title}</CardTitle>
              <p className="text-sm text-gray-500">
                {event.Date}
              </p>
              <p className="text-sm text-gray-600">{event.Location}</p>
            </div>
          </CardContent>
        </Card>
        </Link>
      ))}
    </div>
  );
}
