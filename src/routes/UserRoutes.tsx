import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';
import Layout from '@/component/Templates/Layout';
import FeedbackPage from "@/component/Pages/Feedback";
import BookingDetail from "@/component/Pages/BookingDetail";
import BookingPage from "@/component/Pages/BookingPage";
import NotFoundPage from "@/component/Pages/NotFoundPage";
import SuccessPage from "@/component/Pages/SuccessPayment";
import FailedPage from "@/component/Pages/FailurePayment";
const ServiceDetail = lazy(() => import("@/component/Pages/ServiceDetail"));
const Booking = lazy(() => import("@/component/Pages/Booking"));
const MyTickets = lazy(() => import("@/component/Pages/MyTickets"));
const TicketDetail = lazy(() => import("@/component/Pages/TicketDetail"));
const EventDetail = lazy(() => import("@/component/Pages/EventDetail"));
// const DisplayEventDetail = lazy(() => 
//      import("@/features/events").then((module) => ({
//           default: module.DisplayEventDetail
// })));
const DisplayEventList = lazy(() => 
     import("@/features/events").then((module) => ({ 
          default: module.DisplayEventList })));
const DisplayServiceList = lazy(() =>
     import("@/features/services").then((module) => ({
       default: module.DisplayServiceList,
     }))
   );


const Loading = () => <h1>Loading...</h1>;


const UserRoutes: React.FC = () => {
     return (
          <Layout>
               <Suspense fallback={<Loading />}>
                    <Routes>
                         <Route path="/service-detail/:serviceId" element={<ServiceDetail />} />
                         <Route path="" element={<DisplayServiceList />} />
                         <Route path="/account/appointment-list" element={<BookingPage />} />
                         <Route path="/account/appointment-detail/:id" element={<BookingDetail />} />
                         <Route path="*" element={<NotFoundPage />} />
                         <Route path="/booking/:serviceId" element={<Booking />} />
                         <Route path="/account/ticket" element={<MyTickets />} />
                         <Route path="/account/feedback/:bookingId" element={< FeedbackPage />} />
                         <Route path="/ticket-detail/:id" element={<TicketDetail />} />
                         <Route path="/event" element={<DisplayEventList />} />
                         <Route path="/event-detail/:id" element={<EventDetail />} />
                         <Route path="/testAPI" element={<DisplayServiceList />} />
                         <Route path="/payment/fail" element={<FailedPage />} />
                         <Route path="/payment/success" element={<SuccessPage />} />
                    </Routes>
               </Suspense>
          </Layout >
     );
};

export default UserRoutes;