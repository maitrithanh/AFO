"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SidebarItem from "./SidebarItem";
import { menu } from "@/data/menu";
import { usePathname } from "next/navigation";
import { IoSettingsOutline, IoHelpCircleOutline } from "react-icons/io5";
import ShortProfile from "../../profile/ShortProfile";
import { useTranslation } from "next-i18next";

const Sidebar = () => {
  const pathName = usePathname();
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const [showSidebarBg, setShowSidebarBg] = useState(false);

  useEffect(() => {
    setShowSidebarBg(localStorage.getItem("bgSidebar") === "true");
  }, []);

  //Expanded sidebar if width screen < 912
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 912) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    });
  });

  return (
    <>
      <div
        className="md:hidden block fixed top-24 right-2 bg-white p-2 rounded-full z-40 shadow-lg transition-all"
        onClick={() => {
          setExpanded((curr) => !curr);
        }}
      >
        <Image
          src={"/icons/menuSidebar.webp"}
          width={30}
          height={30}
          alt="Menu"
        />
      </div>
      <div
        className={`relative z-40 h-screen min-h-full transition-all ${
          !expanded
            ? "md:w-[72px] w-0 md:block hidden"
            : "md:w-[290px] md:block "
        }`}
      >
        <nav
          style={{
            backgroundImage: ` ${
              showSidebarBg ? `url("/bg-sidebar.webp")` : ""
            }`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backdropFilter: "sepia(10%)",
          }}
          className="h-screen min-h-full flex flex-col bg-white border-r shadow-sm fixed w-full md:w-fit"
        >
          <div className="p-4 pb-2 mb-2 flex justify-between items-center">
            <Image
              priority
              src="/Logo.webp"
              alt="Logo"
              className={`overflow-hidden transition-all  ${
                expanded ? "w-[52px]" : "w-0"
              }`}
              width={200}
              height={200}
            />
            <p className="text-2xl">{!expanded ? "" : "AFO"}</p>
            <button
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              onClick={() => {
                setExpanded((curr) => !curr);
              }}
            >
              {expanded ? (
                <IoIosArrowBack size={20} />
              ) : (
                <IoIosArrowForward size={20} />
              )}
            </button>
          </div>

          <ul
            className="flex-1 px-3 overflow-y-auto overflow-x-hidden"
            onClick={() => {
              setExpanded((curr) => !curr);
            }}
          >
            {menu.map((menuItem: any) => {
              return (
                <SidebarItem
                  key={menuItem.text}
                  img={`/icons/${menuItem.img}`}
                  icon={<menuItem.icon size={22} />}
                  text={menuItem.text}
                  pathname={menuItem.pathname}
                  active={pathName.includes(menuItem.pathname)}
                  expanded={expanded}
                />
              );
            })}
            <hr className="my-3" />
            <SidebarItem
              icon={<IoSettingsOutline size={22} />}
              img={"/icons/settings.webp"}
              text={t("setting")}
              pathname={"/admin/settings"}
              active={pathName == "/admin/settings"}
              expanded={expanded}
            />
            <SidebarItem
              icon={<IoHelpCircleOutline size={22} />}
              text={t("support")}
              img={"/icons/qa.webp"}
              pathname={"/admin/help"}
              active={pathName == "/admin/help"}
              expanded={expanded}
            />
          </ul>
          <ShortProfile expanded={expanded} borderTop />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
