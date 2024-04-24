"use client";
import Image from "next/image";
import React, { PureComponent, ReactNode, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
} from "recharts";

interface ChartHealthProps {
  data: any;
}
const ChartHealth: React.FC<ChartHealthProps> = ({ data }) => {
  const dataChart = data?.map((data: any) => {
    return {
      name: data.examDate,
      "Cân nặng": data.weight,
    };
  });

  //stackbarchart
  const dataBar = data?.map((data: any) => {
    return {
      name: data.examDate,
      "Chiều cao": data.height,
    };
  });

  const DataFormater = (number: any) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + " ";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + " tấn";
    } else if (number > 1000) {
      return (number / 1000).toString() + " tạ";
    } else {
      return number.toString() + " kg";
    }
  };

  const DataFormaterHeight = (number: any) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + " h";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + " km";
    } else if (number > 1000) {
      return (number / 1000).toString() + " m";
    } else {
      return number.toString() + " cm";
    }
  };

  const CustomTooltipContent = ({ payload }: { payload: any }) => {
    if (!payload || !payload.length) return null;

    return (
      <div className="bg-main p-2 rounded-lg text-white">
        <p className="recharts-tooltip-label">{payload[0].payload?.name}</p>
        <ul className="recharts-tooltip-item-list">
          {payload?.map((payloadItem: any, index: any) => {
            return (
              <li key={index}>
                {formatTooltipValue(payloadItem.name, payloadItem.value)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const formatTooltipValue = (value: any, name: any) => {
    return `${value.replace("_", " ")}: ${DataFormater(name)}`;
  };
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="bg-white w-full p-4 text-sm font-thin">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src={"/icons/bmi.webp"}
                height={50}
                width={50}
                alt="Cân nặng"
              />
              <h5 className="text-xl">Thống kê chỉ số Cân nặng</h5>
            </div>
            {/* <div>{selectYear}</div> */}
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              // width={730}
              // height={300}
              data={dataChart}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F8853E" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F8853E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="0" />
              <YAxis stroke="0" tickFormatter={DataFormater} />
              <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
              <Tooltip content={<CustomTooltipContent payload={dataChart} />} />
              <Area
                type="monotone"
                dataKey="Cân nặng"
                stroke="#F8853E"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* StackedBarChart */}
        <div className="bg-white w-full p-4 text-sm font-thin">
          <div className=" flex justify-between items-center">
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/height.webp"}
                  height={50}
                  width={50}
                  alt="BMI"
                />
                <h5 className="text-xl">Thống kê chỉ số chiều cao</h5>
              </div>
              {/* <div>{selectYear}</div> */}
            </div>
            {/* <div>{selectYearBar}</div> */}
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={dataBar}
              // width={500}
              // height={300}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
              <XAxis dataKey="name" stroke="0" />
              <YAxis stroke="0" tickFormatter={DataFormaterHeight} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Chiều cao" stackId="a" fill="#F8853E" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default ChartHealth;
