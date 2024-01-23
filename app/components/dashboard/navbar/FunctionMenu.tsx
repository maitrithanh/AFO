"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Image from "next/image";

const FunctionMenu = () => {
  const router = useRouter();
  const role = getCookie("role")?.toLowerCase();

  const backAction = () => {
    history.back();
  };
  return (
    <div className="mx-2 hover:cursor-pointer p-1 flex">
      <div
        className="hover:scale-110 transition-all rounded-full p-2 mx-1"
        onClick={() => {
          router.push(`/${role}`);
        }}
      >
        <Image src="/icons/home.png" alt="" width={26} height={26} />
      </div>

      <div
        className="hover:scale-110 transition-all rounded-full p-2 mx-1"
        onClick={() => {
          router.push(`/${role}`);
        }}
      >
        <Image
          src="/icons/search.png"
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
