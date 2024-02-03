"use client";

import React from "react";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import Navbar from "../components/dashboard/navbar/Navbar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex overflow-x-hidden h-screen">
      <Toaster />
      <div className="flex">
        <Sidebar />
      </div>
      <div className="w-full transition-all delay-300">
        <div className="border-b shadow-sm">
          <Navbar admin />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
