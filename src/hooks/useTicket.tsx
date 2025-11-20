import { ticketService } from '@/services/ticketService';
import { useState, useEffect } from 'react';
import { Ticket, TicketHistory } from '@/types/ticket';

const useCreateTicket = () => {
  const [tickets, setTickets] = useState<TicketHistory[]>([]);
  const [error1, setError1] = useState(null);
  const [loading, setLoading] = useState(false);

  const createTicket = async (paymentRequest: Ticket) => {
    setLoading(true);
    try {
      const response = await ticketService.createTicket(paymentRequest);
      return response; 
    } catch (error) {
      setError1(error);
    } finally {
      setLoading(false);
    }
  };
  const getTicketByStatus = async (status: string) => {
    setLoading(true);
    try {
      const response = await ticketService.getListTicketsByCustomer(status);
      setTickets(response.data);
    } catch (error) {
      setError1(error);
    } finally {
      setLoading(false);
    }
  }
  return { createTicket,getTicketByStatus, tickets, error1, loading };
};

export default useCreateTicket;