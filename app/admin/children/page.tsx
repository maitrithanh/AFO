"use client"

import TableTemplate, { FilterOptions, TableTemplateAction, TableTemplateColumn, TableTemplateFilter, TableTemplateSort } from "@/app/components/shared/TableTemplate"
import { ChildrenData } from "@/types/ChildrenData";
import { compareName } from "@/utils/compare";
import useFetch from "@/utils/useFetch";
import { useMemo } from "react";

const Columns: TableTemplateColumn<ChildrenData>[] = [
  {
    title: 'Mã số',
    getData: (x) => x.id
  },
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

const genderOptions: FilterOptions<ChildrenData>[] = [
  {
    value: 'Tất cả',
    filter: () => true
  },
  {
    value: 'Nam',
    filter: (obj) => obj.gender == 'Nam'
  },
  {
    value: 'Nữ',
    filter: (obj) => obj.gender == 'Nữ'
  },
]

const filterGender: TableTemplateFilter =
{
  name: 'Giới tính',
  options: genderOptions
}

const ChildPage = () => {
  const { data: dataChildren } = useFetch<ChildrenData[]>("Child/GetList");
  const { data: classData } = useFetch(`/ClassRoom/List/${new Date().getFullYear().toString()}`);

  const filterClasses = useMemo(() => { 
    var options: FilterOptions<ChildrenData>[] = [
      {
        value: 'Tất cả',
        filter: () => true
      }
    ]
    var classes = (classData as any[])?.map(x => x.name)
    if(classes) classes.forEach(x => { 
      options.push({
        value: x,
        filter: (obj) => obj.classRoom === x
      })
    })

    var filter: TableTemplateFilter =
    {
      name: 'Lớp',
      options: options
    }
    return filter;
  }, [dataChildren])

  return <TableTemplate<ChildrenData>
    title="Danh sách trẻ"
    dataSource={dataChildren || []}
    columns={Columns}
    actions={[Action]}
    addButton={{ link: '/admin/children/add' }}
    searchColumns={[Columns[0], Columns[1]]}
    searchPlaceHolder="Nhập tên hoặc mã số trẻ"
    sortOptions={sorts}
    filters={[filterClasses, filterGender]}
  />
}

export default ChildPage