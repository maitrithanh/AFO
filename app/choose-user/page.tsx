"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { setCookie } from "cookies-next";

const ChooseUserPage = () => {
  const router = useRouter();
  const saveIdChild = (id: string) => {
    setCookie("child", id);
    router.push("/parent");
  };
  return (
    <div
      style={{
        backgroundImage: `url(/bg-sky.webp)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-screen h-screen flex justify-center items-center"
    >
      <div className="">
        <div className="flex items-center justify-center m-4 text-[50px] font-bold text-main italic text-cool px-4 ">
          VUI LÒNG CHỌN THÔNG TIN BÉ?
        </div>
        <div className="flex gap-4 mx-2 justify-center items-center">
          <div className="group" onClick={() => saveIdChild("123123")}>
            <div className="relative cursor-pointer rounded-full hover:border-main border-4">
              <div className="">
                <Image
                  className="rounded-full"
                  src={"/avatar.webp"}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
            </div>
            <div className="flex justify-center items-center p-2 text-xl group-hover:font-bold">
              Họ Và Tên
            </div>
          </div>

          <div className="group" onClick={() => saveIdChild("99999999")}>
            <div className="relative cursor-pointer rounded-full hover:border-main border-4 ">
              <div className="">
                <Image
                  className="rounded-full"
                  src={"/avatar.webp"}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
            </div>
            <div className="flex justify-center items-center p-2 text-xl group-hover:font-bold">
              Họ Và Tên
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUserPage;
