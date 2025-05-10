import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
import CalendarApp from "@/component/Pages/Staff/Calendar";
import TherapistBookingTable from "@/component/Pages/Therapist/TherapistBooking";
import SkinTypeManagement from "@/component/Pages/Therapist/SkinTypeManagementTable";
import QuizManagement from "@/component/Pages/Therapist/QuizManagement";            
import { useAccountStore } from "@/store/useAccountStore";
import ProtectedRoute from "@/component/Auth/ProtectedRoute";
const isSkinTherapist = true;
const SkinTherapistRoutes: React.FC = () => {
  const { account } = useAccountStore();

  return isSkinTherapist ? (
    <Page role="therapist">
      <Suspense fallback={<h1>Đang tải...</h1>}>
        <Routes>
        <Route path="/quiz" element={<QuizManagement />} />
        <Route path="/skintype" element={<SkinTypeManagement />} />
          <Route path="*" element={
            <ProtectedRoute allowedRoles={["therapist"]}>

              <TherapistBookingTable />
            </ProtectedRoute>


          } />
          <Route path="so-lieu/dich-vu" element={
            <ProtectedRoute allowedRoles={["therapist"]}>

              <ServiceDashboard />
            </ProtectedRoute>

          } />
          <Route path="calendar" element={
            <ProtectedRoute allowedRoles={["therapist"]}>

              <CalendarApp />
            </ProtectedRoute>

          } />
          <Route path="/booking" element={
            <ProtectedRoute allowedRoles={["therapist"]}>

              <TherapistBookingTable />
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

export default SkinTherapistRoutes;