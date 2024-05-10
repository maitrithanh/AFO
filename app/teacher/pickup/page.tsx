"use client";
import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import DefaultImage from "@/app/components/shared/defaultImage";
import { ChildrenData } from "@/types/ChildrenData";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import React, { useState } from "react";
import { PiUserListDuotone } from "react-icons/pi";
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

const Columns: TableTemplateColumn<ChildrenData>[] = [
  {
    title: "Hình",
    getData: (x) => (
      <div className="scale-125 flex">
        <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
      </div>
    ),
    width: "80",
  },
  {
    title: "Mã số",
    getData: (x) => x.id,
    width: "150",
  },
  {
    title: "Họ tên",
    getData: (x) => x.fullName,
    width: "200",
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
    width: "120",
  },
  {
    title: "ngày sinh",
    getData: (x) => x.birthDay,
    width: "150",
  },
  {
    title: "Giới tính",
    getData: (x) => x.gender,
    width: "120",
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
    width: "120",
  },
  {
    title: "Người giám hộ",
    getData: (x) =>
      x.parentName + (x.relationship != null ? ` (${x.relationship})` : ""),
    width: "200",
  },

  {
    title: "Số điện thoại",
    getData: (x) => x.phone,
    width: "200",
  },
];
const PickupPage = () => {
  const { data: dataChildren } = useFetch<ChildrenData[]>("Child/GetList");
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <AlertDialog
        onOpenChange={() => {
          setOpenDialog((curr) => !curr);
        }}
        open={openDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Xác nhận duyệt đơn tuyển sinh
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-black">
              <span className="font-bold">Mã đơn:</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-500 hover:bg-green-900"
              onClick={() => {}}
            >
              Xác nhận duyệt
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TableTemplate<ChildrenData>
        title=""
        dataSource={dataChildren || []}
        columns={Columns}
        actions={[
          {
            icon: (
              <span className="hover flex items-center gap-2 hover:text-main text-gray-500 hover:no-underline">
                <PiUserListDuotone />
                Danh sách đón trẻ
              </span>
            ),
            onClick: (x) => {
              setOpenDialog((curr) => !curr);
            },
          },
        ]}
        // addButton={{ link: "/admin/children/add" }}
        searchColumns={[Columns[1], Columns[2]]}
        searchPlaceHolder="Nhập tên hoặc mã số trẻ"
        // sortOptions={sorts}
        // filters={[filterClasses, filterGender]}
        exportExcel="ExportChildren"
      />
    </>
  );
};

export default PickupPage;
