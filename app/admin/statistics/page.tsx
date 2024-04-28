"use client";
import Chart from "@/app/components/admin/statistics/Chart";
import { toYMD } from "@/utils/dateTime";
import useFetch from "@/utils/useFetch";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineShowChart } from "react-icons/md";

const Statistics = () => {
  const date = new Date();
  const year = date.getFullYear();
  const { data: dataTeacher } = useFetch("Teacher/getList");
  const { data: dataParent } = useFetch("Parent/GetList");
  const { data: dataChildren } = useFetch("Child/GetList");
  const { data: classData } = useFetch(`/ClassRoom/List/${year}`);

  const month = date.getMonth() + 1;

  const getMonth = (paramDate: any) => {
    return new Date(toYMD(paramDate)).getMonth() + 1;
  };

  const { t } = useTranslation();
  return (
    <div className="">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center md:justify-start justify-between">
            <p className="text-lg text-gray-400">
              {t("Total number of teachers")}:
            </p>
            <div className="bg-[#0088FE] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">
                {dataTeacher ? dataTeacher?.length : "--"}
              </p>
            </div>
          </div>
          <p className="pt-[18px]">
            {t("This month there are")}{" "}
            <span className="text-main">
              {
                dataTeacher?.filter((x: any) => getMonth(x.joinDate) == month)
                  .length
              }
            </span>{" "}
            {t("Teacher")} {t("new")}.
          </p>
        </div>

        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center md:justify-start justify-between">
            <p className="text-lg text-gray-400">
              {t("Total number of students")}:
            </p>
            <div className="bg-[#00C49F] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">
                {dataChildren ? dataChildren?.length : "--"}
              </p>
            </div>
          </div>
          <p className="pt-[18px]">
            {t("This month there are")}{" "}
            <span className="text-main mx-1">
              {
                dataChildren?.filter((x: any) => getMonth(x.joinDate) == month)
                  .length
              }
            </span>
            {t("student")} {t("new")}.
          </p>
        </div>

        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center md:justify-start justify-between">
            <p className="text-lg text-gray-400">
              {t("Total number of parents")}:
            </p>
            <div className="bg-[#FFBB28] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">
                {dataParent ? dataParent?.length : "--"}
              </p>
            </div>
          </div>
          <p className="pt-[18px]">
            {t("This month there are")}{" "}
            <span className="text-main">
              {
                dataParent?.filter(
                  (x: any) => getMonth(x.children[0].joinDate) == month
                ).length
              }
            </span>{" "}
            {t("Parents")} {t("new")}.
          </p>
        </div>

        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center md:justify-start justify-between">
            <p className="text-lg text-gray-400">
              {t("Total number of classes")}:
            </p>
            <div className="bg-[#FF8042] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">{classData?.length}</p>
            </div>
          </div>
          <p className="pt-[18px]">
            {t("This month there are")}
            <span className="text-main"> 10</span> {t("classes")} {t("new")}.
          </p>
        </div>
      </div>
      {/* Chart */}
      <Chart
        quantyTeach={dataTeacher?.length}
        quantyParent={dataParent?.length}
        quantyChild={dataChildren?.length}
      />
    </div>
  );
};

export default Statistics;
