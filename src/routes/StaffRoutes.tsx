import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
import CalendarApp from "@/component/Pages/Staff/Calendar";
import TestPage from "@/component/Pages/Staff/TestPage";
import ServiceManagementTable from "@/component/Pages/Manager/ServiceManagementTable";
import EventCheckInManager from "@/component/Pages/Staff/EventCheckInManager";
import EventManagementUI from "@/component/Pages/Staff/EventManagementUI";
import BookingTable from "@/component/Pages/BookingListTable";
import EventTable from "@/component/Pages/Manager/Event/EventTable";
import StaffReschedule from "@/component/Pages/Staff/StaffReschedule";
import { useAccountStore } from "@/store/useAccountStore";
import ProtectedRoute from "@/component/Auth/ProtectedRoute";
const isStaff = true;
const StaffRoutes: React.FC = () => {
  const { account } = useAccountStore();

  return isStaff ? (
    <Page role="staff">
      <Suspense fallback={<h1>Đang tải...</h1>}>
        <Routes>
          <Route path="so-lieu/dich-vu" element={
            <ProtectedRoute allowedRoles={["staff"]}>

              <ServiceDashboard />
            </ProtectedRoute>

          } />
          <Route path="calendar" element={
            <ProtectedRoute allowedRoles={["staff"]}>

              <CalendarApp />
            </ProtectedRoute>

          } />
          <Route path="bookings/:id" element={
            <ProtectedRoute allowedRoles={["staff"]}>

              <TestPage />
            </ProtectedRoute>

          } />
          <Route path="service" element={
            <ProtectedRoute allowedRoles={["staff"]}>

              <ServiceManagementTable />
            </ProtectedRoute>

          } />
          <Route path="events" element={
            <ProtectedRoute allowedRoles={["staff"]}>

              <EventManagementUI />
            </ProtectedRoute>

          } />
          <Route path="ongoingevent" element={
            <ProtectedRoute allowedRoles={["staff"]}>

              <EventTable />
            </ProtectedRoute>

          } />
          <Route path="bookings" element={
            <ProtectedRoute allowedRoles={["staff"]}>

              <BookingTable />
            </ProtectedRoute>

          } />
          <Route path="event" element={
            <ProtectedRoute allowedRoles={["staff"]}>

              <EventTable />
            </ProtectedRoute>

          } />
          <Route path="reschedule/:id" element={
            <ProtectedRoute allowedRoles={["staff"]}>

              <StaffReschedule />
            </ProtectedRoute>

          } />
          <Route path="ongoingevent/:id" element={
            <ProtectedRoute allowedRoles={["staff"]}>

              <EventCheckInManager />
            </ProtectedRoute>

          } />
          {/* <Route path="users" element={<AdminUsers />} /> */}
          {/* <Route path="*" element={<Navigate to="/admin/so-lieu/dich-vu" replace />} /> */}
        </Routes>
      </Suspense>
    </Page>
  ) : (
    <Navigate to="/login" />
  )
};

export default StaffRoutes;