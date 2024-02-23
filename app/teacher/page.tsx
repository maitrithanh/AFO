import React from "react";
import MenuSection from "../components/shared/MenuSection";
import { menuTeacher } from "@/data/menuTeacher";

const page = () => {
  return (
    <div className="flex justify-center items-center">
      <MenuSection dataMenu={menuTeacher} />
    </div>
  );
};

export default page;
