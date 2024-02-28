"use client"

import TableTemplate, { TableTemplateAction, TableTemplateColumn, TableTemplateSort } from "@/app/components/shared/TableTemplate";
import ParentListRes from "@/types/ParentListRes";
import { compareName } from "@/utils/compare";
import useFetch from "@/utils/useFetch";

const Columns: TableTemplateColumn<ParentListRes>[] = [
  {
    title: "Tên Phụ Huynh",
    getData: (x) => x.fullName
  },
  {
    title: "Số điện thoại",
    getData: (x) => x.phoneNumber
  },
  {
    title: "Giới tính",
    getData: (x) => x.gender ? "Nam" : "Nữ"
  },
  {
    title: "Ngày sinh",
    getData: (x) => x.birthDay
  },
  {
    title: "Địa chỉ",
    getData: (x) => x.address
  },
  {
    title: "Tên Trẻ",
    getData: (x) => <pre>
      {x.children.map((x) => x.fullName).join(",\n")}
    </pre>
  },
];

const searchCols = [Columns[0], Columns[1],];

const Action: TableTemplateAction<ParentListRes> = {
  getLink: (x) => `/admin/listparent/${x.id}`
}

const getJoinDate = (a: ParentListRes): string => {
  return a.children.reduce((res, curr) =>
    curr.joinDate > res.joinDate ? curr : res
  ).joinDate;
};

const sorts: TableTemplateSort<ParentListRes>[] = [
  {
    title: 'Mới nhất',
    compare: (a, b) => getJoinDate(a) <= getJoinDate(b) ? 1 : -1
  },
  {
    title: 'Tên (A-Z)',
    compare: (a, b) => compareName(a.fullName, b.fullName)
  },
  {
    title: 'Tên (Z-A)',
    compare: (a, b) => -compareName(a.fullName, b.fullName)
  }
]

const ParentPage = () => {
  const { data: dataParent } = useFetch<ParentListRes[]>("Parent/GetList");

  return <TableTemplate<ParentListRes>
    title="Danh sách phụ huynh"
    dataSource={dataParent || []}
    columns={Columns}
    actions={[Action]}
    searchColumns={searchCols}
    searchPlaceHolder="Nhập tên hoặc số điện thoại..."
    sortOptions={sorts}
  />
}

export default ParentPage