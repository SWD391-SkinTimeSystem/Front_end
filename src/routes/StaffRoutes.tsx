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
const isStaff = true;
const StaffRoutes: React.FC = () => {
     return isStaff ? (
          <Page role = "staff">
          <Suspense fallback={<h1>Đang tải...</h1>}>
            <Routes>
              <Route path="so-lieu/dich-vu" element={<ServiceDashboard />} />
              <Route path="calendar" element={<CalendarApp />} />
              <Route path="bookings/detail/:id" element={<TestPage />} />
              <Route path="service" element={<ServiceManagementTable />} />
              <Route path="events" element={<EventManagementUI />} />
              <Route path="event/checkin" element={<EventCheckInManager />} />
              <Route path="bookings" element={<BookingTable />} />
              {/* <Route path="users" element={<AdminUsers />} /> */}
              {/* <Route path="*" element={<Navigate to="/admin/so-lieu/dich-vu" replace />} /> */}
            </Routes>
          </Suspense>
        </Page>
     ):(
          <Navigate to="/login" />
     )
};

export default StaffRoutes;