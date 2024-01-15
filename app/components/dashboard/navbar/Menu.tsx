import React from "react";

const Menu = () => {
  return (
    <div className="flex justify-center items-center">
      <ul className="flex">
        <li className="py-2 px-4 rounded-full hover:text-white hover:bg-main cursor-pointer duration-200">
          Trang chủ
        </li>
        <li className="py-2 px-4 rounded-full hover:text-white hover:bg-main cursor-pointer duration-200">
          Giới thiệu
        </li>
        <li className="py-2 px-4 rounded-full hover:text-white hover:bg-main cursor-pointer duration-200">
          Lớp học
        </li>
        <li className="py-2 px-4 rounded-full hover:text-white hover:bg-main cursor-pointer duration-200">
          Giáo dục
        </li>
        <li className="py-2 px-4 rounded-full hover:text-white hover:bg-main cursor-pointer duration-200">
          Liên hệ
        </li>
        <li className="py-2 px-4 rounded-full hover:text-white hover:bg-main cursor-pointer duration-200">
          Tin tức
        </li>
      </ul>
    </div>
  );
};

export default Menu;
