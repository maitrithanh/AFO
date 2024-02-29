"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  pathname: string;
  img?: string;
  active?: boolean;
  alert?: boolean;
  expanded?: boolean;
  child?: any;
  activeChild?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  img,
  text,
  active,
  alert,
  expanded,
  pathname,
  child,
  activeChild,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [showSidebarBg, setShowSidebarBg] = useState(false);
  const [openChild, setOpenChild] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setShowSidebarBg(localStorage.getItem("bgSidebar") === "true");
  }, []);
  return (
    <>
      <li
        onClick={() => {
          router.push(pathname);
          setOpenChild((curr) => !curr);
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
          className={`overflow-hidden transition-all flex justify-between items-center ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {t(text)}{" "}
          {child ? (
            !openChild ? (
              <MdKeyboardArrowRight />
            ) : (
              <MdOutlineExpandMore />
            )
          ) : (
            ""
          )}
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
      {/* child */}
      {openChild && child ? (
        <ul
          className={`${
            openChild ? "h-fit " : "h-0"
          } transition-all duration-500 bg-gray-100 rounded-lg`}
        >
          {child.map((item: any) => {
            return (
              <li
                key={item.text}
                onClick={() => {
                  router.push(item.pathname);
                }}
                className={`relative flex items-center py-2 px-3 h-12  my-1 font-thin rounded-xl cursor-pointer duration-300 hover:scale-105 transition-all 
            group ${showSidebarBg ? "bg-[#dad9d963]" : ""}
          ${
            pathName === item.pathname
              ? "bg-gradient-to-tr from-[#F8853E] to-[#F8853E] text-white"
              : "hover:bg-[#ffb07f7d]"
          }`}
              >
                {img ? (
                  <Image
                    src={`/icons/${item.img}`}
                    width={24}
                    height={24}
                    alt={item.text}
                    loading="lazy"
                  />
                ) : (
                  <>{item.icon}</>
                )}

                <span
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }`}
                >
                  {item.text}
                </span>
                {alert ? (
                  pathName === item.pathname ? (
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
                    {item.text}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default SidebarItem;
