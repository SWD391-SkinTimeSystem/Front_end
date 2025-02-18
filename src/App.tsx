// import React from 'react'
// import Header from './component/Organisms/Header'
// import Footer from './component/Organisms/Footer'
// import Banner from './component/Molecules/Banner'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './component/Organisms/Layout';
import ServiceDetail from './component/Pages/ServiceDetail';
import { ServiceList } from "./component/Pages/ServiceList";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import EventPage from "./component/Pages/EventList";
import EventDetail from "./component/Pages/EventDetail";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="service-detail" element={<ServiceDetail />} />
            <Route path="" element={<ServiceList />} />
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          
          <Route path="/event" element={<Layout />}>
            <Route path="" element={<EventPage />} />
            <Route path=":id" element={<EventDetail />} />
          </Route>

        </Routes>
      </Router>

    </>

  )
}

export default App