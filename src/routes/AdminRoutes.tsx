import ServiceDashboard from '@/component/Pages/Admin/ServiceDashboard';
import Page from '@/component/Templates/Admin/page';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
const isAmin = true;
const AdminRoutes: React.FC = () => {
     return isAmin ? (
          <Page>
               <Routes>
                    <Route path="so-lieu/dich-vu" element={<ServiceDashboard />} />
                    <Route path="users" element={<h1>Admin Users</h1>} />
               </Routes>
          </Page>
     ):(
          <Navigate to="/login" />
     )
};

export default AdminRoutes;