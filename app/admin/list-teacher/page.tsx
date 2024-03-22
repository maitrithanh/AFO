"use client";

import TableTemplate, {
  TableTemplateAction,
  TableTemplateColumn,
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
];

const searchCols = [Columns[0], Columns[1]];

const ListTeacherPage = () => {
  const [nameTeacher, setNameTeacher] = useState("");
  const [idTeacher, setIdTeacher] = useState("");
  const [classId, setClassId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
      <TableTemplate
        title="Danh sách giáo viên"
        dataSource={dataTeacher || []}
        addButton={{ link: "/admin/list-teacher/add" }}
        columns={Columns}
        searchColumns={searchCols}
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
              <span className="text-gray-600" title="DeActive giáo viên">
                <MdBlock size={24} />
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
