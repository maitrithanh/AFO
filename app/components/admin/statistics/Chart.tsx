"use client";
import React, { PureComponent, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  {
    name: "Tháng 1",
    "Doanh thu": 0,
    // pv: 2400,
    // amt: 2400,
  },
  {
    name: "Tháng 2",
    "Doanh thu": 0,
  },
  {
    name: "Tháng 3",
    "Doanh thu": 100000,
  },
  {
    name: "Tháng 4",
    "Doanh thu": 1200000,
  },
  {
    name: "Tháng 5",
    "Doanh thu": 2000000,
  },
  {
    name: "Tháng 6",
    "Doanh thu": 1500000,
  },
  {
    name: "Tháng 7",
    "Doanh thu": 2200000,
  },
  {
    name: "Tháng 8",
    "Doanh thu": 3100000,
  },
  {
    name: "Tháng 9",
    "Doanh thu": 8000000,
  },
  {
    name: "Tháng 10",
    "Doanh thu": 9000000,
  },
  {
    name: "Tháng 11",
    "Doanh thu": 12000000,
  },
  {
    name: "Tháng 12",
    "Doanh thu": 10000000,
  },
];

const DataFormater = (number: any) => {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + " tỷ";
  } else if (number > 1000000) {
    return (number / 1000000).toString() + " triệu";
  } else if (number > 1000) {
    return (number / 1000).toString() + " nghìn";
  } else {
    return number.toString();
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

//pieChart

const dataPie = [
  { name: "Giáo viên", value: 252 },
  { name: "Học sinh", value: 900 },
  { name: "Phụ huynh", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

//stackbarchart
const dataBar = [
  {
    name: "Tháng 1",
    "Học sinh cũ": 0,
    "Học sinh mới": 0,
  },
  {
    name: "Tháng 2",
    "Học sinh cũ": 0,
    "Học sinh mới": 100,
  },
  {
    name: "Tháng 3",
    "Học sinh cũ": 100,
    "Học sinh mới": 100,
  },
  {
    name: "Tháng 4",
    "Học sinh cũ": 200,
    "Học sinh mới": 700,
  },
  {
    name: "Tháng 5",
    "Học sinh cũ": 0,
    "Học sinh mới": 0,
  },
  {
    name: "Tháng 6",
    "Học sinh cũ": 0,
    "Học sinh mới": 0,
  },
  {
    name: "Tháng 7",
    "Học sinh cũ": 0,
    "Học sinh mới": 0,
  },
  {
    name: "Tháng 8",
    "Học sinh cũ": 0,
    "Học sinh mới": 0,
  },
  {
    name: "Tháng 9",
    "Học sinh cũ": 0,
    "Học sinh mới": 0,
  },
  {
    name: "Tháng 10",
    "Học sinh cũ": 0,
    "Học sinh mới": 0,
  },
  {
    name: "Tháng 11",
    "Học sinh cũ": 0,
    "Học sinh mới": 0,
  },
  {
    name: "Tháng 12",
    "Học sinh cũ": 0,
    "Học sinh mới": 0,
  },
];

const Chart = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [yearBar, setYearBar] = useState(new Date().getFullYear().toString());

  const years = [];
  for (var i = 2024; i >= 2022; i--) years.push(i);
  const selectYear = (
    <div className="bg-white border shadow-sm rounded-sm">
      <Select
        onValueChange={(value: any) => {
          setYear(value);
        }}
      >
        <SelectTrigger className="w-[180px] text-lg">
          <p>Năm học:</p>
          <SelectValue placeholder={year} defaultValue={year} />
        </SelectTrigger>
        <SelectContent>
          {years.map((x) => (
            <>
              <SelectItem value={x + ""}>{x}</SelectItem>
            </>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const selectYearBar = (
    <div className="bg-white border shadow-sm rounded-sm">
      <Select
        onValueChange={(value: any) => {
          setYearBar(value);
        }}
      >
        <SelectTrigger className="w-[180px] text-lg">
          <p>Năm học:</p>
          <SelectValue placeholder={year} defaultValue={year} />
        </SelectTrigger>
        <SelectContent>
          {years.map((x) => (
            <>
              <SelectItem value={x + ""}>{x}</SelectItem>
            </>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
  return (
    <>
      <div className="flex gap-4">
        <div className="bg-white w-2/3 p-4 my-4 text-sm font-thin">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Square Cash"
                role="img"
                viewBox="0 0 512 512"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <rect width="512" height="512" rx="15%" fill="#00d632"></rect>
                  <path
                    d="m339.5 190.1c4 4 10.7 4 14.4 0l20-20.8c4.2-4 4-11.2-.5-15.6-15.7-13.7-34.1-24.2-53.9-30.8l6.3-30.5c1.4-6.7-3.6-12.9-10.3-12.9h-38.8c-5 .1-9.3 3.6-10.3 8.5l-5.6 27.1c-51.6 2.6-95.4 28.9-95.4 82.6 0 46.5 36.2 66.4 74.4 80.2 36.2 13.8 55.3 18.9 55.3 38.3 0 20-19.1 31.7-47.3 31.7-25.7 0-52.6-8.6-73.4-29.5-4.1-4.1-10.7-4.1-14.7 0l-21.5 21.6c-4.2 4.3-4.2 11.1 0 15.4 16.8 16.6 38.2 28.6 62.5 35.3l-5.9 28.6c-1.4 6.7 3.5 12.8 10.2 12.9l38.9.3c5.1 0 9.4-3.5 10.4-8.5l5.6-27.2c62.1-4.2 99.9-38.4 99.9-88.3 0-46-37.7-65.4-83.4-81.2-26.1-9.7-48.7-16.4-48.7-36.3 0-19.4 21.1-27.1 42.2-27.1 26.9 0 52.8 11.1 69.7 26.4z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
              <h5 className="text-xl">Doanh thu</h5>
            </div>
            <div>{selectYear}</div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              // width={730}
              // height={300}
              data={data}
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
              <Tooltip content={<CustomTooltipContent payload={data} />} />
              <Area
                type="monotone"
                dataKey="Doanh thu"
                stroke="#F8853E"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* PieChart */}
        <div className="bg-white w-1/3 p-4 my-4 text-sm font-thin">
          <div className=" flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 1024 1024"
                className="icon w-10 h-10"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M511.9 129.1s357.7 40.8 441.4 441.4H730s-11.2-230.7-218.1-218.1V129.1z"
                    fill="#FFFFFF"
                  ></path>
                  <path
                    d="M953.9 571H729.5v-0.5c0-0.3-1.4-27.8-11.6-62.9-9.3-32.3-28.2-77.7-64.9-110.6-36.5-32.7-84-47.6-141-44.1h-0.5V128.5l0.6 0.1c0.9 0.1 90.7 10.9 189.5 70.6 58 35 107.8 79.8 147.9 133.1 50.1 66.6 85.3 146.7 104.4 238.1v0.6z m-223.5-1h222.2c-19.1-91-54.1-170.8-104.1-237.1-40-53.2-89.7-97.9-147.7-132.8-94.6-57.1-180.8-69.3-188.5-70.4v222.2c57.1-3.4 104.6 11.6 141.2 44.4 36.9 33.1 55.9 78.7 65.2 111.1 9.6 32.6 11.5 58.8 11.7 62.6z"
                    fill=""
                  ></path>
                  <path
                    d="M511.9 191.3c-209.4 0-379.1 169.7-379.1 379.1s169.7 379.1 379.1 379.1c209.4 0 379.1-169.7 379.1-379.1S721.3 191.3 511.9 191.3zM402.5 759.2c-10.7-6.2-20.9-13.3-30.3-21.2m0-0.1c-47.9-40-78.4-100.2-78.4-167.5 0-120.4 97.6-218.1 218.1-218.1C632.3 352.4 730 450 730 570.5s-97.6 218.1-218.1 218.1c-39.9 0-77.2-10.7-109.4-29.4"
                    fill="#55B7A8"
                  ></path>
                  <path
                    d="M511.9 957.6c-52.3 0-103-10.2-150.7-30.4-46.1-19.5-87.5-47.4-123.1-83-35.6-35.6-63.5-77-83-123.1-20.2-47.7-30.4-98.4-30.4-150.7s10.2-103 30.4-150.7c19.5-46.1 47.4-87.5 83-123.1 35.6-35.6 77-63.5 123.1-83 47.7-20.2 98.4-30.4 150.7-30.4s103 10.2 150.7 30.4c46.1 19.5 87.5 47.4 123.1 83 35.6 35.6 63.5 77 83 123.1 20.2 47.7 30.4 98.4 30.4 150.7s-10.2 103-30.4 150.7c-19.5 46.1-47.4 87.5-83 123.1-35.6 35.6-77 63.5-123.1 83-47.7 20.2-98.4 30.4-150.7 30.4z m0-758.3c-50.1 0-98.7 9.8-144.5 29.2-44.2 18.7-83.9 45.5-118 79.5-34.1 34.1-60.8 73.8-79.5 118-19.4 45.8-29.2 94.4-29.2 144.5s9.8 98.7 29.2 144.5c18.7 44.2 45.5 83.9 79.5 118 34.1 34.1 73.8 60.8 118 79.5 45.8 19.4 94.4 29.2 144.5 29.2 50.1 0 98.7-9.8 144.5-29.2 44.2-18.7 83.9-45.5 118-79.5 34.1-34.1 60.8-73.8 79.5-118 19.4-45.8 29.2-94.4 29.2-144.5s-9.8-98.7-29.2-144.5c-18.7-44.2-45.5-83.9-79.5-118-34.1-34.1-73.8-60.8-118-79.5-45.8-19.4-94.4-29.2-144.5-29.2z m0 597.2c-39.9 0-79.1-10.5-113.4-30.5-11-6.4-21.6-13.8-31.4-22-51.6-43.1-81.3-106.4-81.3-173.6 0-60.4 23.5-117.2 66.2-159.9s99.5-66.2 159.9-66.2 117.2 23.5 159.9 66.2S738 510 738 570.4c0 60.4-23.5 117.2-66.2 159.9s-99.5 66.2-159.9 66.2z m-105.4-44.2c31.9 18.5 68.3 28.3 105.4 28.3 115.8 0 210.1-94.2 210.1-210.1s-94.2-210.1-210.1-210.1c-115.8 0-210.1 94.2-210.1 210.1 0 62.5 27.5 121.3 75.5 161.3L373 737l4.3-5.2c9.2 7.6 19 14.5 29.2 20.5l-5 8.6 5-8.6z"
                    fill="#0A0408"
                  ></path>
                  <path
                    d="M511.9 352.4V62.8c-126.8 0-242.7 46.5-331.6 123.3l189.2 219.3c38.2-33 87.9-53 142.4-53z"
                    fill="#FFFFFF"
                  ></path>
                  <path
                    d="M368.6 416.6L169 185.3l6.1-5.2c45.8-39.6 97.7-70.5 154-91.9C387.4 66.1 449 54.8 511.9 54.8h8v305.6h-8c-50.4 0-99.1 18.1-137.2 51l-6.1 5.2zM191.6 187l178.8 207.2c38-30.5 84.8-47.9 133.5-49.6V70.9c-58.2 0.9-115.1 11.7-169.1 32.2-52.2 19.8-100.3 48-143.2 83.9z"
                    fill="#0A0408"
                  ></path>
                  <path
                    d="M472.3 315.8v-200c-87.6 0-167.6 32.1-229.1 85.2l130.7 151.5c26.4-22.9 60.8-36.7 98.4-36.7z"
                    fill="#DC444A"
                  ></path>
                  <path
                    d="M952.3 571.5c0-243.8-197.6-441.4-441.4-441.4"
                    fill="#FFFFFF"
                  ></path>
                  <path
                    d="M960.3 571.5h-16c0-2.6 0-5.3-0.1-7.9l16-0.3c0.1 2.7 0.1 5.4 0.1 8.2zM943.7 548.2c-0.3-5.1-0.6-10.3-1.1-15.4l15.9-1.4c0.5 5.3 0.8 10.7 1.1 16l-15.9 0.8z m-2.8-30.8c-0.6-5.1-1.4-10.2-2.2-15.3l15.8-2.5c0.8 5.3 1.6 10.6 2.3 15.9l-15.9 1.9z m-4.9-30.6c-1-5-2.1-10.1-3.3-15.1l15.6-3.7c1.2 5.2 2.4 10.5 3.4 15.7l-15.7 3.1z m-7.1-30.1c-1.4-5-2.8-9.9-4.4-14.8l15.3-4.8c1.6 5.1 3.1 10.2 4.5 15.4l-15.4 4.2z m-9.2-29.5c-1.7-4.8-3.5-9.7-5.4-14.5l14.9-5.9c2 5 3.9 10 5.6 15.1l-15.1 5.3z m-11.4-28.8c-2.1-4.7-4.2-9.5-6.4-14.1l14.4-6.9c2.3 4.8 4.5 9.7 6.7 14.6l-14.7 6.4z m-13.4-28c-2.4-4.5-4.9-9.1-7.4-13.6l13.9-7.9c2.7 4.6 5.2 9.4 7.7 14.1l-14.2 7.4z m-15.3-26.9c-2.7-4.4-5.5-8.7-8.4-13l13.3-8.9c3 4.4 5.9 9 8.7 13.5l-13.6 8.4z m-17.3-25.7c-3-4.2-6.1-8.3-9.3-12.4l12.6-9.8c3.3 4.2 6.5 8.5 9.6 12.8l-12.9 9.4z m-19-24.4c-3.3-3.9-6.7-7.9-10.1-11.7l11.9-10.7c3.6 3.9 7.1 8 10.5 12.1l-12.3 10.3z m-20.7-23c-3.6-3.7-7.2-7.4-10.9-10.9l11.1-11.5c3.8 3.7 7.6 7.5 11.3 11.3l-11.5 11.1zM800.4 249c-3.8-3.4-7.7-6.8-11.7-10.1l10.3-12.3c4.1 3.4 8.2 6.9 12.1 10.5L800.4 249z m-23.7-19.9c-4-3.1-8.2-6.3-12.4-9.3l9.4-13c4.3 3.1 8.6 6.3 12.8 9.6l-9.8 12.7z m-25.1-18c-4.3-2.8-8.6-5.7-13-8.4l8.4-13.6c4.5 2.8 9.1 5.7 13.5 8.7l-8.9 13.3z m-26.2-16.3c-4.4-2.5-9-5-13.5-7.4l7.4-14.2c4.7 2.5 9.4 5.1 14 7.7l-7.9 13.9zM698 180.5c-4.6-2.2-9.3-4.4-14-6.4l6.4-14.7c4.9 2.1 9.8 4.4 14.5 6.7l-6.9 14.4z m-28.2-12.4c-4.8-1.9-9.6-3.7-14.4-5.4l5.3-15.1c5 1.8 10 3.6 15 5.6l-5.9 14.9z m-29.1-10.2c-4.9-1.5-9.9-3-14.8-4.4l4.2-15.4c5.1 1.4 10.3 2.9 15.4 4.5l-4.8 15.3z m-29.8-8.2c-5-1.2-10.1-2.3-15.1-3.3l3.1-15.7c5.2 1 10.5 2.2 15.7 3.4l-3.7 15.6z m-30.4-6c-5.1-0.8-10.2-1.6-15.3-2.2l2-15.9c5.3 0.7 10.6 1.4 15.9 2.3l-2.6 15.8z m-30.6-3.9c-5.1-0.5-10.3-0.8-15.4-1.1l0.9-16c5.3 0.3 10.7 0.7 16 1.1l-1.5 16zM518.8 138.2c-2.6 0-5.2-0.1-7.9-0.1v-16c2.7 0 5.5 0 8.1 0.1l-0.2 16z"
                    fill="#0A0408"
                  ></path>
                  <path
                    d="M511.9 129.1v223.3C632.3 352.4 730 450 730 570.5h223.3"
                    fill="#FFFFFF"
                  ></path>
                  <path
                    d="M953.3 578.5H722v-8c0-115.8-94.2-210.1-210.1-210.1h-8V129.1h16v215.4c57.4 2 111 25.3 151.9 66.1s64.1 94.5 66.1 151.9h215.4v16z"
                    fill="#0A0408"
                  ></path>
                  <path
                    d="M953.8 593.5h-1c-12.5 0-22.6-10.1-22.6-22.6v-1c0-12.5 10.1-22.6 22.6-22.6h1c12.5 0 22.6 10.1 22.6 22.6v1c-0.1 12.5-10.2 22.6-22.6 22.6z"
                    fill="#DC444A"
                  ></path>
                  <path
                    d="M953.8 601.5h-1c-16.8 0-30.6-13.7-30.6-30.6v-1c0-16.8 13.7-30.6 30.6-30.6h1c16.8 0 30.6 13.7 30.6 30.6v1c-0.1 16.9-13.8 30.6-30.6 30.6z m-1-46.1c-8 0-14.6 6.5-14.6 14.6v1c0 8 6.5 14.6 14.6 14.6h1c8 0 14.6-6.5 14.6-14.6v-1c0-8-6.5-14.6-14.6-14.6h-1z"
                    fill="#0A0408"
                  ></path>
                  <path
                    d="M512.4 152.1h-1c-12.5 0-22.6-10.1-22.6-22.6v-1c0-12.5 10.1-22.6 22.6-22.6h1c12.5 0 22.6 10.1 22.6 22.6v1c-0.1 12.5-10.2 22.6-22.6 22.6z"
                    fill="#DC444A"
                  ></path>
                  <path
                    d="M512.4 160.1h-1c-16.8 0-30.6-13.7-30.6-30.6v-1c0-16.8 13.7-30.6 30.6-30.6h1c16.8 0 30.6 13.7 30.6 30.6v1c-0.1 16.9-13.8 30.6-30.6 30.6z m-1-46c-8 0-14.6 6.5-14.6 14.6v1c0 8 6.5 14.6 14.6 14.6h1c8 0 14.6-6.5 14.6-14.6v-1c0-8-6.5-14.6-14.6-14.6h-1z"
                    fill="#0A0408"
                  ></path>
                </g>
              </svg>
              <h5 className="text-lg">
                Tỷ lệ giáo viên / học sinh / phụ huynh
              </h5>
            </div>
          </div>
          <ResponsiveContainer width={"100%"} height="80%">
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-2 w-full">
            <span className="bg-[#0088FE] p-1 rounded-sm text-white">
              Tổng số giáo viên
            </span>
            <span className=" bg-[#00C49F] p-1 rounded-sm text-white">
              Tổng số học sinh
            </span>
            <span className=" bg-[#FFBB28] p-1 rounded-sm text-white">
              Tổng số phụ huynh
            </span>
          </div>
        </div>
      </div>
      {/* StackedBarChart */}
      <div className="bg-white w-full p-4 text-sm font-thin">
        <div className=" flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="iconify iconify--fxemoji w-10 h-10"
              preserveAspectRatio="xMidYMid meet"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#DCE2E2"
                  d="M478.685 44.5H32a4.5 4.5 0 0 1 0-9h446.685a4.5 4.5 0 0 1 0 9zm4.5 44.918a4.5 4.5 0 0 0-4.5-4.5H32a4.5 4.5 0 0 0 0 9h446.685a4.5 4.5 0 0 0 4.5-4.5zm0 49.418a4.5 4.5 0 0 0-4.5-4.5H32a4.5 4.5 0 0 0 0 9h446.685a4.5 4.5 0 0 0 4.5-4.5zm0 49.418a4.5 4.5 0 0 0-4.5-4.5H32a4.5 4.5 0 0 0 0 9h446.685a4.5 4.5 0 0 0 4.5-4.5zm0 49.418a4.5 4.5 0 0 0-4.5-4.5H32a4.5 4.5 0 0 0 0 9h446.685a4.5 4.5 0 0 0 4.5-4.5zm0 49.418a4.5 4.5 0 0 0-4.5-4.5H32a4.5 4.5 0 0 0 0 9h446.685a4.5 4.5 0 0 0 4.5-4.5zm0 49.418a4.5 4.5 0 0 0-4.5-4.5H32a4.5 4.5 0 0 0 0 9h446.685a4.5 4.5 0 0 0 4.5-4.5zm0 49.418a4.5 4.5 0 0 0-4.5-4.5H32a4.5 4.5 0 0 0 0 9h446.685a4.5 4.5 0 0 0 4.5-4.5zm0 49.418a4.5 4.5 0 0 0-4.5-4.5H32a4.5 4.5 0 0 0 0 9h446.685a4.5 4.5 0 0 0 4.5-4.5z"
                ></path>
                <path
                  fill="#FF473E"
                  d="M183.96 483.418H82.669V137.39c0-12.364 10.023-22.387 22.387-22.387h56.517c12.364 0 22.387 10.023 22.387 22.387v346.028z"
                ></path>
                <path
                  fill="#00B1FF"
                  d="M318.431 483.418H217.14V296.187c0-12.364 10.023-22.387 22.387-22.387h56.517c12.364 0 22.387 10.023 22.387 22.387v187.231z"
                ></path>
                <path
                  fill="#A97DFF"
                  d="M452.902 483.418h-101.29V80.91c0-12.364 10.023-22.387 22.387-22.387h56.517c12.364 0 22.387 10.023 22.387 22.387v402.508z"
                ></path>
                <path
                  fill="#B9C5C6"
                  d="M478.685 489.418H32a7 7 0 0 1-7-7V40a7 7 0 1 1 14 0v435.418h439.685a7 7 0 1 1 0 14z"
                ></path>
              </g>
            </svg>
            <h5 className="text-lg">Tỷ lệ học sinh mới / học sinh cũ</h5>
          </div>
          <div>{selectYearBar}</div>
        </div>
        <ResponsiveContainer width="100%" height={550}>
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
            <YAxis stroke="0" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Học sinh cũ" stackId="a" fill="#F8853E" />
            <Bar dataKey="Học sinh mới" stackId="a" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
