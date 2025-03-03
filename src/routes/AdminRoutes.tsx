import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
const isAmin = true;
const AdminRoutes: React.FC = () => {
     return isAmin ? (
          <Page>
          <Suspense fallback={<h1>Đang tải...</h1>}>
            <Routes>
              <Route path="so-lieu/dich-vu" element={<ServiceDashboard />} />
              {/* <Route path="users" element={<AdminUsers />} /> */}
              <Route path="*" element={<Navigate to="/admin/so-lieu/dich-vu" replace />} />
            </Routes>
          </Suspense>
        </Page>
     ):(
          <Navigate to="/login" />
     )
};

export default AdminRoutes;