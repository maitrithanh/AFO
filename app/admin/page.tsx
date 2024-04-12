"use client";
import React from "react";
import { menu } from "@/data/menu";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="w-full bg-white shadow-3xl rounded-md p-4 flex justify-center items-center">
      <div className="my-16 grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-6 h-full">
        {menu.map((item: any) => {
          return (
            <div
              onClick={() =>
                router.push(
                  `${item.child ? item.child[0].pathname : item.pathname}`
                )
              }
              key={item.name}
              style={{ backgroundColor: item.color }}
              className={`relative hover:scale-105 cursor-pointer border-2 border-gray-100 hover:border-orange-200 shadow-3xl transition-all max-w-[200px] max-h-[#200px] rounded-xl`}
            >
              <Image
                src={`/bg-card.webp`}
                className="p-2 invisible"
                alt=""
                width={200}
                height={200}
              />
              <div className="absolute top-0 w-full h-full">
                <div className="flex justify-center items-center h-full">
                  <Image
                    src={`/icons/${item.img}`}
                    className="p-2 mt-4 md:w-[100px] w-[55px]"
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <div className="absolute flex md:top-6 top-4 w-full justify-center h-full md:text-lg text-sm font-thin">
                  {t(item.text)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
