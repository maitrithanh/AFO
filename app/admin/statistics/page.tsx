import Chart from "@/app/components/admin/statistics/Chart";
import React from "react";
import { MdOutlineShowChart } from "react-icons/md";

const Statistics = () => {
  return (
    <div className="">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center">
            <p className="text-lg text-gray-400">Tổng số giáo viên:</p>
            <div className="bg-[#0088FE] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">252</p>
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
              <p className="text-2xl font-bold">900</p>
            </div>
          </div>
          <p className="pt-[18px]">
            Tháng này có <span className="text-main">200</span> học sinh mới.
          </p>
        </div>

        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center">
            <p className="text-lg text-gray-400">Tổng số phụ huynh:</p>
            <div className="bg-[#FFBB28] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">495</p>
            </div>
          </div>
          <p className="pt-[18px]">
            Tháng này có <span className="text-main">10</span> phụ huynh mới.
          </p>
        </div>

        <div className="h-fit md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <div className="flex items-center">
            <p className="text-lg text-gray-400">Tổng số lớp học:</p>
            <div className="bg-[#FF8042] text-white flex items-center rounded-sm px-2 ml-2">
              <p className="text-2xl font-bold">55</p>
            </div>
          </div>
          <p className="pt-[18px]">
            Tháng này có <span className="text-main">10</span> lớp học mới.
          </p>
        </div>
      </div>
      {/* Chart */}
      <Chart />
    </div>
  );
};

export default Statistics;
