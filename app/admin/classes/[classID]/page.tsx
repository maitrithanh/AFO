"use client";

import React from "react";
import Image from "next/image";
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
import { MdArrowBackIosNew } from "react-icons/md";

import { Input } from "@/components/ui/input";

import useFetch from "@/utils/useFetch";
import DefaultImage from "@/app/components/defaultImage";

const ClassPage = ({ params }: any) => {
  const { data: classData, loading } = useFetch(`ClassRoom/${params.classID}`);

  const { t } = useTranslation();

  return (
    <div className="h-[600px]">
      <a href="/admin/classes" className="text-main  w-fit group ">
        <div className="flex items-center">
          <div className="group-hover:-translate-x-2 transition-all ">
            <MdArrowBackIosNew />
          </div>
          Tất cả lớp
        </div>
      </a>
      <div className="relative overflow-x-auto shadow-3xl sm:rounded-lg p-2 ">
        <div className="">
          <div className="flex items-center justify-between">
            <div>
              <p className="md:text-2xl font-bold">
                Danh sách học sinh - Lớp Mầm 1
              </p>
              <p className="md:text-xl">Số học sinh: 30</p>
            </div>
            <div className="flex">
              <p className="md:text-xl">
                Giáo viên chủ nhiệm: Nguyễn Thị A, Bùi Thị B
              </p>
            </div>
          </div>
          <div className="md:flex justify-between items-center mb-4">
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

        <div className="overflow-y-auto max-h-[600px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Nguyễn Thị A</td>
                <td className="px-6 py-4">01/01/2019</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="md:px-6 md:py-4">
                  <a
                    href="/admin/classes/123123"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
                  2
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Lê Thị C</td>
                <td className="px-6 py-4">01/01/2019</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
                  3
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Cao Nguyễn D</td>
                <td className="px-6 py-4">01/01/2019</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
                  4
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Lê Thị C</td>
                <td className="px-6 py-4">01/01/2019</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
                  5
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Lê Thị C</td>
                <td className="px-6 py-4">01/01/2019</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
                  6
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Lê Thị C</td>
                <td className="px-6 py-4">01/01/2019</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
                  7
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Lê Thị C</td>
                <td className="px-6 py-4">01/01/2019</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
                  8
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Lê Thị C</td>
                <td className="px-6 py-4">01/01/2019</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
                  9
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Lê Thị C</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
                  10
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Lê Thị C</td>
                <td className="px-6 py-4">01/01/2019</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
                  11
                </th>
                <td className="px-6 py-4">
                  <DefaultImage img="/avatar.webp" fallback="/avatar.webp" />
                </td>
                <td className="px-6 py-4">Lê Thị C</td>
                <td className="px-6 py-4">01/01/2019</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">Nguyễn Văn A</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Image
                      title="Chi tiết lớp học"
                      src={"/icons/more.webp"}
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
  );
};

export default ClassPage;
