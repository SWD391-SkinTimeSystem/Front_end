import React, { Suspense, lazy } from "react";
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import Layout from '@/component/Templates/Layout';
import CustomeLayout from '@/component/Templates/CustomeLayout';

import FailurePayment from "@/component/Pages/FailurePayment";
import SuccessPayment from "@/component/Pages/SuccessPayment";
import FeedbackPage from "@/component/Pages/Feedback";
import BookingDetail from "@/component/Pages/BookingDetail";
import { BookingList } from "@/components/ui/bookinglist";
import BookingPage from "@/component/Pages/BookingPage";
import NotFoundPage from "@/component/Pages/NotFoundPage";
import SuccessPage from "@/component/Pages/SuccessPage";
import FailedPage from "@/component/Pages/FailedPage";
const ServiceDetail = lazy(() => import("@/component/Pages/ServiceDetail"));
const ServiceList = lazy(() => import("@/component/Pages/ServiceList"));
const Appointment = lazy(() => import("@/component/Pages/Appointment"));
const AppointmentDetail = lazy(() => import("@/component/Pages/AppointmentDetail"));
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
          <Suspense fallback={<Loading />}>
               <Routes>
                    <Route element={<Layout />}>
                         <Route path="/" element={<DisplayServiceList />} />
                         <Route path="/service-detail/:serviceId" element={<ServiceDetail />} />
                         <Route path="/account/appointment-list" element={<BookingPage />} />
                         <Route path="/account/appointment-detail/:id" element={<BookingDetail />} />
                         <Route path="/account/feedback/:bookingId" element={<FeedbackPage />} />
                         <Route path="/ticket" element={<MyTickets />} />
                         <Route path="/ticket-detail/:id" element={<TicketDetail />} />
                         <Route path="/event" element={<DisplayEventList />} />
                         <Route path="/event-detail/:id" element={<EventDetail />} />
                         <Route path="/payment/fail" element={<FailurePayment />} />
                         <Route path="/payment/success" element={<SuccessPayment />} />
                    </Route>
                    <Route element={<CustomeLayout />}>
                         <Route path="*" element={<NotFoundPage />} />
                         <Route path="/success" element={<SuccessPage />} />
                         <Route path="/failed" element={<FailedPage />} />
                    </Route>
               </Routes>
          </Suspense>
     
     );
};

export default UserRoutes;