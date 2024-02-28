"use client"

import TableTemplate, { TableTemplateColumn } from "@/app/components/shared/TableTemplate"
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DialogAddEvent from "@/app/components/admin/health/DialogAddEvent";

const Columns: TableTemplateColumn[] = [
  {
    title: 'ngày khám',
    getData: (x) => x.examDate
  },
  {
    title: 'nội dung khám',
    getData: (x) => x.content
  },
]

const HealthPage = () => {
  const [closeDialogAddEvent, setCloseDialogAddEvent] = useState(false);

  const { data: healthEvent } = useFetch("Healthy/getListEvent")

  const onClose = () => {
    setCloseDialogAddEvent((curr) => !curr);
  };

  const dialog = <div
    className={`${!closeDialogAddEvent ? "hidden opacity-0" : "block opacity-100"
      } transition-all`}
  >
    <DialogAddEvent onClose={onClose} />
  </div>

  const selectMonth = <div className="flex p-1 m-2 rounded-md bg-gray-100 shadow-sm">
    <div className="inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
      </svg>
    </div>

    <Select>
      <SelectTrigger className="w-[110px] text-md">
        <SelectValue placeholder="Tháng 1" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="t1" className="text-md">
          Tháng 1
        </SelectItem>
        <SelectItem value="t2" className="text-md">
          Tháng 2
        </SelectItem>
        <SelectItem value="t3" className="text-md">
          Tháng 3
        </SelectItem>
        <SelectItem value="t4" className="text-md">
          Tháng 4
        </SelectItem>
      </SelectContent>
    </Select>
  </div>

  return <TableTemplate
    title="Lịch khám sức khoẻ"
    dataSource={healthEvent || []}
    columns={Columns}
    searchColumns={[Columns[1]]}
    searchPlaceHolder="Nhập nội dung khám..."
    addButton={{ onClick: () => onClose() }}
    actions={[{ getLink: (x) => `/admin/health/${x.id}` }]}
    extraElementsToolBar={<>
      {dialog} {selectMonth}
    </>}
  />
}

export default HealthPage