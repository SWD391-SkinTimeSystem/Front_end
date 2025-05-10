import { ticketEvent } from "@/services/ticketEvent";
import { TicketEvent } from "@/types/ticket";
import { useEffect, useState } from "react";

export const useEvent = (eventid : string) => {
     const [ticketEvents, setTicketEvent] = useState<TicketEvent>();
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchEvent = async () => {
          try {
               const data = await ticketEvent.getListTicketEvent(eventid);
               setTicketEvent(data.data);
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }
     useEffect(() => {
        fetchEvent();
    }, []);

     return { ticketEvents, loading, error };
}