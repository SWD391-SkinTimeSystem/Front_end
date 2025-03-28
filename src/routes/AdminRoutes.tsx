import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
import ServiceManagementTable from "@/component/Pages/Manager/ServiceManagementTable";
import UserManagement from "@/component/Pages/Admin/UserManagement";
const EventDashboard = lazy(() => import("@/component/Pages/Admin/EventDashboard"));
const isAmin = true;
const AdminRoutes: React.FC = () => {
     return isAmin ? (
          <Page role = "manager">
          <Suspense fallback={<h1>Đang tải...</h1>}>
            <Routes>
              <Route path="so-lieu/dich-vu" element={<ServiceDashboard />} />
              <Route path="so-lieu/su-kien" element={<EventDashboard />} />
              <Route path="service" element={<ServiceManagementTable />} />\
              <Route path="user" element={<UserManagement />} />
              {/* <Route path="users" element={<AdminUsers />} /> */}
              {/* <Route path="*" element={<Navigate to="/admin/so-lieu/dich-vu" replace />} /> */}
            </Routes>
          </Suspense>
        </Page>
     ):(
          <Navigate to="/login" />
     )
};

export default AdminRoutes;