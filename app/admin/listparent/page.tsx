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
import { IoClose } from "react-icons/io5";
import DefaultImage from "@/app/components/shared/defaultImage";
import { getImageUrl } from "@/utils/image";

const Columns: TableTemplateColumn<ParentListRes>[] = [
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
    title: "Họ tên",
    getData: (x) => x.fullName,
    width: "200",
  },
  {
    title: "Tên Trẻ Giám hộ",
    getData: (x) => (
      <div>
        {x.children.map((y, i) => (
          <div key={i}>
            {(false && y.relationship != null
              ? `(${y.relationship} của) `
              : "") + y.fullName}
            {i < x.children.length - 1 ? "," : ""}
          </div>
        ))}
      </div>
    ),
    width: "200",
  },
  // {
  //   title: "Mối quan hệ",
  //   getData: (x) => x.relationship,
  // },
  {
    title: "Số điện thoại",
    getData: (x) => x.phoneNumber,
    width: "200",
  },
  {
    title: "Giới tính",
    getData: (x) => (x.gender ? "Nam" : "Nữ"),
    width: "120",
  },
  {
    title: "Ngày sinh",
    getData: (x) => x.birthDay,
    width: "150",
  },
  {
    title: "Địa chỉ",
    getData: (x) => x.address,
    maxWidth: "200px",
  },
  {
    title: "Trạng thái",
    getData: (x) =>
      x.active ? (
        <span className="text-rose-600 flex justify-center items-center">
          Đã khoá
        </span>
      ) : (
        <span className="text-green-600 flex justify-center items-center">
          Hoạt động
        </span>
      ),
    width: "120",
  },
];

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
    compare: (a, b) => (getJoinDate(a) <= getJoinDate(b) ? -1 : 1),
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
  const [idUserUser, setIdUserUser] = useState("");
  const [nameAccountUser, setNameAccountUser] = useState("");
  const [phoneNumberUser, setPhoneNumberUser] = useState("");
  const [statusAccountUser, setStatusAccountUser] = useState(Boolean);
  const [openDialogAction, setOpenDialogAction] = useState(false);
  const [openDialogLock, setOpenDialogLock] = useState(false);
  const [openDialogForgot, setOpenDialogForgot] = useState(false);
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

  const handleOpenDialogAction = (
    id: string,
    name: string,
    status: boolean,
    phoneNumber: string
  ) => {
    setIdUserUser(id);
    setStatusAccountUser(status);
    setNameAccountUser(name);
    setPhoneNumberUser(phoneNumber);
    setOpenDialogAction(true);
  };

  const lockAccount = () => {
    callApiWithToken()
      .post(`Auth/locked?parentID=${idUserUser}`)
      .then((response) => {
        toast.success(
          `${
            statusAccountUser ? "Đã mở khoá tài khoản" : "Đã khoá tài khoản"
          } ${nameAccountUser}`
        );
        handleRefresh();
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra!");
      });
  };
  //Khôi phục tài khoản
  const forgotAccount = () => {
    callApiWithToken()
      .put(`Auth/forgotPass?phoneNumber=${phoneNumberUser}`)
      .then((response) => {
        toast.success(`Đã khôi phục mật khẩu tài khoản ${nameAccountUser}`);
        handleRefresh();
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

  return (
    <>
      {/* DialogActionAccount */}
      <AlertDialog
        onOpenChange={() => {
          setOpenDialogAction((curr) => !curr);
        }}
        open={openDialogAction}
      >
        <AlertDialogContent className="p-10 m-0">
          <AlertDialogHeader>
            <div
              onClick={() => {
                setOpenDialogAction((curr) => !curr);
              }}
              className="absolute right-0 top-0 p-2 m-1 hover:bg-[#c2c2c266] rounded-full cursor-pointer"
            >
              <IoClose size={28} className="text-rose-600" />
            </div>
            <AlertDialogDescription className="text-xl flex gap-4 justify-center items-center p-4">
              <button
                onClick={() => {
                  setOpenDialogLock((curr) => !curr);
                  setOpenDialogAction((curr) => !curr);
                }}
                className={`${
                  statusAccountUser ? "bg-green-600" : "bg-rose-600"
                } p-2 px-4 rounded-md text-white hover:scale-105 hover:opacity-80 transition-all`}
              >
                {statusAccountUser ? "Mở khoá tài khoản" : "Khoá tài khoản"}
              </button>
              <button
                onClick={() => {
                  setOpenDialogForgot((curr) => !curr);
                  setOpenDialogAction((curr) => !curr);
                }}
                className="bg-blue-600 p-2 px-4 rounded-md text-white hover:scale-105 hover:opacity-80 transition-all"
              >
                Khôi phục mật khẩu
              </button>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      {/* LockAccount */}
      <AlertDialog
        onOpenChange={() => {
          setOpenDialogLock((curr) => !curr);
        }}
        open={openDialogLock}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            {statusAccountUser ? (
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
                statusAccountUser ? "text-green-600" : "text-rose-600"
              } font-bold text-lg`}
            >
              {nameAccountUser}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className={` ${
                statusAccountUser
                  ? "bg-green-600 hover:bg-green-900"
                  : "bg-rose-600 hover:bg-rose-900"
              }`}
              onClick={() => {
                lockAccount();
              }}
            >
              {statusAccountUser
                ? "Xác nhận mở khoá tài khoản"
                : "Xác nhận khoá tài khoản"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* ForgotAccount */}
      <AlertDialog
        onOpenChange={() => {
          setOpenDialogForgot((curr) => !curr);
        }}
        open={openDialogForgot}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc chắn khôi phục mật khẩu tài khoản này?
            </AlertDialogTitle>
            <AlertDialogDescription className={`text-orange-600 text-2xl`}>
              {nameAccountUser} {phoneNumberUser}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className={`bg-orange-600 hover:bg-orange-900`}
              onClick={() => {
                forgotAccount();
              }}
            >
              Xác nhận khôi phục mật khẩu
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
              handleOpenDialogAction(
                x.id ? x.id : "",
                x.fullName ? x.fullName : "",
                x.active,
                x.phoneNumber ? x.phoneNumber : ""
              );
            },
          },
          Action,
        ]}
        searchColumns={[Columns[1], Columns[3]]}
        searchPlaceHolder="Nhập tên hoặc số điện thoại phụ huynh"
        sortOptions={sorts}
        filters={[filterGender]}
        exportExcel="exportParent"
        searchAddress={(x) => x.encodedAddress ?? ""}
      />
    </>
  );
};

export default ParentPage;
