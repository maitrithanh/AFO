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
import DialogProfile from "@/app/components/profile/DialogProfile";
import { IoCalendarOutline } from "react-icons/io5";

const LearningResultPage = () => {
  const { t } = useTranslation();
  const [closeDialog, setCloseDialog] = useState(false);
  const [dataStudentDetail, setDataStudentDetail] = useState({});
  const [monthDefault, setMonthDefault] = useState("");
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { data: currentUserTeacher } = useFetch("Auth/current");

  const allMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const day = new Date();
  const year = day.getFullYear();
  const month = day.getMonth() + 1;

  useEffect(() => {
    setMonthDefault(month.toString());
  }, [month]);

  const { data: detailClassData } = useFetch(
    `ClassRoom/Detail/id=${currentUserTeacher?.classId}&year=${year}`
  );

  const { data: learningResultData } = useFetch(
    `CheckIn/getClassByMonth?classId=${currentUserTeacher?.classId}&month=${monthDefault}`,
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
          dataProps={dataStudentDetail}
          teacher
        />
      ) : (
        ""
      )}
      <div className=" bg-white h-[88vh] md:w-full m-auto rounded-xl">
        <div className="relative overflow-x-auto shadow-sm bg-white pt-2 sm:rounded-lg">
          <div className="p-4">
            <div className="flex lg:flex-row flex-col items-center justify-between">
              <div className="md:text-3xl flex items-center">
                Kết quả học tập Lớp {currentUserTeacher?.className}
                <div className="bg-gray-100 shadow-sm rounded-lg mx-2 font-semibold text-3xl ">
                  <Select
                    defaultValue={monthDefault}
                    onValueChange={(value: any) => {
                      setMonthDefault(value);
                    }}
                  >
                    <SelectTrigger className="md:w-fill w-full text-2xl">
                      <p className="text-gray-600 mr-2">
                        <IoCalendarOutline />
                      </p>
                      <p>{`Tháng ${monthDefault}`}</p>
                    </SelectTrigger>
                    <SelectContent>
                      {allMonth.map((item: any, index: any) => {
                        return (
                          <SelectItem
                            key={index}
                            value={item}
                            className="text-lg"
                          >
                            Tháng {item}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="my-2">
                <p className="md:text-xl flex items-center">
                  Giáo viên chủ nhiệm:
                  {detailClassData?.teachers.map((teacher: any) => {
                    return (
                      <span
                        className={`italic ml-2 flex items-center justify-center gap-2 bg-gray-100 p-2 rounded-md`}
                        key={teacher.teacherID}
                      >
                        <DefaultImage
                          img={getImageUrl(teacher.avatar)}
                          fallback="/avatar.webp"
                        />
                        {teacher.fullName}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
            <p className="text-2xl">Số học sinh: {detailClassData?.count}</p>
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
              <thead className="text-md text-white font-bold uppercase bg-main dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-center text-lg">
                  <th scope="col" className="px-6 py-3">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hình
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
                        className="odd:bg-white text-lg text-black text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4 text-left scale-125 flex justify-center items-center">
                          <DefaultImage
                            img={getImageUrl(dataStudent.avatar)}
                            fallback="/avatar.webp"
                          />
                        </td>
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
                        <td className="px-6 py-4 text-main font-bold">
                          {dataStudent.point}
                        </td>
                        <td className="px-6 py-4">{dataStudent.status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {learningResultData ? null : (
          <div className="w-full flex justify-center items-center p-8">
            <p>Không có dữ liệu</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LearningResultPage;
