"use client";
import React from "react";
import Image from "next/image";
import { menuParent } from "@/data/menuParent";
import { useRouter } from "next/navigation";

const MenuSection = () => {
  const router = useRouter();
  return (
    <div className="mt-14 grid md:grid-cols-4 grid-cols-1 gap-4 h-full">
      {menuParent.map((item: any) => {
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
              className="p-2"
              alt=""
              width={200}
              height={200}
            />
            <div className="absolute top-0 w-full h-full">
              <div className="flex justify-center items-center h-full">
                <Image
                  src={`/icons/${item.image}`}
                  className="p-2"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="absolute flex top-6 w-full justify-center h-full text-lg font-semibold">
                {item.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuSection;
