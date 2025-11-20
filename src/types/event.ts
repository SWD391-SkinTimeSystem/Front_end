export type Event = {
    event_id: string;
    title: string;
    description: string;
    start_date: string;
    price: number;
    start_time: string;
    location: string;
    image_url: string;
};

export type EventDetail = {
    id: string;
    title: string;
    image: string;
    content: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    available_ticket: number;
    total_ticket_amount: number;
    ticket_price: number;
    event_status: string;
  }