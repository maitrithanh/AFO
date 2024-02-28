"use client"

import TableTemplate, { TableTemplateColumn } from "@/app/components/shared/TableTemplate"
import useFetch from "@/utils/useFetch";

const getWeekName = (week: string = "") => {
  var arr: string[] = week.split("-W");
  return "Tuần " + arr[1] + " - " + arr[0];
};

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
  />
}

export default MenuPage