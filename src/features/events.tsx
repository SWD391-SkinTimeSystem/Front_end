import EventDetail from "@/component/Pages/EventDetail";
import EventList from "@/component/Pages/EventList";
import { useEvent, useEventDetail } from "@/hooks/useEvent";
import { useParams } from "react-router-dom";

export const DisplayEventList = () => {
  const { events, loading, error } = useEvent();
     if (loading) {
     return <h1>Loading...</h1>;
     }
     if (error) {
     return <h1>{error}</h1>;
     }
     return <EventList events={events}/>;

};

// export const DisplayEventDetail = ({ id }: { id: string }) => {
//     const { eventDetail, loading, error } = useEventDetail(id);
//     if (!eventDetail) {
//       return <h1>Loading event details...</h1>;
//     }
//     if (loading) return <h1>Loading...</h1>;
//     if (error) return <h1>{error}</h1>;
  
  
//     return <EventDetail eventDetail={eventDetail} />;
//   };