"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useFetch from "@/utils/useFetch";
import Link from "next/link";

const TableClasses = () => {
  const { t } = useTranslation();
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const { data: classData } = useFetch(`/ClassRoom/List/${year}`);

  return (
    <div className="h-[600px] ">
      <div className="bg-white shadow-3xl rounded-md">
        <div className="p-2">
          <div>
            <p className="text-3xl">Danh sách lớp học</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5">
                + {t("addNew")}
              </button>
            </div>
            <div className="bg-gray-100 shadow-sm rounded-lg">
              <Select
                onValueChange={(value) => {
                  setYear(value);
                }}
              >
                <SelectTrigger className="w-[180px] text-lg">
                  <p>Năm học:</p>
                  <SelectValue placeholder={year} defaultValue={year} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="relative max-h-[650px] overflow-auto shadow-3xl sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]">
            <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tên lớp
                </th>
                <th scope="col" className="px-6 py-3">
                  Số học sinh
                </th>
                <th scope="col" className="px-6 py-3">
                  Giáo viên chủ nhiệm
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("note")}
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {classData?.map((allClass: any) => {
                return (
                  <tr
                    key={allClass.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {allClass.name}
                    </th>
                    <td className="px-6 py-4"> {allClass.count}</td>
                    <td className="px-6 py-4">{allClass.teachers}</td>
                    <td className="px-6 py-4">
                      {allClass.note ? allClass.note : "Không có"}
                    </td>
                    <td className="md:px-6 md:py-4">
                      <Link
                        href={`/admin/classes/${allClass.id}?&year=${year}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-4 flex">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem className="flex">
              <PaginationLink href="#">1</PaginationLink>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="flex">
              <PaginationLink href="#">4</PaginationLink>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TableClasses;
