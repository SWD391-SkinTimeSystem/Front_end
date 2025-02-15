// import React from 'react'
// import Header from './component/Organisms/Header'
// import Footer from './component/Organisms/Footer'
// import Banner from './component/Molecules/Banner'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './component/Organisms/Layout';
import ServiceDetail from './component/Pages/ServiceDetail';
import { ServiceList } from "./component/Pages/ServiceList";
import Appointment from "./component/Pages/Appointment";
import AppointmentDetail from "./component/Pages/AppointmentDetail";



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="service-detail" element={<ServiceDetail />} />
            <Route path="" element={<ServiceList />} />
            <Route path="/account/appointment-list" element={<Appointment/>} />
            <Route path="/account/appointment-detail/:id" element={<AppointmentDetail />} />
          </Route>
        </Routes>
      </Router>

    </>

  )
}

export default App