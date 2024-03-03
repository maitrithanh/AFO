"use client";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/shared/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { CiCircleMore } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const BurnOutPage = () => {
  const [closeDialogBurnOut, setCloseDialogBurnOut] = useState(false);

  const onClose = () => {
    setCloseDialogBurnOut((curr) => !curr);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      RouteName: "",
      StationStart: "",
      StationEnd: "",
      StartTime: "",
      EndTime: "",
      DriverId: "",
      BusID: "",
      Status: "",
    },
  });
  const DialogBurnOut = (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="bg-white p-4 rounded-xl md:w-1/3 mx-4 w-full h-fit">
        <div className="flex justify-between items-center mb-4 py-2 border-b">
          <div className="flex">
            <h3 className="text-2xl ">Xin nghỉ ngày</h3>
            <div className="bg-gray-100 shadow-sm rounded-lg ml-2 ">
              <Select>
                <SelectTrigger className="w-[180px] text-black">
                  <SelectValue placeholder="03/03/2024" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">04/03/2024</SelectItem>
                  <SelectItem value="2">05/03/2024</SelectItem>
                  <SelectItem value="3">06/03/2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <button
            className="text-gray-600"
            onClick={() => {
              onClose();
            }}
          >
            <IoMdClose size={28} />
          </button>
        </div>
        <div className="grid gap-4 my-4">
          <div className="border-2 border-slate-300 rounded-md p-4">
            <p className="text-xl">Họ tên: Nguyễn Văn</p>
          </div>
          <textarea
            {...register("content", { required: true })}
            className="border-2 rounded-md p-4 text-xl w-full pt-4 outline-none bg-white font-light transition border-slate-300 h-[413px]"
            name="content"
            required
            placeholder="Lý do"
          ></textarea>
        </div>

        <Button label="Gửi" onClick={() => {}} />
      </div>
    </div>
  );
  return (
    <div className="h-[600px] bg-white md:w-3/4 m-auto rounded-xl">
      <div className="relative overflow-x-auto  bg-white pt-2 sm:rounded-lg">
        {closeDialogBurnOut ? DialogBurnOut : ""}
        <div className="p-4">
          <p className="text-3xl flex justify-center items-center pb-4 border-b mb-4">
            Lịch sử xin nghỉ
          </p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl">Họ tên: Nguyễn Văn A</p>
              <p className="text-xl">Lớp: Mầm 1</p>
            </div>
            <div>
              <Button
                label="Tạo đơn xin nghỉ"
                onClick={() => {
                  onClose();
                }}
              />
            </div>
          </div>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="">
                  <th scope="col" className="px-6 py-3">
                    Ngày
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lý do
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>

                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">01/03/2024</td>
                  <td className="px-6 py-4">Ốm</td>
                  <td className="px-6 py-4 text-green-500 font-bold">
                    Đã Duyệt
                  </td>
                  <td className="md:px-6 md:py-4 hover hover:text-main">
                    <CiCircleMore size={24} />
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">03/03/2024</td>
                  <td className="px-6 py-4">Việc gia đình</td>
                  <td className="px-6 py-4 text-yellow-500 font-bold">
                    Chờ duyệt
                  </td>
                  <td className="md:px-6 md:py-4 hover hover:text-main">
                    <CiCircleMore size={24} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurnOutPage;
