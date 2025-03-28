import { dashboardService } from '@/services/dashboardService';
import { BookingStatus, EventDashboard, EventStatusDashboard, Overview, PopularService, RevenueData } from '@/types/dashboard';
import { useState, useEffect } from 'react';

export const useDashboard = (from: string, to: string) => {
  const [overviewData, setOverviewData] = useState<Overview>();
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const dataRevenue = await dashboardService.getRevenue(from, to);
      const dataBookingStatus = await dashboardService.getBookingStatus(from, to);
      const dataOverview = await dashboardService.getOverview(from, to);
      setRevenueData(dataRevenue);
      setBookingStatus(dataBookingStatus);
      setOverviewData(dataOverview);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
}, []);

  return { revenueData, bookingStatus, overviewData, loading, error };
};

export const usePopularService = (limit: number) => {
  const [popularServiceData, setPopularServiceData] = useState<PopularService[]>([]);
  const [loading1, setLoading] = useState<boolean>(true);
  const [error1, setError] = useState<string | null>(null);

  const fetchPopularService = async () => {
    setLoading(true);
    try {
      const data = await dashboardService.getPopularService(limit);
      setPopularServiceData(data);  
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchPopularService();
  }, []);

  return { popularServiceData, loading1, error1 };
};

export const useEventDashboard = (from: string, to: string) => {
  const [eventDashboard, setEventDashboard] = useState<EventDashboard>();
  const [eventStatusDashboard, setEventStatusDashboard] = useState<EventStatusDashboard>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventDashboard = async () => {
    setLoading(true);
    try {
      const dataEvent = await dashboardService.getEventDashboard(from, to);
      const dataEventStatus = await dashboardService.getEventStatusDashboard(from, to);
      setEventDashboard(dataEvent);
      setEventStatusDashboard(dataEventStatus);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchEventDashboard();
  }, []);

  return {eventDashboard, eventStatusDashboard, loading, error};
};