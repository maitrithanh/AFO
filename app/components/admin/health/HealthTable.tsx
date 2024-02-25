"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTranslation } from "react-i18next";
import useFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";
import DialogAddEvent from "./DialogAddEvent";
import { CiCircleMore } from "react-icons/ci";

const HealthTable = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [closeDialogAddEvent, setCloseDialogAddEvent] = useState(false);
  const { data: healthEvent } = useFetch(
    "Healthy/getListEvent",
    closeDialogAddEvent
  );
  const onClose = () => {
    setCloseDialogAddEvent((curr) => !curr);
  };
  return (
    <>
      <div
        className={`${
          !closeDialogAddEvent ? "hidden opacity-0" : "block opacity-100"
        } transition-all`}
      >
        <DialogAddEvent onClose={onClose} />
      </div>
      <div className="h-[600px] ">
        <div className="rounded-md">
          <div className="p-2">
            <div>
              <p className="text-3xl">Lịch khám sức khoẻ</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5"
                  onClick={() => onClose()}
                >
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
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] shadow-3xl">
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
                {healthEvent?.map((eventHealth: any) => {
                  return (
                    <tr key={eventHealth.id}>
                      <td className="md:px-6 md:py-4">
                        {eventHealth.examDate}
                      </td>
                      <td className="md:px-6 md:py-4">{eventHealth.content}</td>
                      <td
                        className="hover hover:text-main"
                        onClick={() =>
                          router.push(`/admin/health/${eventHealth.id}`)
                        }
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
        <div className="p-4 flex"></div>
      </div>
    </>
  );
};

export default HealthTable;
