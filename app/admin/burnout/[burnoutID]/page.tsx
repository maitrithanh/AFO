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
import BackAction from "@/app/components/admin/BackAction";
import { useSearchParams } from "next/navigation";
import DefaultImage from "@/app/components/shared/defaultImage";
import { getImageUrl } from "@/utils/image";

const Columns: TableTemplateColumn[] = [
  {
    title: "Mã yêu cầu",
    getData: (x) => x.reqId,
  },
  {
    title: "Hình",
    getData: (x) => (
      <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
    ),
  },
  {
    title: "Họ tên",
    getData: (x) => x.fullName,
  },
  {
    title: "Lý do",
    getData: (x) => x.reason,
  },
  {
    title: "Ngày nghỉ",
    getData: (x) => (
      <p>
        {x.startTime} - {x.endTime}
      </p>
    ),
  },
];

const BurnOutPage = (params: any) => {
  const searchParams = useSearchParams();

  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const { data: classData } = useFetch(
    `CheckIn/getRequest?classId=${params.params.burnoutID}&month=${month}`
  );

  const months = [];
  for (var i = 1; i <= 12; i++) months.push(i);
  const selectMonth = (
    <div className="bg-gray-100 shadow-sm rounded-lg">
      <Select
        onValueChange={(value: any) => {
          setMonth(value);
        }}
      >
        <SelectTrigger className="w-[180px] text-lg">
          <p>Tháng:</p>
          <SelectValue placeholder={month} defaultValue={month} />
        </SelectTrigger>
        <SelectContent>
          {months.map((x) => (
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
      <BackAction />
      <TableTemplate
        title={`Danh sách xin nghỉ lớp ${searchParams.get("class")}`}
        dataSource={classData || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Tìm kiếm..."
        // addButton={{ link: "#" }}
        // actions={[{ getLink: (x) => `/admin/burnout/${x.id}` }]}
        extraElementsToolBar={selectMonth}
      />
    </>
  );
};

export default BurnOutPage;
