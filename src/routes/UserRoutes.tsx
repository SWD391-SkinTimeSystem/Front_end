import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';
import Layout from '@/component/Templates/Layout';
import FeedbackPage from "@/component/Pages/Feedback";
import BookingDetail from "@/component/Pages/BookingDetail";
import BookingPage from "@/component/Pages/BookingPage";
import TestPage from "@/component/Pages/Staff/TestPage";
import EventCheckInManager from "@/component/Pages/Staff/EventCheckInManager";
import EventManagementUI from "@/component/Pages/Staff/EventManagementUI";
import EventManagerUI from "@/component/Pages/Manager/Event/EventManagerUI";
import HomePage from "@/component/Pages/Manager/TestHome/HomePage";
import SkincareLandingPage from "@/component/Pages/Manager/TestHome/SkincareLandingPage";
import UserManagementPage from "@/component/Pages/Admin/UserManagementPage";
import ServiceManagementPage from "@/component/Pages/Manager/Service/ServiceManagementPage";

// import {ServiceList} from "@/component/Pages/Staff/ServiceList";
const ServiceDetail = lazy(() => import("@/component/Pages/ServiceDetail"));
// const ServiceList = lazy(() => import("@/component/Pages/ServiceList"));
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
          default: module.DisplayEventList
     })));
const DisplayServiceList = lazy(() =>
     import("@/features/services").then((module) => ({
          default: module.DisplayServiceList,
     }))
);


const Loading = () => <h1>Loading...</h1>;


const UserRoutes: React.FC = () => {
     return (
          // <Layout>
          //      <Suspense fallback={<Loading />}>
          //           <Routes>
          //                <Route path="/service-detail/:serviceId" element={<ServiceDetail />} />
          //                <Route path="" element={<DisplayServiceList />} />
          //                <Route path="/account/appointment-list" element={<BookingPage />} />
          //                <Route path="/account/appointment-detail/:id" element={<BookingDetail />} />
          //                {/* <Route path="/account/appointment-list" element={<Appointment />} />
          //                <Route path="/account/appointment-detail/:id" element={<AppointmentDetail />} /> */}
          //                <Route path="*" element={<h1>Not Found</h1>} />
          //                <Route path="/booking" element={<Booking />} />
          //                <Route path="/ticket" element={<MyTickets />} />
          //                <Route path="/account/feedback/:bookingId" element={< FeedbackPage />} />
          //                <Route path="/ticket-detail/:id" element={<TicketDetail />} />
          //                <Route path="/event" element={<DisplayEventList />} />
          //                <Route path="/event-detail/:id" element={<EventDetail />} />
          //                <Route path="/testAPI" element={<DisplayServiceList />} />
          //                <Route path="/payment/fail" element={<FailurePayment />} />
          //                <Route path="/payment/success" element={<SuccessPayment />} />

          //           </Routes>
          //      </Suspense>
          // </Layout >
          <Routes>
               {/* <Route path="/checkin" element={<TestPage />} /> */}
               <Route path="/checkin" element={<EventCheckInManager />} />
               <Route path="/a" element={<TestPage />} />
                    
               <Route path="/event" element={<EventManagementUI />} />
               <Route path="/eventM" element={<EventManagerUI />} />
               <Route path="/service" element={<ServiceManagementPage />} />
               <Route path="/user" element={<UserManagementPage />} />

               <Route path="" element={<HomePage />} />
               {/* <Route path="/z" element={<SkincareLandingPage />} /> */}
               {/* <Route path="" element={<DisplayServiceList />} /> */}
               {/* <Route path="/service" element={<ServiceList  />} /> */}
          </Routes>


     );
};

export default UserRoutes;