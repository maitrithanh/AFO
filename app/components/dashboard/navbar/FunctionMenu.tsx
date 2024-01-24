"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Image from "next/image";

const FunctionMenu = () => {
  const router = useRouter();
  const role = getCookie("role")?.toLowerCase();
  const pathName = usePathname();

  const backAction = () => {
    if (pathName === `/${role}`) {
      return;
    }
    history.back();
  };
  return (
    <div className="mx-2 hover:cursor-pointer p-1 flex">
      <div
        className="flex items-center hover:scale-110 transition-all rounded-full p-2 mx-1"
        onClick={() => {
          backAction();
        }}
      >
        <Image src="/icons/back.webp" alt="" width={26} height={26} />
      </div>

      <div
        className="hover:scale-110 transition-all rounded-full p-2 mx-1"
        onClick={() => {
          router.push(`/${role}`);
        }}
      >
        <Image src="/icons/home.webp" alt="" width={26} height={26} />
      </div>

      <div
        className="hover:scale-110 transition-all rounded-full p-2 mx-1"
        onClick={() => {
          router.push(`/${role}`);
        }}
      >
        <Image
          src="/icons/search.webp"
          className=""
          alt=""
          width={26}
          height={26}
        />
      </div>
    </div>
  );
};

export default FunctionMenu;
