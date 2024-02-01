"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { setCookie } from "cookies-next";
import useFetch from "@/utils/useFetch";
import DefaultImage from "../components/defaultImage";
import { useTranslation } from "react-i18next";

const ChooseUserPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { data: listChild } = useFetch("parent/childrenlist");

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
        <div className="flex items-center justify-center m-4 text-[50px] font-bold text-main italic text-cool px-4 uppercase">
          {t("chooseUser")}
        </div>
        <div className="flex gap-4 mx-2 justify-center items-center">
          {listChild?.map((childInfo: any) => {
            return (
              <div
                key={childInfo.id}
                className="group"
                onClick={() => saveIdChild(childInfo.id)}
              >
                <div className="relative cursor-pointer rounded-full hover:border-main border-4">
                  <div className="">
                    <DefaultImage
                      img={childInfo.avatar}
                      fallback="/avatar.webp"
                      custom="w-[200px] h-[200px]"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center p-2 text-xl group-hover:font-bold">
                  {childInfo.fullName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChooseUserPage;
