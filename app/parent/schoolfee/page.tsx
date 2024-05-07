"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
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
import SchoolFeeHeader from "@/app/components/parent/schoolfee/SchoolFeeHeader";
import SchoolFeeItem from "@/app/components/parent/schoolfee/SchoolFee";
import SchoolFeeFooter from "@/app/components/parent/schoolfee/SchoolFeeFooter";
import useFetch from "@/utils/useFetch";
import PaymentModel from "@/types/payment";
import TableTemplate, {
  TableTemplateFilter,
  TableTemplateSort,
} from "@/app/components/shared/TableTemplate";
import { toYMD } from "@/utils/dateTime";
import { getCookie } from "cookies-next";

const filterStatus: TableTemplateFilter<PaymentModel> = {
  name: "Trạng thái",
  options: [
    {
      value: 'Đã đóng',
      filter: (x) => x.total >= x.paid
    },
    {
      value: 'Đóng thiếu',
      filter: (x) => x.total > x.paid
    },
    {
      value: 'Đóng dư',
      filter: (x) => x.total < x.paid
    },
  ],
};

const sorts: TableTemplateSort<PaymentModel>[] = [
  {
    title: "Mới nhất",
    compare: (a, b) => (toYMD(a.startTime) > toYMD(b.startTime) ? 1 : -1),
  },
  {
    title: "Cũ nhất",
    compare: (a, b) => (toYMD(a.startTime) > toYMD(b.startTime) ? -1 : 1),
  },
];

const SchoolFeePage = () => {
  const id = getCookie("child");
  const { data } = useFetch<PaymentModel[]>(
    "Tuition/GetTuitionByChild?childID=" + id
  );
  //const { data } = useFetch<PaymentModel[]>('Tuition/getalltuition?month=4&year=2024');

  const debt = useMemo(() => {
    var s = 0;
    data?.forEach((x) => (s += x.total - x.paid));
    return s;
  }, [data]);

  return (
    <div className="w-full min-h-[88vh] m-auto rounded-lg bg-white">
      <SchoolFeeHeader />

      <TableTemplate<PaymentModel>
        title=""
        dataSource={data || []}
        columns={[
          {
            title: "",
            getData: (x) => <SchoolFeeItem data={x} />,
          },
        ]}
        filters={[filterStatus]}
        dateRange={{
          name: "Ngày: ",
          filter: (obj, from, to) =>
            (from == "" || toYMD(obj.endTime) >= from) &&
            (to == "" || toYMD(obj.startTime) <= to),
        }}
        sortOptions={sorts}
      />
      <div className="flex w-full justify-center items-center">
        {data?.length == 0 ? "Không có dữ liệu" : null}
      </div>

      <SchoolFeeFooter debt={debt.toLocaleString("en")} />
    </div>
  );
};

export default SchoolFeePage;

{
  /* <div className="relative py-4 my-4 bg-white flex items-center w-full border-b">
  <div className="mr-2 text-green-400">
    <FaCheckCircle size={22} />
  </div>
  <div>
    <h3 className="text-lg">
      Học phí 12/2023: <strong>1.500.000</strong>
    </h3>
    <p className="text-sm">Hạn nộp: từ 01/12/2023</p>
  </div>
  <div className="absolute right-2 text-main">
    <AlertDialog>
      <AlertDialogTrigger> Chi tiết</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            Chi tiết học phí 12/2023
            <p className="text-sm font-normal ml-4 bg-green-500 text-white p-1 rounded-full">
              Đã thanh toán
            </p>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <div className="flex justify-between text-lg text-black">
                <p className="mr-2">Phí học:</p>
                <p className="font-bold">1.000.000</p>
              </div>
              <div className="flex justify-between text-lg text-black">
                <p className="mr-2">Phí ăn uống:</p>
                <p className="font-bold">500.000</p>
              </div>
              <div className="flex justify-between text-lg text-black">
                <p className="mr-2">Miễn giảm:</p>
                <p className="font-bold">0</p>
              </div>
              <div className="flex justify-between text-lg text-black pt-2 border-t">
                <p className="mr-2">Tổng học phí:</p>
                <p className="font-bold text-main">1.500.000</p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Thoát</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</div> */
}
