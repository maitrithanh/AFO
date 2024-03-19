"use client";

import TableTemplate, {
  FilterOptions,
  TableTemplateColumn, TableTemplateFilter, TableTemplateSort,
} from "@/app/components/shared/TableTemplate";
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    value: 'Tất cả',
    filter: () => true
  },
  {
    value: 'Mầm',
    filter: (obj) => obj.name.toLowerCase().includes('mầm')
  },
  {
    value: 'Chồi',
    filter: (obj) => obj.name.toLowerCase().includes('chồi')
  },
  {
    value: 'Lá',
    filter: (obj) => obj.name.toLowerCase().includes('lá')
  },
]

const filterGrade: TableTemplateFilter =
{
  name: 'Lớp',
  options: gradeOptions
}

const sorts: TableTemplateSort[] = [
  {
    title: 'Mặc định',
    compare: (a, b) => 0
  },
  {
    title: 'Số học sinh tăng dần',
    compare: (a, b) => a.count - b.count
  },
  {
    title: 'Số học sinh giảm dần',
    compare: (a, b) => b.count - a.count
  }
]

const ClassesPage = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const { data: classData } = useFetch(`/ClassRoom/List/${year}`);

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
    <TableTemplate
      title="Danh sách lớp học"
      dataSource={classData || []}
      columns={Columns}
      actions={[{ getLink: (x) => `/admin/classes/${x.id}?&year=${year}` }]}
      searchColumns={[Columns[2], Columns[0]]}
      searchPlaceHolder="Nhập tên lớp hoặc tên giáo viên"
      addButton={{ link: "#" }}
      extraElementsToolBar={selectYear}
      filters={[filterGrade]}
      sortOptions={sorts}
    />
  );
};

export default ClassesPage;
