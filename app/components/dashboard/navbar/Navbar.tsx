"use client";
import React, { useEffect, useState } from "react";
import ShortProfile from "../../profile/ShortProfile";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { IoIosSearch } from "react-icons/io";
import { LuMenu } from "react-icons/lu";
import Menu from "./Menu";
import DropdownNotification from "../../Header/DropdownNotification";
import DropdownMessage from "../../Header/DropdownMessage";
import Image from "next/image";
import FunctionMenu from "./FunctionMenu";
import { usePathname } from "next/navigation";

interface navbarProps {
  admin?: boolean;
}

const Navbar: React.FC<navbarProps> = ({ admin = false }) => {
  const token = getCookie("token");
  const role = getCookie("role")?.toLocaleLowerCase();
  const [login, setLogin] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (token) {
      setLogin(true);
    }
  }, [token]);

  const handleMobileMenu = () => {
    setMobileMenu((curr) => !curr);
  };

  return (
    <div className="h-18 w-full">
      {admin ? (
        <div className="p-4 w-full flex justify-between items-center bg-white">
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
                className="block md:w-[300px] w-full p-4 ps-10 border-gray-100 border outline-none text-sm text-gray-900 rounded-full shadow-md bg-gray-50 focus:ring-[#F8853E] focus:border-[#F8853E] "
                placeholder="Từ khoá..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2 bg-[#F8853E] hover:bg-[#e67540 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2"
              >
                Tìm
              </button>
            </div>
          </form>
          <ul className="flex gap-2 mx-2">
            <DropdownNotification />
            <DropdownMessage />
          </ul>
        </div>
      ) : (
        <div
          style={{ backgroundImage: `url(/bg-big.jpg)` }}
          className="w-full text-white font-bold uppercase fixed z-30 top-0"
        >
          {/* <div className="relative h-[38px] w-full bg-blue-600 mb-1 flex items-center">
            <FunctionMenu />
            <div className="absolute bg-main md:w-[480px] w-full h-[43px] right-0 top-0 clipPath flex items-center">
              <div className="absolute ml-4 w-fit p-1 flex left-0 cursor-pointer items-center rounded-full hover:bg-[#ffffff7d] hover:text-gray-700">
                <IoIosSearch size={24} />
              </div>
            </div>
          </div> */}

          <div className="md:mx-20">
            <div className="p-2 flex justify-between text-center items-center">
              <div className="flex items-center">
                <Link
                  href={role ? `/${role}` : "/"}
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
                <div className={`mx-2 p-1 hidden md:block  rounded-full `}>
                  <Menu />
                </div>
                <div className="ml-2 text-black bg-white rounded-full">
                  {login ? (
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
                <div
                  className="relative ml-2 md:hidden block p-2 cursor-pointer"
                  onClick={() => handleMobileMenu()}
                >
                  <div className="text-main">
                    <LuMenu size={24} />
                  </div>
                  <div
                    className={`absolute right-0 p-1 bg-main rounded-lg w-[200px] ${
                      mobileMenu ? "block" : "hidden md:block"
                    }`}
                  >
                    <Menu />
                  </div>
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
