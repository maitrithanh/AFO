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
import DefaultImage from "../shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import DialogUpdateHealth from "./DialogUpdateHealth";
import { CiEdit } from "react-icons/ci";

interface HeathTableProps {
  month: any;
  classId: any;
}

const HealthTable = ({ month, classId }: HeathTableProps) => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  const { data: healthListStudent } = useFetch(
    `Healthy/getListHealthy?eventId=${month}&classId=${classId}`,
    refresh
  );

  const [closeDialogAddEvent, setCloseDialogAddEvent] = useState(false);
  const [dataHealth, setDataHealth] = useState({});
  const onClose = () => {
    setCloseDialogAddEvent((curr) => !curr);
  };
  const handleUpdateHealth = (data: any) => {
    setDataHealth(data);
    onClose();
  };
  const handleRefresh = () => {
    setRefresh((curr) => !curr);
  };
  return (
    <>
      <div
        className={`${
          !closeDialogAddEvent ? "hidden opacity-0" : "block opacity-100"
        } transition-all`}
      >
        <DialogUpdateHealth
          onClose={onClose}
          dataProp={dataHealth}
          refresh={handleRefresh}
        />
      </div>
      <div className="h-fit">
        <div className="bg-white shadow-3xl rounded-md mt-4">
          <div className="relative max-h-[650px] overflow-auto shadow-3xl sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Hình
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Chiều cao
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cân nặng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BMI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mắt
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tình trạng
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {healthListStudent?.map((studentHealth: any, index: any) => {
                  return (
                    <tr key={studentHealth.id}>
                      <td className="md:px-6 md:py-4">
                        <DefaultImage
                          img={getImageUrl(studentHealth.avatar)}
                          className={`w-10 h-10 rounded-full cursor-pointer`}
                          custom="w-[50px] h-[50px]"
                          fallback="/avatar.webp"
                        />
                      </td>
                      <td className="md:px-6 md:py-4">
                        {studentHealth.fullName}
                      </td>
                      <td className="md:px-6 md:py-4">
                        {studentHealth.height}
                      </td>
                      <td className="md:px-6 md:py-4">
                        {studentHealth.weight}
                      </td>
                      <td className="md:px-6 md:py-4">{studentHealth.bmi}</td>
                      <td className="md:px-6 md:py-4">{studentHealth.eye}</td>
                      <td className="md:px-6 md:py-4">
                        {studentHealth.status}
                      </td>
                      <td
                        className="hover"
                        onClick={() => handleUpdateHealth(studentHealth)}
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

export default HealthTable;
