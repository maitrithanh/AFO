"use client";
import TableTemplate, {
  FilterOptions,
  TableTemplateColumn,
  TableTemplateFilter,
} from "@/app/components/shared/TableTemplate";
import { getAllEnroll, updateStatusEnroll } from "@/utils/handleAPI";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
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
import Loading from "@/app/components/shared/Loading";

const Columns: TableTemplateColumn[] = [
  {
    title: "Mã đăng ký",
    getData: (x) => x._id,
    width: "300",
  },
  {
    title: "Họ tên phụ huynh",
    getData: (x) => x.fullNameParent,
    width: "200",
  },
  {
    title: "Họ tên học sinh",
    getData: (x) => x.fullNameChild,
    width: "200",
  },
  {
    title: "Khối lớp",
    getData: (x) => x.level,
    width: "100",
  },
  {
    title: "Số điện thoại",
    getData: (x) => x.phoneNumber,
    width: "200",
  },
  {
    title: "Email",
    getData: (x) => x.email,
    width: "200",
  },
  {
    title: "Trạng thái",
    getData: (x) =>
      x.status ? (
        <span className="bg-green-500 px-2 text-white rounded-full">
          Đã duyệt
        </span>
      ) : (
        <span className="bg-main px-2 text-white rounded-full">Chờ duyệt</span>
      ),
    width: "110",
  },
];

const statusOptions: FilterOptions[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Đã duyệt",
    filter: (obj) => obj.status == true,
  },
  {
    value: "Chờ duyệt",
    filter: (obj) => obj.status == false,
  },
];
const filterStatus: TableTemplateFilter = {
  name: "Trạng thái",
  options: statusOptions,
};

const EnrollPage = () => {
  const [dataEnroll, setDataEnroll] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [onUpdate, setOnUpdate] = useState(false);
  const [idRequest, setIdRequest] = useState("");

  useEffect(() => {
    getAllEnroll(setDataEnroll);
  }, [onUpdate]);

  const handleRefresh = () => {
    setTimeout(() => {
      setOnUpdate(false);
    }, 1000);
  };

  const handleUpdateStatusEnroll = () => {
    updateStatusEnroll(idRequest);
    setOnUpdate(true);
    handleRefresh();
    Swal.fire({
      title: "Đã duyệt",
      icon: "success",
      confirmButtonText: "Đóng",
      confirmButtonColor: "#F8853E",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <>
      {dataEnroll.length == 0 ? <Loading /> : null}
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
              <span className="font-bold">Mã đơn:</span> {idRequest}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-500 hover:bg-green-900"
              onClick={() => {
                handleUpdateStatusEnroll();
              }}
            >
              Xác nhận duyệt
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TableTemplate
        title="Danh sách đơn đăng ký tuyển sinh trực tuyến"
        dataSource={dataEnroll || []}
        columns={Columns}
        actions={[
          {
            icon: (
              <span className="hover hover:text-main text-green-500">
                <FaCheckCircle size={24} />
              </span>
            ),
            onClick: (x) => {
              setIdRequest(x._id);
              setOpenDialog(true);
            },
          },
        ]}
        filters={[filterStatus]}
        searchColumns={[Columns[0], Columns[1], Columns[2], Columns[4]]}
        searchPlaceHolder="Nhập mã hoặc số điện thoại để tìm kiếm"
      />
    </>
  );
};

export default EnrollPage;