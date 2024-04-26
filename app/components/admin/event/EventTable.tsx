"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { CiCircleMore } from "react-icons/ci";
import DialogAddEvent from "./DialogAddEvent";
import { MdEditNote } from "react-icons/md";

const EventTable = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [closeDialogAddEvent, setCloseDialogAddEvent] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [getId, setGetId] = useState("");
  const date = new Date();
  const year = date.getFullYear();
  const { data: eventData } = useFetch(
    `Events/getList?year=${year}`,
    closeDialogAddEvent
  );
  const currentEvents = eventData?.find((event: any) => event.id == getId);
  const clearObj = {
    title: "",
    start: "",
    end: "",
  };

  const onClose = () => {
    setCloseDialogAddEvent((curr) => !curr);
  };

  const handleOpenAdd = () => {
    setEditMode(false);
    onClose();
  };

  const handleEdit = (id: string) => {
    setGetId(id);
    setEditMode(true);
    onClose();
  };

  return (
    <>
      <div
        className={`${
          !closeDialogAddEvent ? "hidden opacity-0" : "block opacity-100"
        } transition-all`}
      >
        <DialogAddEvent
          onClose={onClose}
          editMode={editMode}
          currentEvents={editMode ? currentEvents : clearObj}
        />
      </div>
      <div className="h-[600px] ">
        <div className="rounded-md">
          <div className="p-2">
            <div>
              <p className="text-3xl">Lịch sự kiện</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5"
                  onClick={() => handleOpenAdd()}
                >
                  + {t("addNew")}
                </button>
              </div>
              {/* <div className="flex p-1 m-2 rounded-md bg-gray-100 shadow-sm">
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
              </div> */}
            </div>
          </div>
          <div className="relative max-h-[650px] overflow-auto shadow-3xl sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] shadow-3xl">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sự kiện
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Thời gian
                  </th>

                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {eventData?.map((event: any) => {
                  return (
                    <tr key={event.id}>
                      <td className="md:px-6 md:py-4 flex">
                        {event.title}
                        <p className="bg-main w-5 h-5 flex items-center justify-center text-white rounded-full ml-2">
                          {event.countDay}
                        </p>
                      </td>
                      <td className="md:px-6 md:py-4">
                        {event.startDate} - {event.endDate}
                      </td>
                      <td
                        className="hover hover:text-main"
                        onClick={() => handleEdit(event.id)}
                      >
                        <MdEditNote size={24} />
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

export default EventTable;
