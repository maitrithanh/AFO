"use client";

import TableTemplate, {
  FilterOptions,
  TableTemplateAction,
  TableTemplateColumn,
  TableTemplateFilter,
  TableTemplateSort,
} from "@/app/components/shared/TableTemplate";
import DefaultImage from "@/app/components/shared/defaultImage";
import { callApiWithToken } from "@/utils/callApi";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdBlock, MdEdit } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
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
import { GiShieldDisabled } from "react-icons/gi";
import { FaUserLock } from "react-icons/fa6";
import { IoMdTrash } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Columns: TableTemplateColumn<any>[] = [
  {
    title: "Hình",
    getData: (x) => (
      <div className="w-[40px] h-[40px]">
        <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
      </div>
    ),
  },
  {
    title: "Tên giáo viên",
    getData: (x) => x.fullName,
  },
  {
    title: "Số điện thoại",
    getData: (x) => x.phoneNumber,
  },
  {
    title: "CCCD",
    getData: (x) => x.idNumber,
  },
  {
    title: "Giới tính",
    getData: (x) => x.gender,
  },
  {
    title: "Ngày sinh",
    getData: (x) => x.birthDay,
  },
  {
    title: "Địa chỉ",
    getData: (x) => <p className="descriptNewsTable">{x.address}</p>,
  },
  {
    title: "Lớp phụ trách",
    getData: (x) => x.className,
  },
  {
    title: "Trình độ",
    getData: (x) => x.education,
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
//lọc giới tính
const genderOptions: FilterOptions<any>[] = [
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
//lọc trình độ
const educationOptions: FilterOptions<any>[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Tiến Sĩ",
    filter: (obj) => obj.education == "Tiến Sĩ",
  },
  {
    value: "Thạc Sĩ",
    filter: (obj) => obj.education == "Thạc Sĩ",
  },
  {
    value: "Đại Học",
    filter: (obj) => obj.education == "Đại Học",
  },
  {
    value: "Cao Đẳng",
    filter: (obj) => obj.education == "Cao Đẳng",
  },
  {
    value: "Trung Cấp",
    filter: (obj) => obj.education == "Trung Cấp",
  },
];

const filterEducation: TableTemplateFilter = {
  name: "Trình độ",
  options: educationOptions,
};
//lọc lớp
const classOptions: FilterOptions<any>[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Mầm",
    filter: (obj) => obj.className.includes("Mầm"),
  },
  {
    value: "Chồi",
    filter: (obj) => obj.className.includes("Chồi"),
  },
  {
    value: "Lá",
    filter: (obj) => obj.className.includes("Lá"),
  },
];

const filterClass: TableTemplateFilter = {
  name: "Lớp phụ trách",
  options: classOptions,
};

const searchCols = [Columns[1], Columns[2], Columns[3], Columns[7]];

const ListTeacherPage = () => {
  const [nameTeacher, setNameTeacher] = useState("");
  const [idTeacher, setIdTeacher] = useState("");
  const [classId, setClassId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAction, setOpenDialogAction] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [openDialogLock, setOpenDialogLock] = useState(false);
  const [openDialogForgot, setOpenDialogForgot] = useState(false);
  const [idUserUser, setIdUserUser] = useState("");
  const [phoneNumberUser, setPhoneNumberUser] = useState("");
  const [nameAccountUser, setNameAccountUser] = useState("");
  const [statusAccountUser, setStatusAccountUser] = useState(Boolean);
  const { data: dataTeacher } = useFetch("Teacher/getList", refresh);

  //Khi update tự động cập nhật
  const handleRefresh = () => {
    setRefresh(true);
    if (refresh) {
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  };

  //xoá giáo viên theo id
  const DeletePost = () => {
    callApiWithToken()
      .delete(`Teacher/remove?teacherID=${idTeacher}`)
      .then((response) => {
        if (!(response?.data?.data == "Vui lòng kiểm tra mã giáo viên")) {
          toast.success(`Xoá thành công`);
        } else {
          toast.error("Giáo viên này đã từng dạy không thể xoá");
        }
        handleRefresh();
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  const handleOpenDialog = (id: string, name: string, classId: string) => {
    setIdTeacher(id);
    if (dataTeacher?.find((x: any) => x.id == id)?.classId != null) {
      toast.error("Không thể xoá giáo viên này!");
    } else {
      setClassId(classId);
      setNameTeacher(name);
      setOpenDialog(true);
    }
  };
  //Mở dialog action lock/reset tài khoản
  const handleOpenDialogAction = (
    id: string,
    name: string,
    status: boolean,
    phoneNumber: string
  ) => {
    setIdUserUser(id);
    setNameAccountUser(name);
    setStatusAccountUser(status);
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
      <AlertDialog
        onOpenChange={() => {
          setOpenDialog((curr) => !curr);
        }}
        open={openDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc chắn xoá thông tin giáo viên?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-rose-600 font-bold">
              {nameTeacher}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 hover:bg-rose-900"
              onClick={() => {
                DeletePost();
              }}
            >
              Xác nhận xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                Bạn có chắc chắn mở khoá tài khoản giáo viên này?
              </AlertDialogTitle>
            ) : (
              <AlertDialogTitle>
                Bạn có chắc chắn khoá tài khoản giáo viên này?
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
              {nameAccountUser}
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

      <TableTemplate
        title="Danh sách giáo viên"
        dataSource={dataTeacher || []}
        addButton={{ link: "/admin/list-teacher/add" }}
        columns={Columns}
        searchColumns={searchCols}
        filters={[filterGender, filterEducation, filterClass]}
        actions={[
          {
            icon: (
              <span
                className="text-gray-600"
                title="Chỉnh sửa thông tin giáo viên"
              >
                <MdEdit size={24} />
              </span>
            ),
            getLink: (x) => `/admin/list-teacher/edit/${x.id}`,
          },
          {
            icon: (
              <span className="text-gray-600" title="Khoá tài khoản">
                <FaUserLock />
              </span>
            ),
            onClick: (x) => {
              handleOpenDialogAction(x.id, x.fullName, x.active, x.phoneNumber);
            },
          },
          {
            icon: (
              <span className="text-gray-600" title="DeActive giáo viên">
                <IoMdTrash size={24} />
              </span>
            ),
            onClick: (x) => {
              handleOpenDialog(x.id, x.fullName, x.classId);
            },
          },
        ]}
        searchPlaceHolder="Nhập tên hoặc số điện thoại..."
        //   sortOptions={sorts}
      />
    </>
  );
};

export default ListTeacherPage;
