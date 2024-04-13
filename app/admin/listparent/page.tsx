"use client";

import TableTemplate, {
  FilterOptions,
  TableTemplateAction,
  TableTemplateColumn,
  TableTemplateFilter,
  TableTemplateSort,
} from "@/app/components/shared/TableTemplate";
import ParentListRes from "@/types/ParentListRes";
import { compareName } from "@/utils/compare";
import useFetch from "@/utils/useFetch";
import { FaUserLock } from "react-icons/fa6";
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
import { Children, useState } from "react";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";

const Columns: TableTemplateColumn<ParentListRes>[] = [
  {
    title: "Tên Phụ Huynh",
    getData: (x) => x.fullName,
  },
  {
    title: "Tên Trẻ Giám hộ",
    getData: (x) => <div>
      {x.children.map((y, i) => <div>
        {(y.relationship != null ? `(${y.relationship} của) ` : '') + y.fullName}{i < x.children.length - 1 ? ',' : ''}
      </div>)}
    </div>,
  },
  // {
  //   title: "Mối quan hệ",
  //   getData: (x) => x.relationship,
  // },
  {
    title: "Số điện thoại",
    getData: (x) => x.phoneNumber,
  },
  {
    title: "Giới tính",
    getData: (x) => (x.gender ? "Nam" : "Nữ"),
  },
  {
    title: "Ngày sinh",
    getData: (x) => x.birthDay,
  },
  {
    title: "Địa chỉ",
    getData: (x) => x.address,
  },
  {
    title: "Trạng thái",
    getData: (x) =>
      x.active ? (
        <span className="text-rose-600">Đã khoá</span>
      ) : (
        <span className="text-green-600">Hoạt động</span>
      ),
  },
];

const searchCols = [Columns[0], Columns[2]];

const Action: TableTemplateAction<ParentListRes> = {
  getLink: (x) => `/admin/listparent/${x.id}`,
};

const getJoinDate = (a: ParentListRes): string => {
  return a.children.reduce((res, curr) =>
    curr.joinDate > res.joinDate ? curr : res
  ).joinDate;
};

const sorts: TableTemplateSort<ParentListRes>[] = [
  {
    title: "Mới nhất",
    compare: (a, b) => (getJoinDate(a) <= getJoinDate(b) ? 1 : -1),
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

const genderOptions: FilterOptions<ParentListRes>[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Nam",
    filter: (obj) => obj.gender == 1,
  },
  {
    value: "Nữ",
    filter: (obj) => !obj?.gender,
  },
];

const filterGender: TableTemplateFilter = {
  name: "Giới tính",
  options: genderOptions,
};

const ParentPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [idUserLock, setIdUserLock] = useState("");
  const [nameAccountLock, setNameAccountLock] = useState("");
  const [statusAccountLock, setStatusAccountLock] = useState(Boolean);
  const [refresh, setRefresh] = useState(Boolean);
  const { data: dataParent } = useFetch<ParentListRes[]>(
    "Parent/GetList",
    refresh
  );

  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const handleOpenDialog = (id: string, name: string, status: boolean) => {
    setIdUserLock(id);
    setStatusAccountLock(status);
    setNameAccountLock(name);
    setOpenDialog(true);
  };

  const lockAccount = () => {
    callApiWithToken()
      .post(`Auth/locked?parentID=${idUserLock}`)
      .then((response) => {
        toast.success(
          `${
            statusAccountLock ? "Đã mở khoá tài khoản" : "Đã khoá tài khoản"
          } ${nameAccountLock}`
        );
        handleRefresh();
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

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
            {statusAccountLock ? (
              <AlertDialogTitle>
                Bạn có chắc chắn mở khoá tài khoản phụ huynh này?
              </AlertDialogTitle>
            ) : (
              <AlertDialogTitle>
                Bạn có chắc chắn khoá tài khoản phụ huynh này?
              </AlertDialogTitle>
            )}

            <AlertDialogDescription
              className={`${
                statusAccountLock ? "text-green-600" : "text-rose-600"
              } font-bold text-lg`}
            >
              {nameAccountLock}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className={` ${
                statusAccountLock
                  ? "bg-green-600 hover:bg-green-900"
                  : "bg-rose-600 hover:bg-rose-900"
              }`}
              onClick={() => {
                lockAccount();
              }}
            >
              {statusAccountLock
                ? "Xác nhận mở khoá tài khoản"
                : "Xác nhận khoá tài khoản"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TableTemplate<ParentListRes>
        title="Danh sách phụ huynh"
        dataSource={dataParent || []}
        columns={Columns}
        actions={[
          {
            icon: (
              <span className="text-gray-600" title="Khoá tài khoản">
                <FaUserLock />
              </span>
            ),
            onClick: (x) => {
              handleOpenDialog(
                x.id ? x.id : "",
                x.fullName ? x.fullName : "",
                x.active
              );
            },
          },
          Action,
        ]}
        searchColumns={searchCols}
        searchPlaceHolder="Nhập tên hoặc số điện thoại phụ huynh"
        sortOptions={sorts}
        filters={[filterGender]}
      />
    </>
  );
};

export default ParentPage;
