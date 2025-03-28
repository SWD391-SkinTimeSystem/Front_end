export type RevenueData = {
    date: string; // assuming date is in ISO format (YYYY-MM-DD)
    total_revenue: number;
    revenue_breakdown: {
      refund: number;
      booking: number;
      event: number;
    };
}

export type BookingStatus = {
    NotStarted: number;
    Doing: number;
    Completed: number;
    Canceled: number;
}

export type Overview = {
  total_revenue: number;
  total_booking: number;
  completed_booking: number;
  canceled_booking: number;
  cancel_rate: number;
  new_customer: number;
  active_services: number;  
  inactive_services: number;
  active_therapist: number;
  inactive_therapist: number;
}

export type PopularService = {
  serviceId: string;
  serviceName: string;
  bookingCount: number;
  totalRevenue: number;
}

export type EventDashboard = {
  total_revenue: number;
  total_events: number;
  upcoming_event: number;
  canceled_event: number;
  total_ticket_sold: number;
  refunded_ticket: number;
}

export type EventStatusDashboard = {
  ApprovePending: number;
  Approved: number;
  Declined: number;
  OnGoing: number;
  Completed: number;
  Canceled: number;
  Removed: number;
}

