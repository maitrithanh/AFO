"use client";
import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import { callApiWithToken } from "@/utils/callApi";
import useFetch from "@/utils/useFetch";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";
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
import Input from "@/app/components/inputs/input";
import { register } from "module";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ChildrenData } from "@/types/ChildrenData";

const Columns: TableTemplateColumn[] = [
  {
    title: "Tên thông báo",
    getData: (x) => x.title,
  },

  {
    title: "Nội dung",
    getData: (x) => <p className="descriptNewsTable w-[490px]">{x.content}</p>,
  },
  {
    title: "Người nhận",
    getData: (x) => x.userId,
  },
  {
    title: "Ngày gửi",
    getData: (x) => x.sendTime,
  },
  {
    title: "Trạng thái",
    getData: (x) =>
      x.viewed ? (
        <span className="text-green-600">Đã xem</span>
      ) : (
        <span className="text-yellow-600">Chưa xem</span>
      ),
  },
];

const NotificationPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [idNotification, setIdNotification] = useState("");
  const [titleNotification, setTitleNotification] = useState("");
  const [typeNoti, setTypeNoti] = useState("all");

  const { data: notificationData } = useFetch(
    `Notification/getAllNotification`,
    refresh
  );
  const { data: dataChildren } = useFetch<ChildrenData[]>(
    "Child/GetList",
    refresh
  );

  const { data: dataTeacher } = useFetch("Teacher/getList", refresh);

  const handleRefresh = () => {
    setRefresh(true);
    setOpenDialog(false);
    setOpenDialogAdd(false);
    if (refresh) {
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      PhoneNumber: "",
      Title: "",
      Content: "",
    },
  });

  const DeleteNotification = (id: string) => {
    callApiWithToken()
      .delete(`Notification/removeByID?id=${id}`)
      .then((response) => {
        toast.success("Xoá thông báo thành công");
        handleRefresh();
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

  useEffect(() => {
    if (errors) {
      if (Object.values(errors)[0]) {
        toast.error("Không được để trống");
      }
    }
  }, [errors]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    if (data) {
      for (let key in data) {
        if (key === "PhoneNumber") {
          formData.append(key, data[key].split("-")[0]);
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    callApiWithToken()
      .post(`Notification/sendUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Gửi thông báo thành công");
        handleRefresh();
      })
      .catch((errors) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  return (
    <div>
      <div className="bg-white shadow-3xl my-2 px-2 py-1.5 rounded-md w-fit flex gap-2 hover:cursor-pointer">
        <div
          className={`bg-[#ff660d] text-white shadow-lg px-4 py-1.5 rounded-md text-lg transition-transform ease-in-out delay-150`}
        >
          Thông báo chung
        </div>
      </div>
      {/* Alert xoá thông báo */}
      <AlertDialog
        onOpenChange={() => {
          setOpenDialog((curr) => !curr);
        }}
        open={openDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn xoá thông báo?</AlertDialogTitle>
            <AlertDialogDescription className="text-rose-600 font-bold">
              {titleNotification}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 hover:bg-rose-900"
              onClick={() => {
                DeleteNotification(idNotification);
              }}
            >
              Xác nhận xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Alert tạo thông báo */}
      <AlertDialog
        onOpenChange={() => {
          setOpenDialogAdd((curr) => !curr);
        }}
        open={openDialogAdd}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tạo thông báo mới</AlertDialogTitle>
            <AlertDialogDescription className="text-black font-bold">
              {/* ------------------------------------------------ */}
              <div className="flex justify-center items-center">
                <div className="bg-white shadow-3xl my-2 px-2 py-1.5 rounded-md w-full flex justify-center items-center gap-2 hover:cursor-pointer">
                  <div
                    className={`${
                      typeNoti === "all"
                        ? "bg-[#ff660d] text-white shadow-lg"
                        : null
                    } px-4 py-1.5 rounded-md text-lg w-full flex justify-center items-center text-gray-500 transition-transform ease-in-out delay-150`}
                    onClick={() => {
                      setTypeNoti("all");
                    }}
                  >
                    Thông báo chung
                  </div>
                  <div
                    className={`${
                      typeNoti === "private"
                        ? "bg-[#ff660d] text-white shadow-lg"
                        : null
                    } px-4 py-1.5 rounded-md text-lg w-full flex justify-center items-center text-gray-500 transition-transform ease-in-out delay-150`}
                    onClick={() => {
                      setTypeNoti("private");
                    }}
                  >
                    Thông báo nội bộ
                  </div>
                </div>
              </div>
              {/* ------------------------------------ */}
              <div>
                <div className="relative z-0 w-full mt-2 bg-white group">
                  <Input
                    label="Người nhận"
                    id="PhoneNumber"
                    register={register}
                    errors={errors}
                    required
                    list="phoneNumber"
                  />

                  <datalist id="phoneNumber">
                    {typeNoti === "all"
                      ? dataChildren?.map((data: any) => {
                          return (
                            <option
                              key={data.id}
                              value={data.phone + "-" + data.fullName}
                            />
                          );
                        })
                      : dataTeacher?.map((data: any) => {
                          return (
                            <option
                              key={data.id}
                              value={data.phoneNumber + "-" + data.fullName}
                            />
                          );
                        })}
                  </datalist>
                </div>
                <div className="my-4">
                  <Input
                    label="Tiêu đề"
                    id="Title"
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
                <textarea
                  {...register("Content", { required: true })}
                  className="border-2 rounded-md p-4 text-xl w-full pt-4 outline-none bg-white font-light transition border-slate-300 h-80"
                  placeholder="Nội dung"
                  id="Content"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className="bg-orange-600 hover:bg-orange-400"
              onClick={handleSubmit(onSubmit)}
            >
              Tạo thông báo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Table danh sách thông báo đã tạo */}
      <div className="bg-white shadow-3xl p-4 rounded-md">
        <TableTemplate
          title={``}
          dataSource={notificationData || []}
          columns={Columns}
          searchColumns={[Columns[0]]}
          searchPlaceHolder="Tìm kiếm..."
          addButton={{
            onClick: () => {
              setOpenDialogAdd(true);
            },
          }}
          actions={[
            {
              icon: (
                <span
                  className="text-gray-600 hover:scale-110 transition-all"
                  title="Xoá thông báo"
                >
                  <AiTwotoneDelete size={24} />
                </span>
              ),
              onClick: (x) => {
                setOpenDialog(true);
                setIdNotification(x.id);
                setTitleNotification(x.title);
              },
            },
          ]}
          // extraElementsToolBar={selectMonth}
        />
        <div className="w-full flex justify-center items-center">
          {notificationData
            ? notificationData.length <= 0
              ? "Không có dữ liệu"
              : null
            : "Đang tải..."}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
