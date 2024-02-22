"use client";
import { MdArrowBackIosNew } from "react-icons/md";

const BackAction = () => {
  return (
    <div className="text-main w-fit group hover" onClick={() => history.back()}>
      <div className="flex items-center">
        <div className="group-hover:-translate-x-2 transition-all ">
          <MdArrowBackIosNew />
        </div>
        Trở lại
      </div>
    </div>
  );
};

export default BackAction;
