import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
import UserManagementPage from "@/component/Pages/Admin/UserManagementPage";
import FeedbackManagementPage from "@/component/Pages/Manager/Feedback/FeedbackManagementPage";

              <Route path="/user/manage" element={<UserManagementPage />} />
              <Route path="/feedback/manage" element={< FeedbackManagementPage />} />
            
import UserManagement from "@/component/Pages/Admin/UserManagement";
import { useAccountStore } from "@/store/useAccountStore";
import ProtectedRoute from "@/component/Auth/ProtectedRoute";
const isAdminSystem = true;
const AdminSystemRoutes: React.FC = () => {
  const { account } = useAccountStore();

  return isAdminSystem ? (
    <Page role="admin">
      <Suspense fallback={<h1>Đang tải...</h1>}>
        <Routes>
          <Route path="so-lieu/dich-vu" element={
            <ProtectedRoute allowedRoles={["admin"]}>

              <ServiceDashboard />
            </ProtectedRoute>


          } />
          <Route path="/user/manage" element={
            <ProtectedRoute allowedRoles={["admin"]}>

              <UserManagement />
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

export default AdminSystemRoutes;