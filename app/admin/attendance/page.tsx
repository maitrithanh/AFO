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

const Columns: TableTemplateColumn[] = [
  {
    title: "Tên",
    getData: (x) => x.classOfDay,
  },
  {
    title: "Trạng thái",
    getData: (x) =>
      x.saved ? (
        <p className="text-green-600">Đã điểm danh</p>
      ) : (
        <p className="text-rose-600">Chưa điểm danh</p>
      ),
  },
];

const AttendancePage = () => {
  const [dateDefault, setDateDefault] = useState("");
  const [valueDate, setValueDate] = useState("");

  const { data: attendanceData } = useFetch(`CheckIn/getToDay`);
  const { data: attendanceByDate } = useFetch(
    `CheckIn/getByDate?date=${valueDate}`
  );

  useEffect(() => {
    if (attendanceData?.length > 0) {
      setDateDefault(attendanceData[0].classOfDay.split("-")[1].trim());
      setValueDate(toYMD(attendanceData[0].classOfDay.split("-")[1].trim()));
    }
  }, [attendanceData]);

  console.log("attendanceByDate", attendanceByDate);

  const selectYear = (
    <div className="bg-gray-100 shadow-sm rounded-lg">
      <input
        type="date"
        className="outline-main p-2 bg-gray-100 rounded-md"
        defaultValue={toYMD(dateDefault.trim())}
        onChange={(e) => setValueDate(e.target.value)}
      />
    </div>
  );

  return (
    <>
      <TableTemplate
        title="Danh sách điểm danh"
        dataSource={attendanceByDate || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Nhập tên lớp..."
        addButton={{ link: "#" }}
        actions={[
          { getLink: (x) => `/admin/attendance/${x.id}?date=${valueDate}` },
        ]}
        extraElementsToolBar={selectYear}
      />
      {attendanceByDate?.length <= 0 || attendanceByDate == null ? (
        <p className="flex justify-center items-center">
          Ngày {valueDate} chưa có dữ liệu điểm danh nào
        </p>
      ) : null}
    </>
  );
};

export default AttendancePage;
