import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Event {
  eventId: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  image_url: string;
}

const events: Event[] = [
  {
    eventId: "1",
    title: "Hội thảo chăm sóc da chuyên sâu",
    description: "Sự kiện đặc biệt giúp bạn hiểu rõ hơn về cách chăm sóc da.",
    start_date: "2025-02-10T18:00:00",
    end_date: "2025-02-10T20:00:00",
    location: "TP. Hồ Chí Minh",
    image_url: "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg",
  },
];

export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [search, /*setSearch*/] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h5 className="text-3xl font-bold mb-4">Events</h5>
      <div className="flex-1 flex items-center space-x-6 mx-6">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Tìm kiếm sự kiện ..."
            className="pl-10 rounded-2xl bg-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.eventId} className="cursor-pointer" onClick={() => setSelectedEvent(event)}>
            <CardContent className="p-4">
              <img src={event.image_url} alt={event.title} className="w-full h-40 object-cover rounded-lg" />
              <h2 className="text-xl font-semibold mt-2">{event.title}</h2>
              <p className="text-gray-500">{new Date(event.start_date).toLocaleString()} - {event.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-lg">
          {selectedEvent && (
            <div>
              <img src={selectedEvent.image_url} alt={selectedEvent.title} className="w-full h-40 object-cover rounded-lg" />
              <h2 className="text-2xl font-bold mt-2">{selectedEvent.title}</h2>
              <p className="text-gray-500">{new Date(selectedEvent.start_date).toLocaleString()} - {selectedEvent.location}</p>
              <p className="text-gray-700 mt-2">{selectedEvent.description}</p>
              <Button className="mt-4 w-full">Đăng ký ngay</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
