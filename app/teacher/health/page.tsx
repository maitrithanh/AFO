"use client";
import HealthTable from "@/app/components/teacher/HealthTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GetClass from "@/utils/classes/getClass";
import useFetch from "@/utils/useFetch";
import React, { useEffect, useState } from "react";
import { MdCalendarMonth } from "react-icons/md";

const HealthPage = () => {
  const day = new Date();
  let month = day.getMonth();
  const [getMonth, setGetMonth] = useState(month + 1);
  const { data: healthEvent } = useFetch("Healthy/getListEvent");
  const { data: dataUser } = useFetch(`/Auth/current`);

  //format ngay thang nam
  const formatDate = (date: Date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  return (
    <div className="bg-white md:w-3/4 m-auto rounded-xl">
      <div className="flex justify-between px-10 py-8 ">
        <div className="text-xl flex justify-center items-center">
          Khám sức khoẻ
          <div className="bg-gray-100 shadow-sm rounded-lg ml-2">
            <Select
              onValueChange={(value: any) => {
                setGetMonth(value);
              }}
            >
              <SelectTrigger className="md:w-fit w-full text-lg">
                <p className="text-gray-600 mr-2">
                  <MdCalendarMonth />
                </p>
                <SelectValue
                  placeholder={formatDate(day)}
                  defaultValue={month + 1}
                />
              </SelectTrigger>
              <SelectContent>
                {healthEvent?.map((data: any, i: number) => {
                  return (
                    <SelectItem key={i} value={data?.id}>
                      {data?.examDate}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <HealthTable month={getMonth} classId={dataUser?.classId} />
    </div>
  );
};

export default HealthPage;
