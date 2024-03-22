import BusPageParent from "@/app/components/parent/bus/BusPageParent";
import React from "react";

const BusPage = () => {
  return (
    <div className=" w-full h-[88vh] overflow-auto m-auto rounded-lg bg-white p-4 md:p-10">
      <BusPageParent />
    </div>
  );
};

export default BusPage;
