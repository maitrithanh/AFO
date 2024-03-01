import React from "react";
import Slider from "../components/shared/Slider";
import Navbar from "../components/dashboard/navbar/Navbar";
import Footer from "../components/home/Footer";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar home />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
