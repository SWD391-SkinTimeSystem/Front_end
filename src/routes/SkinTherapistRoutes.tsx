import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
import CalendarApp from "@/component/Pages/Staff/Calendar";
import TherapistBookingTable from "@/component/Pages/Therapist/TherapistBooking";
const isSkinTherapist = true;
const SkinTherapistRoutes: React.FC = () => {
     return isSkinTherapist ? (
          <Page role = "therapist">
          <Suspense fallback={<h1>Đang tải...</h1>}>
            <Routes>
              <Route path="so-lieu/dich-vu" element={<ServiceDashboard />} />
              <Route path="calendar" element={<CalendarApp />} />
              <Route path="/booking" element={<TherapistBookingTable />} />
              {/* <Route path="users" element={<AdminUsers />} /> */}
              {/* <Route path="*" element={<Navigate to="/admin/so-lieu/dich-vu" replace />} /> */}
            </Routes>
          </Suspense>
        </Page>
     ):(
          <Navigate to="/login" />
     )
};

export default SkinTherapistRoutes;