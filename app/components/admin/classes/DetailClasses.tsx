"use client";
import React, { useState } from "react";
import Image from "next/image";
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
import { useSearchParams } from "next/navigation";
import DialogProfile from "../../profile/DialogProfile";
import BackAction from "../BackAction";
import { getImageUrl } from "@/utils/image";

const DetailClasses = (id: any) => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const [closeDialog, setCloseDialog] = useState(false);
  const [dataStudentDetail, setDataStudentDetail] = useState({});

  const { data: detailClassData } = useFetch(
    `ClassRoom/Detail/id=${id.id}&year=${year}`
  );

  const handleDialog = () => {
    setCloseDialog((currState) => !currState);
  };

  return (
    <>
      {closeDialog ? (
        <DialogProfile handleDialog={handleDialog} data={dataStudentDetail} />
      ) : (
        ""
      )}
      <div className="h-[600px]">
        <BackAction />
        <div className="relative overflow-x-auto shadow-sm bg-white pt-2 sm:rounded-lg">
          <div className="px-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="md:text-3xl">
                  Danh sách học sinh - Lớp {detailClassData?.name}
                </p>
                <p className="md:text-xl">
                  Số học sinh: {detailClassData?.count}
                </p>
              </div>
              <div className="flex">
                <p className="md:text-xl">
                  Giáo viên chủ nhiệm:{" "}
                  <span className="italic">{detailClassData?.teachers}</span>
                </p>
              </div>
            </div>
            <div className="md:flex justify-between items-center">
              <div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5">
                  + {t("addNew")}
                </button>
              </div>
              <div className="bg-white flex items-center">
                <div className="shadow-lg rounded-lg border">
                  <Select>
                    <SelectTrigger className="md:w-[180px] w-[120px]">
                      <SelectValue placeholder="Tìm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nameFilter">Tìm theo tên</SelectItem>
                      <SelectItem value="phoneNumberFilter">
                        Tìm theo số điện thoại
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mx-2 shadow-lg rounded-lg">
                  <Input type="email" placeholder="Tìm kiếm..." />
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
                {detailClassData?.students?.map(
                  (dataStudent: any, index: any) => {
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
                        <td className="px-6 py-4">{dataStudent.fullName}</td>
                        <td className="px-6 py-4">{dataStudent.birthDay}</td>
                        <td className="px-6 py-4">{dataStudent.phone}</td>
                        <td className="px-6 py-4">{dataStudent.parentName}</td>
                        <td
                          className="md:px-6 md:py-4 hover"
                          onClick={() => {
                            setDataStudentDetail({
                              avatar: dataStudent.avatar,
                              id: dataStudent.id,
                            });
                            setCloseDialog(true);
                          }}
                        >
                          <Image
                            title="Chi tiết"
                            src={"/icons/detail.webp"}
                            alt="Detail"
                            width={26}
                            height={26}
                            priority
                            className="hover:scale-110 transition-all"
                          />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailClasses;
