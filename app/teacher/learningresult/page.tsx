"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/utils/useFetch";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import DefaultImage from "@/app/components/shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import GetClass from "@/utils/classes/getClass";
import { CiCircleMore } from "react-icons/ci";
import { SiGoogleclassroom } from "react-icons/si";
import DialogProfile from "@/app/components/profile/DialogProfile";
import Button from "@/app/components/shared/Button";
import { MdCalendarMonth } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import GetAttendanceClass from "@/utils/attendance/getAttendance";

const LearningResultPage = () => {
  const { t } = useTranslation();
  const [closeDialog, setCloseDialog] = useState(false);
  const [dataStudentDetail, setDataStudentDetail] = useState({});
  const [search, setSearch] = useState("");
  const [defaultClassID, setDefaultClassID] = useState("");
  const [refresh, setRefresh] = useState(false);

  const { classId, getClassId, arrClassName } = GetClass();
  const {
    arrGetAttendanceByClass,
    nameAttendanceByClassFirst,
    idAttendanceByClassFirst,
  } = GetAttendanceClass(defaultClassID);

  useEffect(() => {
    setDefaultClassID(classId[0]?.trim());
  }, [classId]);

  useEffect(() => {
    setDefaultClassID(getClassId);
  }, [getClassId]);

  const day = new Date();
  const year = day.getFullYear();

  const { data: detailClassData } = useFetch(
    `ClassRoom/Detail/id=${defaultClassID}&year=${year}`
  );

  const { data: learningResultData } = useFetch(
    `CheckIn/getClassByMonth?classId=${defaultClassID}&month=3`,
    refresh
  );

  const handleDialog = () => {
    setCloseDialog((currState) => !currState);
  };

  const searchChildInClass = (c: any): boolean => {
    const matchName: boolean = c.fullName.toLowerCase().includes(search);
    return matchName;
  };

  setTimeout(() => {
    setRefresh(false);
  }, 2000);

  return (
    <>
      {closeDialog ? (
        <DialogProfile
          handleDialog={handleDialog}
          data={dataStudentDetail}
          teacher
          setRefresh={setRefresh((b) => b)}
        />
      ) : (
        ""
      )}
      <div className="h-[600px] bg-white md:w-3/4 m-auto rounded-xl">
        <div className="relative overflow-x-auto shadow-sm bg-white pt-2 sm:rounded-lg">
          <div className="p-4">
            <div className="flex lg:flex-row flex-col items-center justify-between">
              <div className="">
                <div className="md:text-3xl flex items-center">
                  Kết quả học tập Lớp
                  <div className="bg-gray-100 shadow-sm rounded-lg ml-2 font-bold text-3xl ">
                    <Select
                      defaultValue={classId[0]?.trim()}
                      onValueChange={(value: any) => {
                        setDefaultClassID(value);
                        setRefresh(true);
                      }}
                    >
                      <SelectTrigger className="md:w-[140px] w-full text-lg">
                        <p className="text-gray-600 mr-2">
                          <SiGoogleclassroom />
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
                <div className="flex">
                  <p className="md:text-xl">
                    Giáo viên chủ nhiệm:
                    <span className="italic ml-2">
                      {detailClassData?.teachers}
                    </span>
                  </p>
                </div>
                <p className="md:text-xl">
                  Số học sinh: {detailClassData?.count}
                </p>
              </div>
            </div>
            <div className="md:flex justify-between items-center">
              <div className="bg-white flex items-center md:mb-2 mb-4">
                <div className=" shadow-lg rounded-lg md:w-[480px] w-full flex">
                  <Input
                    type="email"
                    placeholder="Tìm kiếm..."
                    className="p-4 "
                    onChange={(event) => {
                      setSearch(event.target.value.toLowerCase());
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[590px]">
            <table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-3">
                    STT
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Họ tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày học
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày nghỉ có phép
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày nghỉ không phép
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Điểm đánh giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Đánh giá
                  </th>
                </tr>
              </thead>
              <tbody>
                {learningResultData
                  ?.filter(searchChildInClass)
                  .map((dataStudent: any, index: any) => {
                    return (
                      <tr
                        key={dataStudent.id}
                        className="odd:bg-white text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>

                        <td className="px-6 py-4 text-left">
                          {dataStudent.fullName}
                        </td>
                        <td className="px-6 py-4">{dataStudent.countCheck}</td>
                        <td className="px-6 py-4">
                          {dataStudent.countOffReason}
                        </td>
                        <td className="px-6 py-4">
                          {dataStudent.countNoCheck}
                        </td>
                        <td className="px-6 py-4">{dataStudent.point}</td>
                        <td className="px-6 py-4">{dataStudent.status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningResultPage;
