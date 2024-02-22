"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
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
    <>
      <div className="relative">
        <Link
          ref={trigger}
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative p-2 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#ffffff50] group shadow-sm"
        >
          <span
            className={`absolute -top-0.5 right-0 bg-rose-600 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? "hidden" : "inline"
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <Image
            src={"/icons/chat.webp"}
            width={20}
            height={20}
            alt=""
            className="group-hover:scale-105 group-hover:rotate-6 transition-all"
          />
        </Link>

        {/* <!-- Dropdown Start --> */}
      </div>
      <div
        className={`fixed w-screen h-screen right-0 top-0 opacity-0 z-50 transition-all duration-300 ${
          dropdownOpen === true
            ? "bg-[#18181875] translate-x-0 opacity-100"
            : "w-0 -translate-x-full"
        }`}
      >
        <div
          ref={dropdown}
          style={{
            background: "url(/bg-chat.webp)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className={`absolute md:w-[400px] md:right-0 top-0 inset-0 h-screen overflow-hidden z-50 `}
        >
          <div className="w-full flex justify-end p-2 text-rose-600 hover:cursor-pointer">
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
            <h5 className="px-3 py-1 text-xl font-bold flex justify-center items-center bg-main w-fit rounded-full text-white text-cool">
              {t("message")}
            </h5>
          </div>

          <ul className="flex flex-col overflow-y-auto h-[90%]">
            <li className="text-left">
              <Link
                className="flex items-center mx-4 my-2 p-2 bg-[#fffc] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                href="/messages"
              >
                <div className="h-12.5 w-12.5 rounded-full mr-2">
                  <Image
                    width={55}
                    height={55}
                    src={"/avatar.webp"}
                    alt="User"
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                    Tên người gửi
                  </h6>
                  <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                    Nội dung nhắn 💪
                  </p>
                  <p className="text-xs">1 phút trước</p>
                </div>
              </Link>
            </li>
            <li className="text-left">
              <Link
                className="flex items-center mx-4 my-2 p-2 bg-[#fffc] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                href="/messages"
              >
                <div className="h-12.5 w-12.5 rounded-full mr-2">
                  <Image
                    width={55}
                    height={55}
                    src={"/avatar.webp"}
                    alt="User"
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                    Tên người gửi
                  </h6>
                  <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                    Nội dung nhắn 💪
                  </p>
                  <p className="text-xs">1 phút trước</p>
                </div>
              </Link>
            </li>
            <li className="text-left">
              <Link
                className="flex items-center mx-4 my-2 p-2 bg-[#fffc] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                href="/messages"
              >
                <div className="h-12.5 w-12.5 rounded-full mr-2">
                  <Image
                    width={55}
                    height={55}
                    src={"/avatar.webp"}
                    alt="User"
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                    Tên người gửi
                  </h6>
                  <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                    Nội dung nhắn 💪
                  </p>
                  <p className="text-xs">1 phút trước</p>
                </div>
              </Link>
            </li>
            <li className="text-left">
              <Link
                className="flex items-center mx-4 my-2 p-2 bg-[#fffc] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                href="/messages"
              >
                <div className="h-12.5 w-12.5 rounded-full mr-2">
                  <Image
                    width={55}
                    height={55}
                    src={"/avatar.webp"}
                    alt="User"
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                    Tên người gửi
                  </h6>
                  <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                    Nội dung nhắn 💪
                  </p>
                  <p className="text-xs">1 phút trước</p>
                </div>
              </Link>
            </li>
            <li className="text-left">
              <Link
                className="flex items-center mx-4 my-2 p-2 bg-[#fffc] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                href="/messages"
              >
                <div className="h-12.5 w-12.5 rounded-full mr-2">
                  <Image
                    width={55}
                    height={55}
                    src={"/avatar.webp"}
                    alt="User"
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                    Tên người gửi
                  </h6>
                  <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                    Nội dung nhắn 💪
                  </p>
                  <p className="text-xs">1 phút trước</p>
                </div>
              </Link>
            </li>
            <li className="text-left">
              <Link
                className="flex items-center mx-4 my-2 p-2 bg-[#fffc] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                href="/messages"
              >
                <div className="h-12.5 w-12.5 rounded-full mr-2">
                  <Image
                    width={55}
                    height={55}
                    src={"/avatar.webp"}
                    alt="User"
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                    Tên người gửi
                  </h6>
                  <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                    Nội dung nhắn 💪
                  </p>
                  <p className="text-xs">1 phút trước</p>
                </div>
              </Link>
            </li>
            <li className="text-left">
              <Link
                className="flex items-center mx-4 my-2 p-2 bg-[#fffc] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                href="/messages"
              >
                <div className="h-12.5 w-12.5 rounded-full mr-2">
                  <Image
                    width={55}
                    height={55}
                    src={"/avatar.webp"}
                    alt="User"
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                    Tên người gửi
                  </h6>
                  <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                    Nội dung nhắn 💪
                  </p>
                  <p className="text-xs">1 phút trước</p>
                </div>
              </Link>
            </li>
            <li className="text-left">
              <Link
                className="flex items-center mx-4 my-2 p-2 bg-[#fffc] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                href="/messages"
              >
                <div className="h-12.5 w-12.5 rounded-full mr-2">
                  <Image
                    width={55}
                    height={55}
                    src={"/avatar.webp"}
                    alt="User"
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                    Tên người gửi
                  </h6>
                  <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                    Nội dung nhắn 💪
                  </p>
                  <p className="text-xs">1 phút trước</p>
                </div>
              </Link>
            </li>
            <li className="text-left">
              <Link
                className="flex items-center mx-4 my-2 p-2 bg-[#fffc] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                href="/messages"
              >
                <div className="h-12.5 w-12.5 rounded-full mr-2">
                  <Image
                    width={55}
                    height={55}
                    src={"/avatar.webp"}
                    alt="User"
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                    Tên người gửi
                  </h6>
                  <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                    Nội dung nhắn 💪
                  </p>
                  <p className="text-xs">1 phút trước</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DropdownMessage;
