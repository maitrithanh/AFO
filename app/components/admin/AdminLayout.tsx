"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../dashboard/sidebar/Sidebar";
import Navbar from "../dashboard/navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-screen bg-[#f0f2f5]">
        <Toaster />
        <div className="flex">
          <Sidebar />
        </div>
        <div className="w-full h-screen transition-all delay-300">
          <div className="border-b shadow-sm">
            <Navbar admin />
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
