"use client";

import TableTemplate, {
  TableTemplateColumn,
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
import { toYMD } from "@/utils/dateTime";
import BackAction from "@/app/components/admin/BackAction";
import { useSearchParams } from "next/navigation";

const Columns: TableTemplateColumn[] = [
  {
    title: "Họ Tên",
    getData: (x) => x.childName,
  },
  {
    title: "Vào lớp",
    getData: (x) => (
      <input type="checkbox" defaultChecked={x.started} className="scale-150" />
    ),
  },
  {
    title: "Ra về",
    getData: (x) => (
      <input type="checkbox" defaultChecked={x.ended} className="scale-150" />
    ),
  },
  {
    title: "Nghỉ phép",
    getData: (x) => x.reason,
  },
  {
    title: "Điểm",
    getData: (x) => <p className="font-bold text-main">{x.point}</p>,
  },
  {
    title: "Ghi chú",
    getData: (x) => x.note,
  },
];

const DetailAttendancePage = ({ params }: any) => {
  const { data: attendanceByID } = useFetch(
    `CheckIn/getListById?id=${params?.attendanceID}`
  );

  const searchParams = useSearchParams();

  const { data: attendanceData } = useFetch(
    `CheckIn/getByDate?date=${searchParams.get("date")}`
  );

  const detailAttendance = attendanceData?.find(
    (x: any) => x.id == params?.attendanceID
  );

  return (
    <>
      <BackAction />

      <TableTemplate
        title={`Lớp ${detailAttendance?.classOfDay}`}
        dataSource={attendanceByID || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Nhập tên trẻ..."
        //   actions={[{ getLink: (x) => `/admin/attendance/${x.id}` }]}
      />
    </>
  );
};

export default DetailAttendancePage;
