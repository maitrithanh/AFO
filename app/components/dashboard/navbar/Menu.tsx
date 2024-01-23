"use client";
import React from "react";
import { globalMenu } from "@/data/globalMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FunctionMenu from "./FunctionMenu";

const Menu = () => {
  const pathName = usePathname();
  return (
    <div className="flex justify-center items-center ">
      {!pathName.includes("/parent") ? (
        <ul className="md:flex">
          {globalMenu.map((item: any) => {
            return (
              <li
                key={item.name}
                className={`py-2 px-4 flex mx-1 rounded-full hover:text-white hover:bg-[#d05739c0] cursor-pointer transition-all duration-300 hover:scale-105 ${
                  pathName == item.path ? "bg-main text-white" : ""
                } `}
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <FunctionMenu />
      )}
    </div>
  );
};

export default Menu;
