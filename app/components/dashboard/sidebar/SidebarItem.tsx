"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  pathname: string;
  img?: string;
  active?: boolean;
  alert?: boolean;
  expanded?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  img,
  text,
  active,
  alert,
  expanded,
  pathname,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [showSidebarBg, setShowSidebarBg] = useState(false);

  useEffect(() => {
    setShowSidebarBg(localStorage.getItem("bgSidebar") === "true");
  }, []);
  return (
    <li
      onClick={() => {
        router.push(pathname);
      }}
      className={`relative flex items-center py-2 px-3 h-12  my-1 font-thin rounded-xl cursor-pointer duration-300 hover:scale-105 transition-all 
      group ${showSidebarBg ? "bg-[#dad9d963]" : ""}
    ${
      active
        ? "bg-gradient-to-tr from-[#F8853E] to-[#F8853E] text-white"
        : "hover:bg-[#ffb07f7d]"
    }`}
    >
      {img ? (
        <Image src={img} width={24} height={24} alt={img} loading="lazy" />
      ) : (
        <>{icon}</>
      )}

      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {t(text)}
      </span>
      {alert ? (
        active ? (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-[#ef2727] ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        ) : (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-[#F8853E] ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )
      ) : (
        ""
      )}

      {!expanded && (
        <div
          className={`absolute left-full w-fit z-10 rounded-md px-2 py-1 ml-6 bg-[#F8853E] text-white text-sm
          invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
