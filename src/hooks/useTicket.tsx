import { ticketService } from '@/services/ticketService';
import { useState, useEffect } from 'react';
import { Ticket } from '@/types/ticket';

const useCreateTicket = () => {
  const [ticket, setTicket] = useState(null);
  const [error1, setError1] = useState(null);
  const [loading, setLoading] = useState(false);

  const createTicket = async (paymentRequest: Ticket) => {
    setLoading(true);
    try {
      const response = await ticketService.createTicket(paymentRequest);
      console.log(response.data);
      setTicket(response.data);
    } catch (error) {
      setError1(error);
    } finally {
      setLoading(false);
    }
  };

  return { createTicket, ticket, error1, loading };
};

export default useCreateTicket;