export type Ticket = {
    id: string;
    eventTitle: string;
    eventDescription: string;
    date: string;
    time: string;
    location: string;
    ticketNumber: string;
    status: string;
    qrCodeUrl?: string;
  }