"use client";
import { MdArrowBackIosNew } from "react-icons/md";

const BackAction = () => {
  return (
    <div
      className="text-main w-fit group hover:cursor-pointer mb-2"
      onClick={() => history.back()}
    >
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
