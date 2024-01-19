import React from "react";
import ShortProfile from "../../profile/ShortProfile";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { IoIosSearch } from "react-icons/io";
import { LuMenu } from "react-icons/lu";
import Menu from "./Menu";
import DropdownNotification from "../../Header/DropdownNotification";
import DropdownMessage from "../../Header/DropdownMessage";
import Image from "next/image";

interface navbarProps {
  admin?: boolean;
}

const Navbar: React.FC<navbarProps> = ({ admin = false }) => {
  const token = getCookie("token", { cookies });
  return (
    <div className="h-18 w-full bg-white">
      {admin ? (
        <div className="p-4 w-full flex justify-between items-center">
          <form className="">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#F8853E] focus:border-[#F8853E] "
                placeholder="Từ khoá..."
                required
              />
              {/* <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-[#F8853E] hover:bg-[#e67540] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Tìm kiếm
              </button> */}
            </div>
          </form>
          <ul className="flex gap-2">
            <DropdownNotification />
            <DropdownMessage />
          </ul>
        </div>
      ) : (
        <div className="border-b w-full">
          <div className="relative h-[33px] w-full bg-blue-600 mb-1">
            <div className="absolute bg-main w-[480px] h-[39px] right-0 top-0 clipPath"></div>
          </div>
          <div className="md:mx-20">
            <div className="p-2 flex justify-between text-center items-center">
              <div className="flex items-center">
                <Link
                  href={"/"}
                  className="text-2xl font-bold text-main flex items-center"
                >
                  <Image
                    src={"/Logo.png"}
                    width={50}
                    height={50}
                    alt="Logo"
                    loading="lazy"
                  />
                  AFO
                </Link>
              </div>
              <div className="flex items-center">
                <div className="mx-1 hidden md:block">
                  <Menu />
                </div>
                <div className="border p-2 rounded-full hover:bg-black/10 cursor-pointer">
                  <IoIosSearch size={24} />
                </div>
                <div className="ml-2 ">
                  {token ? (
                    <ShortProfile />
                  ) : (
                    <Link
                      href={"/login"}
                      className="py-2 px-4 rounded-full bg-main border-[#ff7446] border-b-4 border-l-4 text-white hover:border-[#ad5839] transition-all"
                    >
                      Đăng nhập
                    </Link>
                  )}
                </div>
                <div className="ml-2 md:hidden block p-2 cursor-pointer">
                  <LuMenu size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
