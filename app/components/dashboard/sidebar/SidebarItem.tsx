"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  pathname: string;
  active?: boolean;
  alert?: boolean;
  expanded?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  alert,
  expanded,
  pathname,
}) => {
  const router = useRouter();

  return (
    <li
      onClick={() => {
        router.push(pathname);
      }}
      className={`relative flex items-center py-2 px-3 h-12 my-1 font-medium rounded-md cursor-pointer transition-colors
      group
    ${
      active
        ? "bg-gradient-to-tr from-[#0070f4] to-[#0070f4] text-white"
        : "hover:bg-indigo-50 text-gray-600"
    }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
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
            className={`absolute right-2 w-2 h-2 rounded bg-[#0070f4] ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )
      ) : (
        ""
      )}

      {!expanded && (
        <div
          className={`absolute left-full w-fit z-10 rounded-md px-2 py-1 ml-6 bg-[#0070f4] text-white text-sm
          invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
