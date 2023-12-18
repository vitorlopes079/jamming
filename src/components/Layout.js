import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="app-content">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
