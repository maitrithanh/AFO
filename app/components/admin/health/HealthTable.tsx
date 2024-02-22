"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
import { useTranslation } from "react-i18next";

const HealthTable = () => {
  const { t } = useTranslation();
  return (
    <div className="h-[600px] ">
      <div className="bg-white shadow-3xl rounded-md">
        <div className="p-2">
          <div>
            <p className="text-3xl">Lịch khám sức khoẻ</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5">
                + {t("addNew")}
              </button>
            </div>
            <div className="flex p-1 m-2 rounded-md bg-gray-100 shadow-sm">
              <div className="inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>

              <Select>
                <SelectTrigger className="w-[110px] text-md">
                  <SelectValue placeholder="Tháng 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t1" className="text-md">
                    Tháng 1
                  </SelectItem>
                  <SelectItem value="t2" className="text-md">
                    Tháng 2
                  </SelectItem>
                  <SelectItem value="t3" className="text-md">
                    Tháng 3
                  </SelectItem>
                  <SelectItem value="t4" className="text-md">
                    Tháng 4
                  </SelectItem>
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
                  Ngày Khám
                </th>
                <th scope="col" className="px-6 py-3">
                  Nội dung khám
                </th>

                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="md:px-6 md:py-4">4/2024</td>
                <td className="md:px-6 md:py-4">
                  <Link
                    href={`/admin/classes/`}
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

export default HealthTable;
