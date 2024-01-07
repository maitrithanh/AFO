"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SidebarItem from "./SidebarItem";
import { menu } from "@/data/menu";
import { usePathname } from "next/navigation";
import { IoSettingsOutline, IoHelpCircleOutline } from "react-icons/io5";
import ShortProfile from "../../profile/ShortProfile";

const Sidebar = () => {
  const pathName = usePathname();
  const [expanded, setExpanded] = useState(true);

  //Expanded sidebar if width screen > 912
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 912) {
        console.log(window.innerWidth);

        setExpanded(false);
      } else {
        setExpanded(true);
      }
    });
  }, []);

  return (
    <div className="h-screen min-h-full">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm ">
        <div className="p-4 pb-2 mb-4 flex justify-between items-center">
          <Image
            priority
            src="/logo.png"
            alt="Logo"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            width={200}
            height={200}
          />
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

        <ul className="flex-1 px-3">
          {menu.map((menuItem: any) => {
            return (
              <SidebarItem
                key={menuItem.text}
                icon={<menuItem.icon size={22} />}
                text={menuItem.text}
                pathname={menuItem.pathname}
                active={pathName == menuItem.pathname}
                expanded={expanded}
              />
            );
          })}
          <hr className="my-3" />
          <SidebarItem
            icon={<IoSettingsOutline size={22} />}
            text="Cài đặt"
            pathname={"/dashboard/settings"}
            active={pathName == "/dashboard/settings"}
            expanded={expanded}
          />
          <SidebarItem
            icon={<IoHelpCircleOutline size={22} />}
            text="Trợ giúp"
            pathname={"/dashboard/help"}
            active={pathName == "/dashboard/help"}
            expanded={expanded}
          />
        </ul>

        <ShortProfile expanded={expanded} borderTop />
      </nav>
    </div>
  );
};

export default Sidebar;
