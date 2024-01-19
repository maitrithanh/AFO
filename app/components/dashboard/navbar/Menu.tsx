"use client";
import React from "react";
import { globalMenu } from "@/data/globalMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathName = usePathname();
  return (
    <div className="flex justify-center items-center">
      <ul className="flex">
        {globalMenu.map((item: any) => {
          return (
            <li
              key={item.name}
              className={`py-2 px-4 rounded-full hover:text-white hover:bg-main cursor-pointer duration-200 ${
                pathName == item.path ? "bg-main text-white" : ""
              } `}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
