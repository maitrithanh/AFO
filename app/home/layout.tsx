import React from "react";
import Slider from "../components/shared/Slider";
import Navbar from "../components/dashboard/navbar/Navbar";
import Footer from "../components/home/Footer";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar home />
      <div className="mt-[4rem]">
        <div className="mx-12 mt-4">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default layout;
