"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface MenuSectionProps {
  dataMenu: any;
}

const MenuSection: React.FC<MenuSectionProps> = ({ dataMenu }) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="mt-14 grid md:grid-cols-4 grid-cols-3 gap-4 h-full">
      {dataMenu.map((item: any) => {
        return (
          <div
            onClick={() => {
              router.push(`${item.path}`);
            }}
            key={item.name}
            className="relative hover:scale-105 cursor-pointer transition-all"
          >
            <Image
              src={`/bg-card.webp`}
              className="p-2 "
              alt=""
              width={200}
              height={200}
            />
            <div className="absolute top-0 w-full h-full">
              <div className="flex justify-center items-center h-full">
                <Image
                  src={`/icons/${item.image}`}
                  className="p-2 mt-4 md:w-[100px] w-[55px]"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="absolute flex md:top-6 top-4 w-full justify-center h-full md:text-lg text-sm font-thin">
                {t(item.name)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuSection;
