"use client";
import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import useFetch from "@/utils/useFetch";
import React from "react";

const Columns: TableTemplateColumn[] = [
  {
    title: "Hình",
    getData: (x) => x.avatar,
  },
  {
    title: "Họ tên",
    getData: (x) => x.fullName,
  },

  {
    title: "Số điện thoại",
    getData: (x) => x.phoneNumber,
  },
  {
    title: "Bằng lái",
    getData: (x) => x.license,
  },
  {
    title: "Năm sinh",
    getData: (x) => x.birthDay,
  },
];

const DriverPage = () => {
  const { data: busData } = useFetch(`BusDriver/getDriverList`);

  return (
    <>
      <TableTemplate
        title="Danh sách tài xế"
        dataSource={busData || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Nhập tên tài xế..."
        addButton={{ link: "#" }}
        actions={[{ getLink: (x) => `/admin/bus/driver/${x.id}` }]}
      />
    </>
  );
};

export default DriverPage;
