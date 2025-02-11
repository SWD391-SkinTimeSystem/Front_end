// import React from 'react'
// import Header from './component/Organisms/Header'
// import Footer from './component/Organisms/Footer'
// import Banner from './component/Molecules/Banner'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './component/Organisms/Layout';
import ServiceDetail from './component/Pages/ServiceDetail';
import NewsEvent from './component/Pages/NewsEvents';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="service-detail" element={<ServiceDetail />} />
            <Route path="news&event/" element={<NewsEvent />} />
           
           

          </Route>
        </Routes>
      </Router>

    </>

  )
}

export default App