"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
        className="relative p-2 flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] bg-gray-50 border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <Image src={"/icons/notification.png"} width={24} height={24} alt="" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        style={{
          backgroundImage: `url("/bg-noti.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className={`absolute -right-8 sm:right-0 w-[300px] sm:w-80 mt-2.5 flex h-90 w-75 flex-col rounded-lg border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark  z-50 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4.5 py-2 flex justify-center">
          <h5 className="px-2 py-1 text-xl font-bold flex justify-center items-center bg-main w-fit rounded-full text-white text-cool">
            Thông báo
          </h5>
        </div>

        <ul className="flex flex-col overflow-y-auto h-[300px]">
          <li>
            <Link
              className="flex mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg flex-col gap-1  py-2 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 "
              href="#"
            >
              <p className="font-semibold text-gray-500 ">Tên thông báo</p>
              <p className="text-sm">Nội dung thông báo</p>

              <p className="text-xs italic text-gray-500">12/2/2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg flex-col gap-1  py-2 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 "
              href="#"
            >
              <p className="font-semibold text-gray-500 ">Tên thông báo</p>
              <p className="text-sm">Nội dung thông báo</p>

              <p className="text-xs italic text-gray-500">12/2/2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg flex-col gap-1  py-2 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 "
              href="#"
            >
              <p className="font-semibold text-gray-500 ">Tên thông báo</p>
              <p className="text-sm">Nội dung thông báo</p>

              <p className="text-xs italic text-gray-500">12/2/2025</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownNotification;
