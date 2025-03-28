export type TicketData = {
    id: string;
    eventTitle: string;
    eventDescription: string;
    date: string;
    time: string;
    location: string;
    ticketNumber: string;
    status: string;
  }
export type Ticket = {
    eventId: string;
    price: number;
    paymentMethod: string;
    totalAmount: string;
    successCallbackUrl: string;
    failureCallbackUrl: string;
};

export type TicketHistory = {
    ticket_id: string;
    total_amount: number;
    event_name: string;
    event_id: string;
    purchase_date: string;
    status: string;
    event_date: string;
    otp_code: string | null;
};

export type TicketEvent = {
  content: ContentItem[];
  itemAmount: number;
  pageSize: number;
  pageCount: number;
  currentPage: number;
}

export type ContentItem = {
  id: string;
  userId: string;
  ticket_Otp: string;
  base64_QrCode: string;
  status: number;
}
