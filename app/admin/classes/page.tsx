"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
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
import { useRouter } from "next/navigation";

const ClassesPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <div className="h-[600px]">
        <div className="bg-white p-2 shadow-3xl">
          <div>
            <p className="text-2xl font-bold">Danh sách lớp học</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5">
                + {t("addNew")}
              </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Năm học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">2024-2025</SelectItem>
                  <SelectItem value="dark">2025-2026</SelectItem>
                  <SelectItem value="system">2026-2027</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-3xl sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Lớp Mầm 1
                  </th>
                  <td className="px-6 py-4">30</td>
                  <td className="px-6 py-4">Nguyễn Thị A, Bùi Thị B</td>
                  <td className="px-6 py-4">Không có</td>
                  <td
                    className="px-6 py-4"
                    onClick={() => {
                      router.push("");
                    }}
                  >
                    <a
                      href="/admin/classes/123123"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <Image
                        title="Chi tiết lớp học"
                        src={"/icons/info-file.webp"}
                        alt="Detail"
                        width={26}
                        height={26}
                        priority
                        className="hover:scale-110 transition-all"
                      />
                    </a>
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Lớp Mầm 2
                  </th>
                  <td className="px-6 py-4">30</td>
                  <td className="px-6 py-4">Lê Thị C, Cao Nguyễn D</td>
                  <td className="px-6 py-4">Không có</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <Image
                        title="Chi tiết lớp học"
                        src={"/icons/info-file.webp"}
                        alt="Detail"
                        width={26}
                        height={26}
                        priority
                        className="hover:scale-110 transition-all"
                      />
                    </a>
                  </td>
                </tr>

                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Lớp Chồi 1
                  </th>
                  <td className="px-6 py-4">30</td>
                  <td className="px-6 py-4">Lê Thị C, Cao Nguyễn D</td>
                  <td className="px-6 py-4">Không có</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <Image
                        title="Chi tiết lớp học"
                        src={"/icons/info-file.webp"}
                        alt="Detail"
                        width={26}
                        height={26}
                        priority
                        className="hover:scale-110 transition-all"
                      />
                    </a>
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Lớp Chồi 2
                  </th>
                  <td className="px-6 py-4">30</td>
                  <td className="px-6 py-4">Lê Thị C, Cao Nguyễn D</td>
                  <td className="px-6 py-4">Không có</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <Image
                        title="Chi tiết lớp học"
                        src={"/icons/info-file.webp"}
                        alt="Detail"
                        width={26}
                        height={26}
                        priority
                        className="hover:scale-110 transition-all"
                      />
                    </a>
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Lớp Lá 1
                  </th>
                  <td className="px-6 py-4">30</td>
                  <td className="px-6 py-4">Lê Thị C, Cao Nguyễn D</td>
                  <td className="px-6 py-4">Không có</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <Image
                        title="Chi tiết lớp học"
                        src={"/icons/info-file.webp"}
                        alt="Detail"
                        width={26}
                        height={26}
                        priority
                        className="hover:scale-110 transition-all"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Lớp Lá 2
                  </th>
                  <td className="px-6 py-4">30</td>
                  <td className="px-6 py-4">Lê Thị C, Cao Nguyễn D</td>
                  <td className="px-6 py-4">Không có</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <Image
                        title="Chi tiết lớp học"
                        src={"/icons/info-file.webp"}
                        alt="Detail"
                        width={26}
                        height={26}
                        priority
                        className="hover:scale-110 transition-all"
                      />
                    </a>
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
    </>
  );
};

export default ClassesPage;
