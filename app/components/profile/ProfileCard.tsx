"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetch from "@/utils/useFetch";
import Button from "../Button";

const ProfileCard = () => {
  const { data: currentUser, loading } = useFetch("Auth/current");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingPage = () => {
      setIsLoading(true);
      if (loading === false) {
        setIsLoading(false);
      }
    };
    loadingPage();
  }, [loading]);

  return (
    <div>
      <div className="flex justify-center items-center h-full w-full ">
        <div className="relative h-full w-full bg-gradient-to-b sm:max-w-[840px] sm:p-8 rounded-xl">
          <div className="flex items-center mx-2">
            {isLoading ? (
              <div className="flex">
                <div className="bg-slate-200 flex border-b h-[64px] w-[64px] rounded-full animate-pulse"></div>
                <div className="ml-4">
                  <div className="bg-slate-200 flex border-b mb-4 h-[30px] w-[100px] rounded-lg animate-pulse"></div>
                  <div className="bg-slate-200 flex border-b h-[10px] w-[100px] rounded-lg animate-pulse"></div>
                </div>
              </div>
            ) : (
              <>
                <Image
                  src="/avatar.jpg"
                  alt="123"
                  className={`w-16 h-16 rounded-full cursor-pointer`}
                  width={100}
                  height={100}
                  onClick={() => {}}
                />
                <div className="ml-4">
                  <p className="font-bold text-2xl">{currentUser?.fullName}</p>
                  <p className="text-main">{currentUser?.level}</p>
                </div>
              </>
            )}
          </div>

          {isLoading ? (
            <div className="shadow-lg border p-8 pt-4 my-4 rounded-xl bg-white animate-pulse">
              <div className="bg-slate-200 flex border-b mb-4 h-[30px] rounded-lg"></div>
              <div className="flex mt-1">
                <p className="bg-slate-200 h-[20px] rounded-lg w-[120px]"></p>
                <p className="bg-slate-200 h-[20px] rounded-lg w-full ml-4"></p>
              </div>
              <div className="flex mt-4">
                <p className="bg-slate-200 h-[20px] rounded-lg w-[120px]"></p>
                <p className="bg-slate-200 h-[20px] rounded-lg w-full ml-4 "></p>
              </div>
            </div>
          ) : (
            <div className="shadow-lg border p-8 pt-4 my-4 rounded-xl bg-white">
              <div className="text-main sm:text-2xl text-xl font-bold flex border-b mb-4">
                Thông tin cá nhân
              </div>
              <div className="flex mt-1">
                <p className="sm:text-lg text-md font-medium w-[120px]">
                  Họ tên
                </p>
                <p className="sm:text-lg text-md font-semibold ml-4 ">
                  {currentUser?.fullName}
                </p>
              </div>
              <div className="flex mt-2">
                <p className="sm:text-lg text-md font-medium w-[120px]">
                  Ngày sinh
                </p>
                <p className="sm:text-lg text-md font-semibold ml-4 ">
                  {currentUser?.birthDay}
                </p>
              </div>
              <div className="flex mt-2">
                <p className="sm:text-lg text-md font-medium w-[120px]">
                  Giới tính
                </p>
                <p className="sm:text-lg text-md font-semibold ml-4 ">
                  {currentUser?.gender == 1 ? "Nam" : "Nữ"}
                </p>
              </div>

              <div className="flex mt-2">
                <p className="sm:text-lg text-md font-medium w-[120px]">
                  Quốc tịch
                </p>
                <p className="sm:text-lg text-md font-semibold ml-4 ">
                  {currentUser?.nation}
                </p>
              </div>

              <div className="flex mt-2">
                <p className="sm:text-lg text-md font-medium w-[120px]">
                  Địa chỉ
                </p>
                <p className="sm:text-lg text-md font-semibold ml-4 ">
                  {currentUser?.address}
                </p>
              </div>
            </div>
          )}

          <Button label="Xem album" onClick={() => {}} custom="mt-4" />
          <Button label="Đổi mật khẩu" onClick={() => {}} custom="mt-4" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
