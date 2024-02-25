"use client";
import HealthTable from "@/app/components/teacher/HealthTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/utils/useFetch";
import React, { useEffect, useState } from "react";
import { MdCalendarMonth } from "react-icons/md";

const HealthPage = () => {
  const day = new Date();
  let month = day.getMonth();
  const [getMonth, setGetMonth] = useState(month + 1);
  const [getClassId, setGetClassId] = useState("");
  const [classId, setClassId] = useState([] as string[]);
  const { data: healthEvent } = useFetch("Healthy/getListEvent");
  const { data: dataUser } = useFetch(`/Auth/current`);
  const [arrRelationship, setArrRelationship] = useState("");

  useEffect(() => {
    if (dataUser) setArrRelationship(dataUser?.relationship);
  }, [dataUser]);

  useEffect(() => {
    if (arrRelationship) {
      let arrClassId = arrRelationship.split(/[-,,]/);
      for (let i = 0; i < arrClassId.length; i++) {
        if (i == 1 || i == 2) {
          arrClassId.splice(i, 1);
        }
      }
      setClassId(arrClassId);
      setGetClassId(arrClassId[0].trim());
    }
  }, [arrRelationship]);

  //Lấy mảng tên lớp
  let arrClassName = arrRelationship.split(/[-,,]/);
  for (let i = 0; i < arrClassName.length; i++) {
    if (i == 0 || i == 1) {
      arrClassName.splice(i, 1);
    }
  }

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
                {healthEvent?.map((data: any) => {
                  return (
                    <SelectItem key={data?.id} value={data?.id}>
                      {data?.examDate}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Chọn lớp */}
        <div className="bg-gray-100 shadow-sm rounded-lg flex items-center px-2">
          Lớp
          <div className="bg-gray-100 shadow-sm rounded-lg ml-2">
            <Select
              defaultValue={classId[0]?.trim()}
              onValueChange={(value: any) => {
                setGetClassId(value);
              }}
            >
              <SelectTrigger className="md:w-[140px] w-full text-lg">
                <p className="text-gray-600 mr-2">
                  <MdCalendarMonth />
                </p>
                <SelectValue
                  placeholder={arrClassName[0]?.trim()}
                  defaultValue={classId[0]?.trim()}
                />
              </SelectTrigger>
              <SelectContent>
                {classId?.map((data: any, index: any) => {
                  return (
                    <SelectItem key={data?.trim()} value={data?.trim()}>
                      {arrClassName[index]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <HealthTable month={getMonth} classId={getClassId} />
    </div>
  );
};

export default HealthPage;
