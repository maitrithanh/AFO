"use client";

import TableTemplate, {
  FilterOptions,
  TableTemplateColumn,
  TableTemplateFilter,
  TableTemplateSort,
} from "@/app/components/shared/TableTemplate";
import FeeRes from "@/types/Fee";
import { getWeekName, toYMD } from "@/utils/dateTime";
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import DialogAddFee from "@/app/components/schoolfee/addDialog";
import PaymentModel, { getPaymentStatusStyle } from "@/types/payment";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DialogAddPayment from "@/app/components/payment/addDialog";

const Columns: TableTemplateColumn<PaymentModel>[] = [
  {
    title: "MÃ TRẺ",
    getData: (x) => x.childID,
  },
  {
    title: "TÊN TRẺ",
    getData: (x) => x.studentName,
  },
  {
    title: "NỘI DUNG",
    getData: (x) => x.content,
  },
  {
    title: "TỪ NGÀY",
    getData: (x) => x.startTime,
  },
  {
    title: "ĐẾN NGÀY",
    getData: (x) => (
      <span
        className={
          toYMD(x.endTime) < moment().format("yyyy-MM-DD") ? "text-red-400" : ""
        }
      >
        {x.endTime}
      </span>
    ),
  },
  {
    title: "PHẢI ĐÓNG",
    getData: (x) => x.total.toLocaleString("en"),
  },
  {
    title: "ĐÃ ĐÓNG",
    getData: (x) => x.paid.toLocaleString("en"),
  },
  {
    title: "TRẠNG THÁI",
    getData: (x) => (
      <span className={"text-" + getPaymentStatusStyle(x.statusCode)}>
        {x.status}
      </span>
    ),
  },
];

const filterStatus: TableTemplateFilter<PaymentModel> = {
  name: "Trạng thái",
  options: [],
  autoFilter: (x) => x.status,
};

const PaymentPage = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [openDialog, setOpenDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { data } = useFetch<PaymentModel[]>(
    `Tuition/GetAllTuition?month=${month}&year=${year}`,
    refresh
  );

  const years = [];
  for (var i = 2024; i >= 2022; i--) years.push(i);
  const selectYear = (
    <div className="bg-white border shadow-sm rounded-sm mx-4">
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

  const months = [];
  for (var i = 1; i <= 12; i++) months.push(i);
  const selectMonth = (
    <div className="bg-white border shadow-sm rounded-sm mx-4">
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

  const dialog = (
    <div
      className={`${
        !openDialog ? "hidden opacity-0" : "block opacity-100"
      } transition-all`}
    >
      <DialogAddPayment
        onClose={() => setOpenDialog(false)}
        onRefresh={() => setRefresh((x) => !x)}
      />
    </div>
  );

  return (
    <>
      <TableTemplate<PaymentModel>
        title="Lịch sử đóng tiền"
        dataSource={data || []}
        columns={Columns}
        searchColumns={[Columns[0], Columns[1], Columns[2]]}
        searchPlaceHolder="Nhập nội dung, mã trẻ hoặc tên trẻ"
        filters={[filterStatus]}
        extraElementsToolBar={
          <div className="flex">
            {selectYear} {selectMonth} {dialog}
          </div>
        }
        addButton={{
          onClick: () => {
            setOpenDialog(true);
          },
        }}
        dateRange={{
          name: "Ngày: ",
          filter: (obj, from, to) =>
            (from == "" || toYMD(obj.endTime) >= from) &&
            (to == "" || toYMD(obj.startTime) <= to),
        }}
      />
      <div className="flex w-full justify-center items-center">
        {data ? (data.length ? null : "Không có dữ liệu") : null}
      </div>
    </>
  );
};

export default PaymentPage;
