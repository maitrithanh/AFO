"use client";

import DefaultImage from "@/app/components/shared/defaultImage";
import TableTemplate, {
  FilterOptions,
  TableTemplateAction,
  TableTemplateColumn,
  TableTemplateFilter,
  TableTemplateSort,
} from "@/app/components/shared/TableTemplate";
import { ChildrenData } from "@/types/ChildrenData";
import { compareName } from "@/utils/compare";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import { useMemo } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { MdOutlineChangeCircle } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

const Columns: TableTemplateColumn<ChildrenData>[] = [
  {
    title: "Mã số",
    getData: (x) => x.id,
  },
  {
    title: "Hình",
    getData: (x) => (
      <div className="w-[40px] h-[40px]">
        <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
      </div>
    ),
  },
  {
    title: "Họ tên",
    getData: (x) => x.fullName,
  },
  {
    title: "Lớp",
    getData: (x) => {
      return x.classRoom ? (
        <span className="">{x.classRoom}</span>
      ) : (
        <span className="text-rose-600">Chưa có lớp</span>
      );
    },
  },
  {
    title: "ngày sinh",
    getData: (x) => x.birthDay,
  },
  {
    title: "Giới tính",
    getData: (x) => x.gender,
  },
  {
    title: "Trạng thái",
    getData: (x) =>
      x.status.toLocaleLowerCase() == "đang học" ? (
        <span className="text-green-600">{x.status}</span>
      ) : x.status.toLocaleLowerCase() == "nghỉ học" ? (
        <span className="text-rose-600">{x.status}</span>
      ) : (
        <span className="text-yellow-600">{x.status}</span>
      ),
  },
  {
    title: "Người giám hộ",
    getData: (x) =>
      x.parentName + (x.relationship != null ? ` (${x.relationship})` : ""),
  },
  {
    title: "Số điện thoại",
    getData: (x) => x.phone,
  },
];

const Action: TableTemplateAction<ChildrenData> = {
  getLink: (x) => `/admin/children/${x.id}`,
};

const sorts: TableTemplateSort<ChildrenData>[] = [
  {
    title: "Mới nhất",
    compare: (a, b) => (a.joinDate <= b.joinDate ? 1 : -1),
  },
  {
    title: "Tên (A-Z)",
    compare: (a, b) => compareName(a.fullName, b.fullName),
  },
  {
    title: "Tên (Z-A)",
    compare: (a, b) => -compareName(a.fullName, b.fullName),
  },
];

const genderOptions: FilterOptions<ChildrenData>[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Nam",
    filter: (obj) => obj.gender == "Nam",
  },
  {
    value: "Nữ",
    filter: (obj) => obj.gender == "Nữ",
  },
];

const filterGender: TableTemplateFilter = {
  name: "Giới tính",
  options: genderOptions,
};

const ChildPage = () => {
  const { data: dataChildren } = useFetch<ChildrenData[]>("Child/GetList");
  const { data: classData } = useFetch(
    `/ClassRoom/List/${new Date().getFullYear().toString()}`
  );

  const filterClasses = useMemo(() => {
    var options: FilterOptions<ChildrenData>[] = [
      {
        value: "Tất cả",
        filter: () => true,
      },
      {
        value: "Chưa có lớp",
        filter: (obj) => obj.classRoom === null,
      },
    ];
    var classes = (classData as any[])?.map((x) => x.name);
    if (classes)
      classes.forEach((x) => {
        options.push({
          value: x,
          filter: (obj) => obj.classRoom === x,
        });
      });

    var filter: TableTemplateFilter = {
      name: "Lớp",
      options: options,
    };
    return filter;
  }, [dataChildren, classData]);

  return (
    <TableTemplate<ChildrenData>
      title="Danh sách trẻ"
      dataSource={dataChildren || []}
      columns={Columns}
      actions={[
        // {
        //   icon: (
        //     <span className="hover hover:text-main text-gray-500">
        //       Chuyển lớp
        //     </span>
        //   ),
        //   onClick: (x) => {},
        // },
        Action,
      ]}
      addButton={{ link: "/admin/children/add" }}
      searchColumns={[Columns[1], Columns[2]]}
      searchPlaceHolder="Nhập tên hoặc mã số trẻ"
      sortOptions={sorts}
      filters={[filterClasses, filterGender]}
      exportExcel="ExportChildren"
    />
  );
};

export default ChildPage;
