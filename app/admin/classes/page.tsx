"use client";

import TableTemplate, {
  FilterOptions,
  TableTemplateColumn,
  TableTemplateFilter,
  TableTemplateSort,
} from "@/app/components/shared/TableTemplate";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Input from "@/app/components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoClose, IoWarning } from "react-icons/io5";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import DefaultImage from "@/app/components/shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import { CiEdit } from "react-icons/ci";
import { link } from "fs";

const Columns: TableTemplateColumn[] = [
  {
    title: "tên lớp",
    getData: (x) => x.name,
  },
  {
    title: "số học sinh",
    getData: (x) => x.count,
  },
  {
    title: "giáo viên chủ nhiệm",
    getData: (x) => x.teachers,
  },
  {
    title: "ghi chú",
    getData: (x) => x.note,
  },
];

const gradeOptions: FilterOptions[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Mầm",
    filter: (obj) => obj.name.toLowerCase().includes("mầm"),
  },
  {
    value: "Chồi",
    filter: (obj) => obj.name.toLowerCase().includes("chồi"),
  },
  {
    value: "Lá",
    filter: (obj) => obj.name.toLowerCase().includes("lá"),
  },
];

const filterGrade: TableTemplateFilter = {
  name: "Lớp",
  options: gradeOptions,
};

const sorts: TableTemplateSort[] = [
  {
    title: "Mặc định",
    compare: (a, b) => 0,
  },
  {
    title: "Số học sinh tăng dần",
    compare: (a, b) => a.count - b.count,
  },
  {
    title: "Số học sinh giảm dần",
    compare: (a, b) => b.count - a.count,
  },
];

const ClassesPage = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [refresh, setRefresh] = useState(false);

  const { data: classData } = useFetch(`/ClassRoom/List/${year}`, refresh);

  const years = [];
  for (var i = 2024; i >= 2022; i--) years.push(i);
  const selectYear = (
    <div className="bg-gray-100 shadow-sm rounded-lg mx-4">
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

  return (
    <>
      <TableTemplate
        title="Danh sách lớp học"
        dataSource={classData || []}
        columns={Columns}
        actions={[
          {
            icon: (
              <span className="hover hover:text-main text-gray-500">
                <CiEdit size={24} />
              </span>
            ),
            getLink: (x) => `/admin/classes/${x.id}?&year=${year}?&edit=true`,
          },
          {
            getLink: (x) => `/admin/classes/${x.id}?&year=${year}?&edit=false`,
          },
        ]}
        searchColumns={[Columns[2], Columns[0]]}
        searchPlaceHolder="Nhập tên lớp hoặc tên giáo viên"
        addButton={{ link: `/admin/classes/add` }}
        extraElementsToolBar={selectYear}
        filters={[filterGrade]}
        sortOptions={sorts}
      />
    </>
  );
};

export default ClassesPage;
