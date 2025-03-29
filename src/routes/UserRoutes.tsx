import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
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
import FeedbackManagementPage from "@/component/Pages/Manager/Feedback/FeedbackManagementPage";
import BookingTable from "@/component/Pages/BookingListTable";
import FailurePayment from "@/component/Pages/FailurePayment";
import SuccessPayment from "@/component/Pages/SuccessPayment";
import { useAccountStore } from "@/store/useAccountStore";
import Booking from "@/component/Pages/Booking";

// import {ServiceList} from "@/component/Pages/Staff/ServiceList";
const ServiceDetail = lazy(() => import("@/component/Pages/ServiceDetail"));
// const ServiceList = lazy(() => import("@/component/Pages/ServiceList"));
const Appointment = lazy(() => import("@/component/Pages/Appointment"));
const AppointmentDetail = lazy(() => import("@/component/Pages/AppointmentDetail"));
// const Booking = lazy(() => import("@/component/Pages/Booking"));
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

import ProtectedRoute from "@/component/Auth/ProtectedRoute";
const Loading = () => <h1>Loading...</h1>;


const UserRoutes: React.FC = () => {
     const { account } = useAccountStore();

     return (
          <Layout>
               <Suspense fallback={<Loading />}>
                    <Routes>
                         <Route path="" element={<DisplayServiceList />} />
                         <Route path="/account/appointment-list" element={
                              <ProtectedRoute allowedRoles={["customer"]}>
                                   <BookingPage />
                              </ProtectedRoute>

                         } />
                         <Route path="/account/appointment-detail/:id" element={
                              <ProtectedRoute allowedRoles={["customer"]}>

                                   <BookingDetail />
                              </ProtectedRoute>


                         } />
                         <Route path="/booking/:serviceId"


                              element={
                                   <ProtectedRoute allowedRoles={["customer"]}>
                                        <Booking />
                                   </ProtectedRoute>

                              } />
                         <Route path="/account/ticket" element={
                              <ProtectedRoute allowedRoles={["customer"]}>
                                   <MyTickets />
                              </ProtectedRoute>
                         } />
                         <Route path="/account/feedback/:bookingId" element={

                              <ProtectedRoute allowedRoles={["customer"]}>

                                   < FeedbackPage />
                              </ProtectedRoute>
                         } />
                         <Route path="/testAPI" element={<DisplayServiceList />} />
                         <Route path="/service-detail/:serviceId" element={<ServiceDetail />} />
                         <Route path="*" element={<h1>Not Found</h1>} />
                         <Route path="/event" element={<DisplayEventList />} />
                         <Route path="/event-detail/:id" element={<EventDetail />} />
                         <Route path="/payment/fail" element={<FailurePayment />} />
                         <Route path="/payment/success" element={<SuccessPayment />} />
                    </Routes>
               </Suspense>
          </Layout >
     )

     // <Routes>
     //      {/* <Route path="/checkin" element={<TestPage />} /> */}
     //      <Route path="/checkin" element={<EventCheckInManager />} />
     //      <Route path="/a" element={<TestPage />} />

     //      <Route path="/event" element={<EventManagementUI />} />
     //      <Route path="/eventM" element={<EventManagerUI />} />
     //      <Route path="/service" element={<ServiceManagementPage />} />
     //      <Route path="/feedback" element={<FeedbackManagementPage />} />

     //      <Route path="/user" element={<UserManagementPage />} />

     //      <Route path="" element={<HomePage />} />
     //      {/* <Route path="/z" element={<SkincareLandingPage />} /> */}
     //      {/* <Route path="" element={<DisplayServiceList />} /> */}
     //      {/* <Route path="/service" element={<ServiceList  />} /> */}
     // </Routes>



};

export default UserRoutes;