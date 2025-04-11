import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
import ServiceManagementTable from "@/component/Pages/Manager/ServiceManagementTable";
import UserManagement from "@/component/Pages/Admin/UserManagement";
import EventManagerUI from "@/component/Pages/Manager/EventManagerUI";
import FeedbackManagementPage from "@/component/Pages/Manager/Feedback/FeedbackManagementPage";
import SkinTypeManagement from "@/component/Pages/Therapist/SkinTypeManagementTable";
import QuizManagement from "@/component/Pages/Therapist/QuizManagement";

const EventDashboard = lazy(() => import("@/component/Pages/Admin/EventDashboard"));
const isAmin = true;
const AdminRoutes: React.FC = () => {
  return isAmin ? (
    <Page role="manager">
      <Suspense fallback={<h1>Đang tải...</h1>}>
        <Routes>
          <Route path="so-lieu/dich-vu" element={<ServiceDashboard />} />
          <Route path="so-lieu/su-kien" element={<EventDashboard />} />
          <Route path="service" element={<ServiceManagementTable />} />
          <Route path="event" element={<EventManagerUI />} />
          <Route path="user" element={<UserManagement />} />
          <Route path="feedback" element={<FeedbackManagementPage />} />
          <Route path="/quiz" element={<QuizManagement />} />
          <Route path="/skintype" element={<SkinTypeManagement />} />

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