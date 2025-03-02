import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';
import Layout from '@/component/Templates/Layout';
const ServiceDetail = lazy(() => import("@/component/Pages/ServiceDetail"));
const ServiceList = lazy(() => import("@/component/Pages/ServiceList"));
const Appointment = lazy(() => import("@/component/Pages/Appointment"));
const AppointmentDetail = lazy(() => import("@/component/Pages/AppointmentDetail"));
const Booking = lazy(() => import("@/component/Pages/Booking"));
const MyTickets = lazy(() => import("@/component/Pages/MyTickets"));
const TicketDetail = lazy(() => import("@/component/Pages/TicketDetail"));
const EventList = lazy(() => import("@/component/Pages/EventList"));
const EventDetail = lazy(() => import("@/component/Pages/EventDetail"));
const DisplayServiceList = lazy(() =>
     import("@/features/services").then((module) => ({ default: module.DisplayServiceList }))
);

const Loading = () => <h1>Loading...</h1>;

const UserRoutes: React.FC = () => {
     return (
          <Layout>
               <Suspense fallback={<Loading />}>
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
               </Suspense>
          </Layout >
     );
};

export default UserRoutes;