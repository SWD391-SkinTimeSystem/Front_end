import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { BreadcrumbDemo } from "../Atoms/Breadcrumbs";
import "../../styles/global.css";

const Layout: React.FC = () => {
  return (
    <>
    <div id="body">
    <Header />
    <div className="w-[80%] mx-auto">
      <div id = "breadcrumb" className="pl-[20px] py-3">
      <BreadcrumbDemo />
      </div>
      </div>
    <div className="flex flex-row min-h-screen w-[80%] mx-auto">
      <div className="w-[70%] bg-white mr-3"><Outlet /></div>
      <div className="w-[30%] bg-white"><Sidebar /></div>
    </div>
    <Footer />
    </div>
    </>
  );
};

export default Layout;
