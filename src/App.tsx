import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<!-- import Layout from './component/Organisms/Layout';
import ServiceDetail from './component/Pages/ServiceDetail';
import { ServiceList } from "./component/Pages/ServiceList";
import Appointment from "./component/Pages/Appointment";
import AppointmentDetail from "./component/Pages/AppointmentDetail";
import FeedbackPage from "./component/Pages/Feedback";
  // import EventList from "./component/Pages/EventList";
// import CheckoutTicket from "./component/Pages/CheckoutTicket";
import MyTickets from "./component/Pages/MyTickets";
import TicketDetail from "./component/Pages/TicketDetail"; -->


import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
<!--           <Route path="/" element={<Layout />}>
            <Route path="service-detail" element={<ServiceDetail />} />
            <Route path="" element={<ServiceList />} />
            <Route path="/account/appointment-list" element={<Appointment/>} />
            <Route path="/account/appointment-detail/:id" element={<AppointmentDetail />} />
            <Route path="/account/feedback/:id" element={<FeedbackPage />} />

          </Route>
            {/* <Route path="event-list" element={<EventList />} />
            <Route path="event-checkout/:eventId" element={<CheckoutTicket />} /> */}
            <Route path = "my-ticket" element = {< MyTickets/>}></Route>
            <Route path = "ticket-detail/:ticketId" element = {< TicketDetail />} />
          </Route> -->
          
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </>
  )
}
export default App