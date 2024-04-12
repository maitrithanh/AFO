"use client";
import React, { useEffect, useState } from "react";
import ShortProfile from "../../profile/ShortProfile";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { LuMenu } from "react-icons/lu";
import Menu from "./Menu";
import DropdownNotification from "../../Header/DropdownNotification";
import DropdownMessage from "../../Header/DropdownMessage";
import Image from "next/image";
import Languages from "../../shared/Languages";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { IoApps } from "react-icons/io5";
import { usePathname } from "next/navigation";

interface navbarProps {
  admin?: boolean;
  home?: boolean;
}

const Navbar: React.FC<navbarProps> = ({ admin = false, home = false }) => {
  const token = getCookie("token");
  const [login, setLogin] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isStickyNav, setIsStickyNav] = useState(false);
  const { t } = useTranslation();
  const role = getCookie("role");
  const pathName = usePathname();

  useEffect(() => {
    if (token) {
      setLogin(true);
    }
  }, [token]);

  const handleMobileMenu = () => {
    setMobileMenu((curr) => !curr);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const isSticky = (e: any) => {
    const scrollTop = window.scrollY;
    scrollTop >= 20 ? setIsStickyNav(true) : setIsStickyNav(false);
  };

  return (
    <div className="h-18 w-full">
      {admin ? (
        <div className="p-4 w-full flex justify-between items-center bg-white">
          <div>
            <Languages />
          </div>
          <div className="flex items-center">
            <ul className="flex gap-2 mx-2 ">
              <DropdownNotification />
              <DropdownMessage />
            </ul>
            <div>
              <ShortProfile />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-full  transition-all duration-300 ${
            home ? "" : "text-white"
          } ${isStickyNav ? "fixed" : "absolute"}  z-40 top-0  ${
            home
              ? isStickyNav
                ? "bg-[#ffffffb3] backdrop-blur-xl shadow-lg"
                : " "
              : "bg-[url(/bg-big.webp)] "
          }`}
        >
          <div className="md:mx-20">
            <div className="p-2 flex justify-between text-center items-center">
              <div className="flex items-center">
                <Link
                  href={`/`}
                  className="text-2xl font-bold text-main flex items-center"
                >
                  <Image
                    src={"/Logo.webp"}
                    width={50}
                    height={50}
                    alt="Logo"
                    loading="lazy"
                  />
                  AFO
                </Link>
                <Languages />
              </div>
              <div className="flex items-center">
                <div className={`mx-2 p-1 hidden xl:block rounded-full `}>
                  <Menu />
                </div>
                {!home ? (
                  <div className="flex gap-2 mr-6 text-black list-none">
                    <DropdownNotification />
                    <DropdownMessage />
                  </div>
                ) : (
                  ""
                )}

                <div className=" text-black bg-white rounded-full">
                  {login ? (
                    <div className="flex items-center justify-center">
                      <ShortProfile />
                      <div className="mx-4 text-main hover:scale-110 transition-all">
                        <Link
                          href={`/${role?.toLowerCase()}`}
                          title="Trở lại trang ứng dụng"
                        >
                          <IoApps size={24} />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={"/login"}
                      className="py-2 md:px-4 px-2 rounded-full bg-main border-[#ff7446] border-b-4 border-l-4 text-white hover:border-[#ad5839] transition-all"
                    >
                      {t("login")}
                    </Link>
                  )}
                </div>

                <div
                  className={`relative ml-2 xl:hidden block p-2 cursor-pointer ${
                    home ? "" : "hidden"
                  }`}
                  onClick={() => handleMobileMenu()}
                >
                  <div className="text-main">
                    <LuMenu size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`fixed text-main transition-all top-0 opacity-0 bg-white flex items-start duration-500 text-4xl rounded-lg w-screen h-screen z-50 ${
          mobileMenu ? " translate-x-0 opacity-100" : "w-0 translate-x-full"
        }`}
      >
        <div
          className="absolute right-4 top-4 text-rose-600"
          onClick={() => {
            setMobileMenu(false);
          }}
        >
          <IoClose />
        </div>
        <div
          className="p-12"
          onClick={() => {
            handleMobileMenu();
          }}
        >
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
