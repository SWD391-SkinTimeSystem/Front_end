import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
import ServiceManagementTable from "@/component/Pages/Manager/ServiceManagementTable";
import UserManagement from "@/component/Pages/Admin/UserManagement";
import EventManagerUI from "@/component/Pages/Manager/EventManagerUI";
import BookingTable from "@/component/Pages/BookingListTable";
const EventDashboard = lazy(() => import("@/component/Pages/Admin/EventDashboard"));
const isAmin = true;
const AdminRoutes: React.FC = () => {
  return isAmin ? (
    <Page role="manager">
      <Suspense fallback={<h1>Đang tải...</h1>}>
        <Routes>
          <Route path="satistic/service" element={<ServiceDashboard />} />
          <Route path="satistic/event" element={<EventDashboard />} />
          <Route path="service" element={<ServiceManagementTable />} />
          <Route path="event" element={<EventManagerUI />} />
          <Route path="user" element={<UserManagement />} />
          <Route path="bookings" element={<BookingTable />} />
          <Route path="events" element={<BookingTable />} />
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