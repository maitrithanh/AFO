"use client";
import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import useFetch from "@/utils/useFetch";
import Link from "next/link";
import React from "react";

const Columns: TableTemplateColumn[] = [
  {
    title: "Tên tuyến",
    getData: (x) => x.routeName,
  },
  {
    title: "Số lượng trẻ",
    getData: (x) => x.count,
  },
  {
    title: "Bắt đầu",
    getData: (x) => x.startTime,
  },
  {
    title: "Tên tài xế",
    getData: (x) => x.fullName,
  },
  {
    title: "Biển số",
    getData: (x) => x.busID,
  },
];

const BusPage = () => {
  const { data: busData } = useFetch(`BusDriver/getBusList`);

  return (
    <>
      <TableTemplate
        title="Danh sách tuyến xe"
        dataSource={busData || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Nhập tên tuyến..."
        addButton={{ link: "#" }}
        actions={[{ getLink: (x) => `/admin/bus/${x.id}` }]}
      />
    </>
  );
};

export default BusPage;
