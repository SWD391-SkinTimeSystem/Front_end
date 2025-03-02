import React from "react";
import { useLocation } from "react-router-dom";
import { BreadcrumbDemo } from "../Atoms/Breadcrumbs";
import "../../styles/global.css";
import Header from "./Header";
import { AccountSidebar } from "../Organisms/AccountSidebar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/" || location.pathname === "/booking";
  const isAccountPage = location.pathname.startsWith("/account");
  return (
    <>
      <div id="body">
        <Header />
        <div className="w-[80%] mx-auto">
          <div id="breadcrumb" className="pl-[20px] py-3">
            <BreadcrumbDemo />
          </div>
        </div>
        <div className="flex flex-row min-h-screen w-[80%] mx-auto">
          <div className={`bg-white mr-3 ${hideSidebar ? "w-full" : "w-[70%]"} ${isAccountPage ? "rounded-[30px]" : ""
            }`}>{children}</div>
          {!hideSidebar && (
            <div className="w-[30%]">
              {isAccountPage ? <AccountSidebar /> : <Sidebar />}
            </div>
          )}

        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
