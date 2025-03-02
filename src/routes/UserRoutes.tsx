import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/component/Templates/Layout';
import ServiceDetail from '@/component/Pages/ServiceDetail';
import { ServiceList } from '@/component/Pages/ServiceList';
import Appointment from '@/component/Pages/Appointment';
import AppointmentDetail from '@/component/Pages/AppointmentDetail';
import Booking from '@/component/Pages/Booking';
import MyTickets from '@/component/Pages/MyTickets';
import TicketDetail from '@/component/Pages/TicketDetail';
import EventList from '@/component/Pages/EventList';
import EventDetail from '@/component/Pages/EventDetail';
import { DisplayServiceList } from '@/features/services';
const UserRoutes: React.FC = () => {
     return (
          <Layout>
               <Routes>
                    <Route path="service-detail" element={<ServiceDetail />} />
                    <Route path="" element={<ServiceList />} />
                    <Route path="/account/appointment-list" element={<Appointment />} />
                    <Route path="/account/appointment-detail/:id" element={<AppointmentDetail />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/ticket" element={<MyTickets />} />
                    <Route path="/ticket-detail/:id" element={<TicketDetail />} />
                    <Route path="/event" element={<EventList />} />
                    <Route path="/event-detail/:id" element={<EventDetail />} />
                    <Route path="/testAPI" element={<DisplayServiceList />} />
               </Routes>
          </Layout >
     );
};

export default UserRoutes;