"use client"

import TableTemplate, { TableTemplateColumn } from "@/app/components/shared/TableTemplate"
import { getWeekName } from "@/utils/dateTime";
import useFetch from "@/utils/useFetch";


const Columns: TableTemplateColumn[] = [
  {
    title: 'TÊN THỰC ĐƠN',
    getData: (x) => x.name
  },
  {
    title: 'MÔ TẢ',
    getData: (x) => <div className="md:max-w-[500px]">
      {x.desc}
    </div>
  },
  {
    title: 'ÁP DỤNG',
    getData: (x) => <>
      {getWeekName(x.start)} đến{" "}
      {getWeekName(x.end)}
    </>
  },
]

const MenuPage = () => {
  const { data: MenuData } = useFetch(`/Menu/List`);

  return <TableTemplate
    title="Danh sách thực đơn"
    dataSource={MenuData || []}
    columns={Columns}
    searchColumns={[Columns[0]]}
    searchPlaceHolder="Nhập tên thực đơn..."
    addButton={{ link: '/admin/menu/add' }}
    actions={[{ getLink: (x) => `/admin/menu/${x.id}` }]}
    exportExcel="ExportMenu"
  />
}

export default MenuPage