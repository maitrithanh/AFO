import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/dashboard/navbar/Navbar";
import FunctionMenu from "../components/dashboard/navbar/FunctionMenu";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[url(/bg-big.webp)] max-h-screen h-screen w-screen overflow-y-auto">
      <Toaster />
      <div>
        <Navbar />
      </div>
      <div className="absolute w-full md:translate-y-full shadow-lg translate-y-0 md:hidden transition-all bottom-0 z-20 bg-[#fffc] backdrop-blur-lg overflow-hidden">
        <FunctionMenu />
      </div>
      <div className="m-4 mt-24 body-content">{children}</div>
    </div>
  );
};

export default layout;
