import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
import ServiceManagementTable from "@/component/Pages/Manager/ServiceManagementTable";
import UserManagement from "@/component/Pages/Admin/UserManagement";
import EventManagerUI from "@/component/Pages/Manager/EventManagerUI";
import BookingTable from "@/component/Pages/BookingListTable";
import EventTable from "@/component/Pages/Manager/Event/EventTable";
import { useAccountStore } from "@/store/useAccountStore";
import ProtectedRoute from "@/component/Auth/ProtectedRoute";
const EventDashboard = lazy(() => import("@/component/Pages/Admin/EventDashboard"));
const isAmin = true;
const AdminRoutes: React.FC = () => {
  const { account } = useAccountStore();

  return isAmin ? (
    <Page role="manager">
      <Suspense fallback={<h1>Đang tải...</h1>}>
        <Routes>
          <Route path="satistic/service" element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ServiceDashboard />
            </ProtectedRoute>

          } />
          <Route path="satistic/event" element={
            <ProtectedRoute allowedRoles={["manager"]}>

              <EventDashboard />
            </ProtectedRoute>


          } />
          <Route path="service" element={
            <ProtectedRoute allowedRoles={["manager"]}>

              <ServiceManagementTable />
            </ProtectedRoute>

          } />
          <Route path="event" element={
            <ProtectedRoute allowedRoles={["manager"]}>

              <EventManagerUI />
            </ProtectedRoute>

          }
          />
          <Route path="user" element={
            <ProtectedRoute allowedRoles={["manager"]}>

              <UserManagement />
            </ProtectedRoute>


          } />
          <Route path="bookings" element={
            <ProtectedRoute allowedRoles={["manager"]}>

              <BookingTable />
            </ProtectedRoute>

          } />
          <Route path="events" element={
            <ProtectedRoute allowedRoles={["manager"]}>

              <EventTable />
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

export default AdminRoutes;