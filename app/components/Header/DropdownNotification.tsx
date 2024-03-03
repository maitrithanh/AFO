"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";

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

  const { t } = useTranslation();
  return (
    <div>
      <div className="relative">
        <div>
          <Link
            ref={trigger}
            onClick={() => {
              setNotifying(false);
              setDropdownOpen(!dropdownOpen);
            }}
            href="#"
            className="p-2 flex h-8.5 w-8.5 items-center justify-center rounded-full group bg-[#ffffff50] hover:text-primary shadow-sm"
          >
            <span
              className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
                notifying === false ? "hidden" : "inline"
              }`}
            >
              <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
            </span>

            <Image
              src={"/icons/notification.webp"}
              width={20}
              height={20}
              alt=""
              className="group-hover:scale-105 group-hover:rotate-6 transition-all"
            />
          </Link>
        </div>
      </div>
      <div
        className={`fixed w-screen h-screen right-0 opacity-0 top-0 z-50 transition-all duration-300 ${
          dropdownOpen === true
            ? "bg-[#18181875] opacity-100"
            : "w-0 -translate-x-full"
        }`}
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          // style={{
          //   backgroundImage: `url("/bg-noti.webp")`,
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "cover",
          // }}
          className={`bg-white absolute md:w-[400px] transition-all duration-500 md:right-0 top-0 inset-0 left-0 h-screen z-50 hover:cursor-pointer overflow-hidden `}
        >
          <div className="w-full flex justify-end text-rose-600 ">
            <div
              className="bg-white p-1 rounded-md"
              onClick={() => {
                setDropdownOpen(false);
              }}
            >
              <IoClose size={24} />
            </div>
          </div>
          <div className="px-4.5 py-2 flex justify-center">
            <h5 className="px-2 py-1 text-xl font-bold flex justify-center items-center bg-main w-fit rounded-full text-white text-cool">
              {t("notification")}
            </h5>
          </div>

          <ul className="flex flex-col overflow-y-auto h-[90%]">
            <li>
              <Link
                className="flex mx-4 text-left my-2 p-2 bg-[#ffffff68] rounded-lg flex-col gap-1  py-2 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 "
                href="#"
              >
                <p className="font-semibold text-gray-500 ">Tên thông báo</p>
                <p className="text-sm">Nội dung thông báo</p>

                <p className="text-xs italic text-gray-500">12/2/2025</p>
              </Link>
            </li>
            <li>
              <Link
                className="flex mx-4 text-left my-2 p-2 bg-[#ffffff68] rounded-lg flex-col gap-1  py-2 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 "
                href="#"
              >
                <p className="font-semibold text-gray-500 ">Tên thông báo</p>
                <p className="text-sm">Nội dung thông báo</p>

                <p className="text-xs italic text-gray-500">12/2/2025</p>
              </Link>
            </li>
            <li>
              <Link
                className="flex mx-4 text-left my-2 p-2 bg-[#ffffff68] rounded-lg flex-col gap-1  py-2 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 "
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
    </div>
  );
};

export default DropdownNotification;
