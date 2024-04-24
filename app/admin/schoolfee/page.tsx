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

const Columns: TableTemplateColumn<FeeRes>[] = [
  {
    title: "TÊN PHÍ",
    getData: (x) => x.name,
  },
  {
    title: "SỐ TIỀN",
    getData: (x) => x.price.toLocaleString("en"),
  },
  {
    title: "KHỐI ÁP DỤNG",
    getData: (x) => x.grade,
  },
  {
    title: "NGÀY ÁP DỤNG",
    getData: (x) => x.addDate,
  },
  {
    title: "LOẠI PHÍ",
    getData: (x) => x.type,
  },
  {
    title: "TRẠNG THÁI",
    getData: (x) =>
      x.isActive ? (
        <span className="text-green-500">ĐANG ÁP DỤNG</span>
      ) : (
        <span className="text-red-500">ĐÃ HỦY</span>
      ),
  },
];

const gradeOptions: FilterOptions<FeeRes>[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Mầm",
    filter: (obj) => obj.grade.toLowerCase().includes("mầm"),
  },
  {
    value: "Chồi",
    filter: (obj) => obj.grade.toLowerCase().includes("chồi"),
  },
  {
    value: "Lá",
    filter: (obj) => obj.grade.toLowerCase().includes("lá"),
  },
];

const filterGrade: TableTemplateFilter = {
  name: "Khối",
  options: gradeOptions,
};

const activeOptions: FilterOptions<FeeRes>[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Đang áp dụng",
    filter: (obj) => obj.isActive,
  },
  {
    value: "Đã hủy",
    filter: (obj) => obj.isActive == false,
  },
];

const filterActive: TableTemplateFilter = {
  name: "Trạng thái",
  options: activeOptions,
};

const filterType: TableTemplateFilter<FeeRes> = {
  name: "Loại phí",
  options: [],
  autoFilter: (x) => x.type,
};

const defaultSort = (a: FeeRes, b: FeeRes): number => {
  if (b.isActive && !a.isActive) return 1;
  if (a.isActive && !b.isActive) return -1;
  return toYMD(a.addDate) > toYMD(b.addDate) ? -1 : 1;
};

const dateSort = (a: FeeRes, b: FeeRes): number => {
  if (a.addDate == b.addDate) return a.id - b.id;

  return toYMD(a.addDate) > toYMD(b.addDate) ? -1 : 1;
};

const sorts: TableTemplateSort<FeeRes>[] = [
  {
    title: "Mặc định",
    compare: defaultSort,
  },
  {
    title: "Mới nhất",
    compare: (a, b) => dateSort(a, b),
  },
  {
    title: "Cũ nhất",
    compare: (a, b) => -dateSort(a, b),
  },
  {
    title: "Số tiền nhỏ nhất",
    compare: (a, b) => a.price - b.price,
  },
  {
    title: "Số tiền lớn nhất",
    compare: (a, b) => b.price - a.price,
  },
];

const SchoolFee = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { data: MenuData } = useFetch(`/Tuition/getFees`, refresh);

  const dialog = (
    <div
      className={`${
        !openDialog ? "hidden opacity-0" : "block opacity-100"
      } transition-all`}
    >
      <DialogAddFee
        onClose={() => setOpenDialog(false)}
        onRefresh={() => setRefresh((x) => !x)}
      />
    </div>
  );

  return (
    <TableTemplate<FeeRes>
      title="Danh sách học phí"
      getKey={(x) => x.id + "_" + x.typeCode}
      dataSource={MenuData || []}
      columns={Columns}
      searchColumns={[Columns[0]]}
      searchPlaceHolder="Nhập tên phí..."
      addButton={{
        onClick: () => {
          setOpenDialog(true);
        },
      }}
      filters={[filterGrade, filterActive, filterType]}
      sortOptions={sorts}
      extraElementsToolBar={dialog}
      dateRange={{
        name: "Ngày áp dụng: ",
        filter: (obj, from, to) =>
          (from == "" || toYMD(obj.addDate) >= from) &&
          (to == "" || toYMD(obj.addDate) <= to),
      }}
    />
  );
};

export default SchoolFee;
