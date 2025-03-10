import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const NotFoundLayout: React.FC= () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Outlet />{" "}
      </div>
      <Footer />
    </>
  );
};

export default NotFoundLayout;
