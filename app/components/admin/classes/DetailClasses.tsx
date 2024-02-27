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
import { CiEdit } from "react-icons/ci";

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
  const [searchType, setSearchType] = useState("searchName");
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  const { data: detailClassData } = useFetch(
    `ClassRoom/Detail/id=${id.id}&year=${year}`,
    refresh
  );

  console.log(refresh);

  const handleDialog = () => {
    setCloseDialog((currState) => !currState);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
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
          data={dataStudentDetail}
          setRefresh={setRefresh((b) => b)}
          refresh
        />
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
                  Giáo viên chủ nhiệm:
                  <span className="italic ml-2">
                    {detailClassData?.teachers}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:flex justify-between items-center">
              <div className="bg-white flex items-center md:mb-2 mb-4">
                <div className=" rounded-lg md:w-[380px] w-full flex">
                  <form className="flex items-center jc max-w-sm mx-auto w-full">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 me-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        onChange={(event) => {
                          setSearch(event.target.value.toLowerCase());
                        }}
                        id="simple-search"
                        className="bg-gray-50 border focus-visible:outline-main border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tìm kiếm..."
                        required
                      />
                    </div>
                  </form>

                  {/* <Input
                    type="email"
                    placeholder="Tìm kiếm..."
                    className="p-4 focus-visible:ring-main"
                    onChange={(event) => {
                      setSearch(event.target.value.toLowerCase());
                    }}
                  /> */}
                </div>
              </div>
              <div>
                {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full my-5">
                  + {t("addNew")}
                </button> */}
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
                        <td className="px-6 py-4">{dataStudent.fullName}</td>
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
                          <CiEdit size={24} />
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

export default DetailClasses;
