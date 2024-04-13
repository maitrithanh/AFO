"use client";
import Chart from "@/app/components/admin/statistics/Chart";
import { toYMD } from "@/utils/dateTime";
import useFetch from "@/utils/useFetch";
import React from "react";
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

  console.log(classData);

  return (
    <div className="">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center">
            <p className="text-lg text-gray-400">Tổng số giáo viên:</p>
            <div className="bg-[#0088FE] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">
                {dataTeacher ? dataTeacher?.length : "--"}
              </p>
            </div>
          </div>
          <p className="pt-[18px]">
            Tháng này có <span className="text-main">2</span> giáo viên mới.
          </p>
        </div>

        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center">
            <p className="text-lg text-gray-400">Tổng số học sinh:</p>
            <div className="bg-[#00C49F] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">
                {dataChildren ? dataChildren?.length : "--"}
              </p>
            </div>
          </div>
          <p className="pt-[18px]">
            Tháng này có{" "}
            <span className="text-main mx-1">
              {
                dataChildren?.filter((x: any) => getMonth(x.joinDate) == month)
                  .length
              }
            </span>
            học sinh mới.
          </p>
        </div>

        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center">
            <p className="text-lg text-gray-400">Tổng số phụ huynh:</p>
            <div className="bg-[#FFBB28] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">
                {dataParent ? dataParent?.length : "--"}
              </p>
            </div>
          </div>
          <p className="pt-[18px]">
            Tháng này có{" "}
            <span className="text-main">
              {
                dataParent?.filter(
                  (x: any) => getMonth(x.children[0].joinDate) == month
                ).length
              }
            </span>{" "}
            phụ huynh mới.
          </p>
        </div>

        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center">
            <p className="text-lg text-gray-400">Tổng số lớp học:</p>
            <div className="bg-[#FF8042] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">{classData?.length}</p>
            </div>
          </div>
          <p className="pt-[18px]">
            Tháng này có <span className="text-main">10</span> lớp học mới.
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
