import React from "react";
import MenuSection from "../components/shared/MenuSection";
import { menuParent } from "@/data/menuParent";

const StudentPage = () => {
  return (
    <div className="flex justify-center items-center">
      <MenuSection dataMenu={menuParent} />
    </div>
  );
};

export default StudentPage;
