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
import DialogProfile from "../../profile/DialogProfile";
import { getImageUrl } from "@/utils/image";
import GetClass from "@/utils/classes/getClass";
import { CiCircleMore } from "react-icons/ci";
import { MdCalendarMonth } from "react-icons/md";
import { useRouter } from "next/navigation";

const ClassesTable = () => {
  const { t } = useTranslation();
  const [closeDialog, setCloseDialog] = useState(false);
  const [dataStudentDetail, setDataStudentDetail] = useState({});
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  const { data: dataUser } = useFetch(`Auth/current`);

  const day = new Date();
  const year = day.getFullYear();

  const { data: detailClassData } = useFetch(
    `ClassRoom/Detail/id=${dataUser?.classId}&year=${year}`
  );

  const handleDialog = () => {
    setCloseDialog((currState) => !currState);
  };

  const searchChildInClass = (c: any): boolean => {
    const matchName: boolean = c.fullName.toLowerCase().includes(search);
    const matchPhone: boolean = c.phone.includes(search);
    return matchName || matchPhone;
  };

  return (
    <>
      {closeDialog ? (
        <DialogProfile
          handleDialog={handleDialog}
          dataProps={dataStudentDetail}
          teacher
          // setRefresh={setRefresh((b) => b)}
        />
      ) : (
        ""
      )}
      <div className="h-[600px] bg-white md:w-3/4 m-auto rounded-xl">
        <div className="relative overflow-x-auto shadow-sm bg-white pt-2 sm:rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="">
                <p className="md:text-3xl flex">
                  Danh sách học sinh - Lớp {dataUser?.className}
                </p>
                <p className="md:text-xl">
                  Số học sinh: {detailClassData?.count}
                </p>
              </div>
              <div className="flex">
                <p className="md:text-xl">
                  Giáo viên chủ nhiệm:
                  <span className="italic ml-2">
                    {detailClassData?.teachers}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:flex justify-between items-center">
              <div></div>
              <div className="bg-white flex items-center md:mb-2 mb-4">
                <div className="mx-2 shadow-lg rounded-lg md:w-[480px] w-full flex">
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
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
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
                    {t("dateOfBirth")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("phoneNumber")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Người giám hộ
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {detailClassData?.students
                  ?.filter(searchChildInClass)
                  .map((dataStudent: any, index: any) => {
                    return (
                      <tr
                        key={dataStudent.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">
                          <DefaultImage
                            img={getImageUrl(dataStudent.avatar)}
                            className={`w-10 h-10 rounded-full cursor-pointer`}
                            custom="w-[50px] h-[50px]"
                            fallback="/avatar.webp"
                          />
                        </td>
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => {
                            router.push(
                              `/teacher/detailChild/${dataStudent.id}`
                            );
                          }}
                        >
                          {dataStudent.fullName}
                        </td>
                        <td className="px-6 py-4">{dataStudent.birthDay}</td>
                        <td className="px-6 py-4">{dataStudent.phone}</td>
                        <td className="px-6 py-4">{dataStudent.parentName}</td>
                        <td
                          className="md:px-6 md:py-4 hover hover:text-main"
                          onClick={() => {
                            setDataStudentDetail({
                              avatar: dataStudent.avatar,
                              id: dataStudent.id,
                            });
                            setCloseDialog(true);
                          }}
                        >
                          <CiCircleMore size={24} />
                        </td>
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

export default ClassesTable;
