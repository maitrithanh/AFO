"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SchoolFeeHeader from "@/app/components/parent/schoolfee/SchoolFeeHeader";
import SchoolFee from "@/app/components/parent/schoolfee/SchoolFee";
import SchoolFeeFooter from "@/app/components/parent/schoolfee/SchoolFeeFooter";
import { getCookie } from "cookies-next";
import useFetch from "@/utils/useFetch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HealthPage = () => {
  const child = getCookie("child");
  const { data: listChild } = useFetch("parent/childrenlist");
  const infoChild = listChild?.find((x: any) => x.id == child);
  const day = new Date();
  let month = day.getMonth();
  const [getMonth, setGetMonth] = useState(month + 1);

  const { data: healthData } = useFetch(
    `Healthy/getListChildHealthy?childId=${infoChild?.id}`
  );

  return (
    <div className="md:w-2/3 w-full m-auto rounded-lg bg-white p-4 md:p-10">
      <div className="pb-2 w-full">
        <div className="md:flex justify-between items-center">
          <div>
            <p className="w-fit rounded-2xl text-2xl font-bold ">
              Thông tin sức khoẻ bé:
              <span className="text-main mx-2">{infoChild?.fullName}</span>
              {/* Tháng {getMonth} */}
            </p>
            <p>Sức khoẻ sẽ được cập nhật mỗi tháng</p>
          </div>
          <div>
            {/* <div className="bg-gray-100 shadow-sm rounded-lg">
              <Select
                onValueChange={(value: any) => {
                  setGetMonth(value);
                }}
              >
                <SelectTrigger className="md:w-[140px] w-full text-lg">
                  <p className="text-gray-600">
                    <MdCalendarMonth />
                  </p>
                  <SelectValue
                    placeholder={"Tháng " + getMonth}
                    defaultValue={month}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Tháng 1</SelectItem>
                  <SelectItem value="2">Tháng 2</SelectItem>
                  <SelectItem value="3">Tháng 3</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </div>
      </div>

      <div className="">
        {/* <div className="text-xl font-bold w-full flex justify-center items-center italic text-main">
          Sức khoẻ tháng {month + 1}
        </div> */}
        {healthData?.map((health: any) => {
          return (
            <div
              key={health?.examDate}
              className="relative p-4 bg-white w-full shadow-lg my-4 rounded-lg"
            >
              <div className="flex text-lg font-bold items-center">
                <p>Sức khoẻ {health?.examDate}</p>
                <p
                  className={`text-sm font-normal ml-4 w-fit px-2 h-8 flex justify-center items-center ${
                    health?.status
                      ? health?.status == "Khỏe Mạnh"
                        ? "bg-green-500"
                        : "bg-rose-500"
                      : "bg-yellow-500"
                  }  text-white p-1 rounded-full`}
                >
                  {health?.status ? health?.status : `Chưa khám`}
                </p>
              </div>
              <div className="w-full">
                <div className="flex justify-between text-lg text-black border-b border-dashed py-1">
                  <p className="mr-2">Chiều cao:</p>
                  <p className="font-bold">{health?.height} cm</p>
                </div>
                <div className="flex justify-between text-lg text-black border-b border-dashed  py-1">
                  <p className="mr-2">Cân nặng:</p>
                  <p className="font-bold">{health?.weight} kg</p>
                </div>
                <div className="flex justify-between text-lg text-black border-b border-dashed  py-1">
                  <p className="mr-2">BMI:</p>
                  <p className="font-bold">{health?.bmi}</p>
                </div>
                <div className="flex justify-between text-lg text-black border-b  py-1">
                  <p className="mr-2">Mắt:</p>
                  <p className="font-bold">{health?.eye}</p>
                </div>
                <div className="flex justify-between text-lg text-black pt-2 border-t ">
                  <p className="mr-2">Trạng thái:</p>
                  <p className="font-bold text-main">
                    Sức khoẻ {health?.status}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HealthPage;
