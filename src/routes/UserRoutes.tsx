import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/component/Templates/Layout';
import ServiceDetail from '@/component/Pages/ServiceDetail';
import { ServiceList } from '@/component/Pages/ServiceList';
import Appointment from '@/component/Pages/Appointment';
import AppointmentDetail from '@/component/Pages/AppointmentDetail';
import Booking from '@/component/Pages/Booking';

const UserRoutes: React.FC = () => {
     return (
          <Layout>
               <Routes>
                    <Route path="service-detail" element={<ServiceDetail />} />
                    <Route path="" element={<ServiceList />} />
                    <Route path="/account/appointment-list" element={<Appointment />} />
                    <Route path="/account/appointment-detail/:id" element={<AppointmentDetail />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                    <Route path="/booking" element={<Booking />} />
               </Routes>
          </Layout >
     );
};

export default UserRoutes;