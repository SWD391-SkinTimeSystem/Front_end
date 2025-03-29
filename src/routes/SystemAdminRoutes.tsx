import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
import UserManagementPage from "@/component/Pages/Admin/UserManagementPage";
import FeedbackManagementPage from "@/component/Pages/Manager/Feedback/FeedbackManagementPage";
const isAdminSystem = true;
const AdminSystemRoutes: React.FC = () => {
     return isAdminSystem ? (
          <Page role = "admin">
          <Suspense fallback={<h1>Đang tải...</h1>}>
            <Routes>
              <Route path="so-lieu/dich-vu" element={<ServiceDashboard />} />
              <Route path="/user/manage" element={<UserManagementPage />} />
              <Route path="/feedback/manage" element={< FeedbackManagementPage />} />

              {/* <Route path="users" element={<AdminUsers />} /> */}
              {/* <Route path="*" element={<Navigate to="/admin/so-lieu/dich-vu" replace />} /> */}
            </Routes>
          </Suspense>
        </Page>
     ):(
          <Navigate to="/login" />
     )
};

export default AdminSystemRoutes;