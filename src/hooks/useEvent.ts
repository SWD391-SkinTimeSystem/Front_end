import { eventService } from "@/services/eventService";
import { useEffect, useState } from "react";
import { Event, EventDetail } from "@/types/event";

export const useEvent = () => {
     const [events, setEvents] = useState<Event[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchEvent = async () => {
          try {
               const data = await eventService.getListEvents();
               setEvents(data);
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchEvent();
     }, []);
 

     return { events, loading, error };
}

export const useEventDetail = (id : string) => {
     const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchEvent = async () => {
          try {
               const data = await eventService.getEvent(id);
               setEventDetail(data.data);
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchEvent();
     }, []);

     return { eventDetail, loading, error };

}