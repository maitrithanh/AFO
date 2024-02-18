"use client";
import React, { useState } from "react";
import Image from "next/image";
import useFetch from "@/utils/useFetch";
import { useTranslation } from "react-i18next";
import { MdArrowBackIosNew } from "react-icons/md";
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
import { useSearchParams } from "next/navigation";
import DialogProfile from "../../profile/DialogProfile";

const DetailMenu = (id: any) => {
  const { t } = useTranslation();
  const [closeDialog, setCloseDialog] = useState(false);

  const { data: detailMenuData } = useFetch(`/Menu/Detail/${id.id}`);

  const handleDialog = () => {
    setCloseDialog((currState) => !currState);
  };

  return (
    <>
      <div className="h-[600px]">
        <a href="/admin/menu" className="text-main  w-fit group ">
          <div className="flex items-center">
            <div className="group-hover:-translate-x-2 transition-all ">
              <MdArrowBackIosNew />
            </div>
            {t("menu")}
          </div>
        </a>
        <div className="relative overflow-x-auto shadow-3xl sm:rounded-lg p-2 ">
          <div className="">
            <div className="flex items-center justify-between">
              <div>
                <p className="md:text-2xl font-bold">
                  {detailMenuData?.menu?.name}
                </p>
                <p className="">
                  Bắt đầu từ: {detailMenuData?.menu?.start} đến{" "}
                  {detailMenuData?.menu?.end}
                </p>
              </div>
            </div>
            <div className="md:flex justify-between items-center mb-4">
              <div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5">
                  + {t("addNew")}
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[590px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Ngày
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Món ăn
                  </th>

                  {/* <th scope="col" className="px-6 py-3"></th> */}
                </tr>
              </thead>
              <tbody>
                {detailMenuData?.items?.map((dataMeal: any) => {
                  return (
                    <tr
                      key={dataMeal.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td className="px-6 py-4">Thứ {dataMeal.day + 2}</td>
                      <td className="px-6 py-4">{dataMeal.nameFood}</td>

                      {/* <td
                        className="md:px-6 md:py-4"
                        onClick={() => {
                          setDataStudentDetail({
                            fullName: dataStudent.fullName,
                          });
                          setCloseDialog(true);
                        }}
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
                      </td> */}
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
    </>
  );
};

export default DetailMenu;
