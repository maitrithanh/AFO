"use client";
import React from "react";
import { globalMenu } from "@/data/globalMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FunctionMenu from "./FunctionMenu";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const pathName = usePathname();
  const isRole = pathName.includes("/parent") || pathName.includes("/teacher");
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center ">
      {!isRole ? (
        <ul className="xl:flex">
          {globalMenu.map((item: any) => {
            return (
              <li
                key={item.name}
                className={`py-1 px-1 flex mx-4 hover:border-b-[4px] hover:border-main cursor-pointer transition-all duration-300 hover:scale-105 ${
                  pathName == item.path
                    ? "border-b-[4px] border-main font-bold"
                    : ""
                } `}
              >
                <Link href={item.path}>{t(item.name)}</Link>
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
