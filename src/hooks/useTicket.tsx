import {useState, useEffect} from 'react';
import { ticketService } from '@/services/ticketService';
import { Ticket } from '@/types/ticket';

export const useTicket = (status : string) => {
     const [tickets, setTickets] = useState<Ticket[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchTickets = async () => {

        try {
          const data = await ticketService.getListTicketsByCustomer(status);
          setTickets(data);
          console.log (data);
        } catch (error) {
          setError("Failed to fetch tickets");
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        setLoading(true);
        fetchTickets();
      }, [status]);
    
      return { tickets, loading, error };
    };

