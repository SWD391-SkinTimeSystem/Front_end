import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const Layout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Nội dung chính */} 
        <div className="flex flex-row	">
        <Sidebar />
        <main className="flex-1 p-3 overflow-y-auto">
      

          <Outlet />
        </main>

        </div>
       
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
