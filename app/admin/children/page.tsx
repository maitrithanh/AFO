"use client"

import TableTemplate, { TableTemplateAction, TableTemplateColumn, TableTemplateSort } from "@/app/components/shared/TableTemplate"
import { ChildrenData } from "@/types/ChildrenData";
import { compareName } from "@/utils/compare";
import useFetch from "@/utils/useFetch";

const Columns: TableTemplateColumn<ChildrenData>[] = [
  {
    title: 'Họ tên',
    getData: (x) => x.fullName
  },
  {
    title: 'Lớp',
    getData: (x) => x.classRoom
  },
  {
    title: 'ngày sinh',
    getData: (x) => x.birthDay
  },
  {
    title: 'Giới tính',
    getData: (x) => x.gender
  },
  {
    title: 'Người giám hộ',
    getData: (x) => x.parentName
  },
  {
    title: 'Số điện thoại',
    getData: (x) => x.phone
  },
]

const Action: TableTemplateAction<ChildrenData> = {
  getLink: (x) => `/admin/children/${x.id}`
}

const sorts: TableTemplateSort<ChildrenData>[] = [
  {
    title: 'Mới nhất',
    compare: (a, b) => a.joinDate <= b.joinDate ? 1 : -1
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

const ChildPage = () => {
  const { data: dataChildren } = useFetch<ChildrenData[]>("Child/GetList");

  return <TableTemplate<ChildrenData>
    title="Danh sách trẻ"
    dataSource={dataChildren || []}
    columns={Columns}
    actions={[Action]}
    addButton={{ link: '/admin/children/add' }}
    searchColumns={[Columns[0], Columns[5]]}
    searchPlaceHolder="Nhập tên hoặc số điện thoại..."
    sortOptions={sorts}
  />
}

export default ChildPage