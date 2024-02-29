"use client";

import TableTemplate, {
  TableTemplateColumn,
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

const HealthPage = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const { data: classData } = useFetch(`/ClassRoom/List/${year}`);

  const years = [];
  for (var i = 2024; i >= 2022; i--) years.push(i);
  const selectYear = (
    <div className="bg-gray-100 shadow-sm rounded-lg">
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
      searchColumns={[Columns[0]]}
      searchPlaceHolder="Nhập tên lớp..."
      addButton={{ link: "#" }}
      actions={[{ getLink: (x) => `/admin/classes/${x.id}?&year=${year}` }]}
      extraElementsToolBar={selectYear}
    />
  );
};

export default HealthPage;
