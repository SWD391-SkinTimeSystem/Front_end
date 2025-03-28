import { eventService } from "@/services/eventService";
import { useEffect, useState } from "react";
import { Event, EventDetail, EventStatus } from "@/types/event";

export const useEvent = (page: number, pageSize: number) => {
     const [events, setEvents] = useState<Event[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchEvent = async () => {
          try {
               const data = await eventService.getListEvents(page, pageSize);
               setEvents(data.content);
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }
     useEffect(() => {
          fetchEvent();
     }, []);

     return {fetchEvent, events, loading, error };
}

export const useEventDetail = (id : string) => {
     const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
     const [loadingEventDetail, setLoading] = useState<boolean>(true);
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

     return { eventDetail, loadingEventDetail, error };

}

export const useEventStatus = () => {
     const [eventPendingApproval, setEventPendingApproval] = useState<EventStatus | null>(null);
     const [eventApproved, setEventApproved] = useState<EventStatus | null>(null);
     const [eventDeclined, setEventDeclined] = useState<EventStatus | null>(null);
     const [loadingEventDetail, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchEventStatus = async () => {
          try {
               const pending_approval = await eventService.getEventState(1,10,0);
               const approved = await eventService.getEventState(1,10,1);
               const declined = await eventService.getEventState(1,10,2);
               setEventPendingApproval(pending_approval);
               setEventApproved(approved);
               setEventDeclined(declined);
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }

     const fetchUpdateStatus = async (id: string, status: number) => {
          try {
               await eventService.updateEventState(id, status);
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchEventStatus();
     }, []);

     return { eventPendingApproval, eventApproved, eventDeclined, fetchUpdateStatus, loadingEventDetail, error };

}