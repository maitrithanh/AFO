import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/dashboard/navbar/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ backgroundImage: `url(/bg-big.webp)` }}
      className="max-h-screen h-screen w-screen overflow-y-auto"
    >
      <Toaster />
      <div>
        <Navbar />
      </div>
      <div className="m-4 mt-24 body-content">{children}</div>
    </div>
  );
};

export default layout;
