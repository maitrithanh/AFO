"use client";
import useFetch from "@/utils/useFetch";
import React, { useEffect, useState } from "react";
import { MdOutlineRadioButtonUnchecked, MdCheckCircle } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoCalendarOutline } from "react-icons/io5";
import { getCookie } from "cookies-next";

const LearningResult = () => {
  const [month, setMonth] = useState("1");

  const child = getCookie("child");

  useEffect(() => {
    const date = new Date();
    const getMonth = date.getMonth() + 1;
    setMonth(getMonth.toString());
  }, []);

  const { data: dataAttendanceByChild } = useFetch(
    `CheckIn/getByChild?childId=${child}&month=${month}`
  );

  const allMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="h-[88vh] bg-white w-full m-auto rounded-xl">
      <div className="relative overflow-x-auto  bg-white pt-2 sm:rounded-lg">
        <div className="p-4">
          <div className="text-3xl flex justify-center items-center border-b pb-4">
            Kết quả học tập{" "}
            <div className="bg-gray-100 shadow-sm rounded-lg mx-2 font-bold text-3xl ">
              <Select
                defaultValue={month}
                onValueChange={(value: any) => {
                  setMonth(value);
                }}
              >
                <SelectTrigger className="md:w-fill w-full text-lg">
                  <p className="text-gray-600 mr-2">
                    <IoCalendarOutline />
                  </p>
                  <p>{`Tháng ${month}`}</p>
                  {/* <SelectValue placeholder={"123"} defaultValue={month} /> */}
                </SelectTrigger>
                <SelectContent>
                  {allMonth.map((item: any, index: any) => {
                    return (
                      <SelectItem key={index} value={item}>
                        Tháng {item}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl">
                Họ tên: <span>{dataAttendanceByChild?.child?.fullName}</span>
              </p>
              <p className="text-xl">
                Đánh giá:{" "}
                <span className=" text-gray-600">
                  {dataAttendanceByChild?.child?.status}
                </span>
              </p>
            </div>
            <table className="border">
              <thead>
                <tr className="text-center border">
                  <td className="border p-2">Đi học</td>
                  <td className="border p-2">Có phép</td>
                  <td className="border p-2">Không phép</td>
                  <td className="border p-2 font-bold">Điểm</td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border p-1">
                    {dataAttendanceByChild?.child?.countCheck}
                  </td>
                  <td className="border p-1">
                    {dataAttendanceByChild?.child?.countOffReason}
                  </td>
                  <td className="border p-1">
                    {dataAttendanceByChild?.child?.countNoCheck}
                  </td>
                  <td className="border p-1 font-bold text-main">
                    {dataAttendanceByChild?.child?.point}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-3">
                    Ngày
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Đi học
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ra về
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nghỉ phép
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Điểm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ghi chú
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataAttendanceByChild?.checkIn?.map((dataCheckIn: any) => {
                  return (
                    <tr
                      key={dataCheckIn.date}
                      className="odd:bg-white text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{dataCheckIn.date}</td>
                      <td className="px-6 py-4">
                        <p className="flex justify-center">
                          {dataCheckIn.started ? (
                            <span className="text-green-600">
                              <MdCheckCircle size={28} />
                            </span>
                          ) : (
                            <span className="text-rose-600">
                              <MdOutlineRadioButtonUnchecked size={28} />
                            </span>
                          )}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="flex justify-center">
                          {dataCheckIn.ended ? (
                            <span className="text-green-600">
                              <MdCheckCircle size={28} />
                            </span>
                          ) : (
                            <span className="text-rose-600">
                              <MdOutlineRadioButtonUnchecked size={28} />
                            </span>
                          )}
                        </p>
                      </td>
                      <td className="md:px-6 md:py-4 hover">
                        {dataCheckIn.reason ? dataCheckIn.reason : "''"}
                      </td>
                      <td className="md:px-6 md:py-4 hover text-main font-bold text-xl">
                        {dataCheckIn.point}
                      </td>
                      <td className="md:px-6 md:py-4 hover ">
                        {dataCheckIn.note ? dataCheckIn.note : "''"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {typeof dataAttendanceByChild == "string" ? (
            <div className="flex justify-center items-center p-8">
              Chưa có kết quả học tập
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LearningResult;
