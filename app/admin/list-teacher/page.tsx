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
import { MdBlock } from "react-icons/md";
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

const Columns: TableTemplateColumn<any>[] = [
  {
    title: "Hình",
    getData: (x) => (
      <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
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
  const [refresh, setRefresh] = useState(false);
  const [openDialogLock, setOpenDialogLock] = useState(false);
  const [idUserLock, setIdUserLock] = useState("");
  const [nameAccountLock, setNameAccountLock] = useState("");
  const [statusAccountLock, setStatusAccountLock] = useState(Boolean);
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
  const handleOpenDialogLock = (id: string, name: string, status: boolean) => {
    setIdUserLock(id);
    setNameAccountLock(name);
    setStatusAccountLock(status);
    setOpenDialogLock(true);
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
      {/* LockAccount */}
      <AlertDialog
        onOpenChange={() => {
          setOpenDialogLock((curr) => !curr);
        }}
        open={openDialogLock}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            {statusAccountLock ? (
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
                <CiEdit size={24} />
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
              handleOpenDialogLock(x.id, x.fullName, x.active);
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
