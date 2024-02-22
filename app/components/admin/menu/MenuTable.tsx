"use client";
import SelectWeek from "@/app/components/admin/menu/SelectWeek";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import moment from "moment";

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

const MenuTable = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: MenuData } = useFetch(`/Menu/List`);

  const getWeekName = (week: string = "") => {
    var arr: string[] = week.split("-W");
    return "Tuần " + arr[1] + " - " + arr[0];
  };
  return (
    <div className="pb-5">
      <div className="bg-white p-2 shadow-3xl rounded-md">
        <div>
          <p className="text-2xl font-bold">Danh sách thực đơn</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl ">Danh sách thực đơn</p>
          </div>
        </div>
        <div className="relative shadow-3xl sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]">
            <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tên thực đơn
                </th>
                <th scope="col" className="px-6 py-3">
                  Mô tả
                </th>
                <th scope="col" className="px-6 py-3">
                  Áp dụng
                </th>

                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {MenuData?.map((allMenu: any) => {
                return (
                  <tr
                    key={allMenu.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {allMenu.name}
                    </th>
                    <td className="px-6 py-4 md:max-w-[600px]">
                      {allMenu.desc}
                    </td>
                    <td className="px-6 py-4">
                      {getWeekName(allMenu.start)} đến{" "}
                      {getWeekName(allMenu.end)}
                    </td>

                    <td className="md:px-6 md:py-4">
                      <Link
                        href={`/admin/menu/${allMenu.id}`}
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
      {/* <div className="p-4 flex">
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
      </div> */}
    </div>
  );
};

export default MenuTable;
