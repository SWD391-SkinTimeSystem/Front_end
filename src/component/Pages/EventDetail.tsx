import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    Content:
      "Nisi aliquam velit enim in laborit. Minim proident magna eiusmod...",
    Image:
      "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg",
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
    Image:
      "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg",
    Date: "31/02/2025",
    Location: "456 Sunset Blvd, CA",
    TotalTickets: 200,
    AvailableTickets: 100,
    TicketPrice: 100,
    EventStatus: "Open",
  },
];

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id as string, 10);
  if (isNaN(eventId)) {
    // xử lý trường hợp id không phải số
    return <div>Invalid event ID</div>;
  }
  const event = events.find((e) => e.Id === eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-4">
      <img
        src={event.Image}
        alt={event.Title}
        className="w-full h-80 object-cover rounded-lg"
      />
      <div className="p-4 border-b">
        <h1 className="text-lg font-bold">{event.Title}</h1>
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold">{event.Date}</p>
        <p className="text-gray-500">{event.Location}</p>
        <p className="mt-4">{event.Content}</p>
        <div className="mt-4">
          <p>
            <strong>Total Tickets:</strong> {event.TotalTickets}
          </p>
          <p>
            <strong>Available Tickets:</strong> {event.AvailableTickets}
          </p>
          <p>
            <strong>Ticket Price:</strong> ${event.TicketPrice}
          </p>
          <p>
            <strong>Event Status:</strong> {event.EventStatus}
          </p>
        </div>
        <Button className="mt-4" onClick={() => window.history.back()}>
          Back to Events
        </Button>
      </div>
    </div>
  );
}
