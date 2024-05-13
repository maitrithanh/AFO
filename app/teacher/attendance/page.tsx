"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/utils/useFetch";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import DefaultImage from "@/app/components/shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import DialogProfile from "@/app/components/profile/DialogProfile";
import Button from "@/app/components/shared/Button";
import GetAttendanceClass from "@/utils/attendance/getAttendance";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GetClass from "@/utils/classes/getClass";
import { IoCalendarOutline } from "react-icons/io5";
import Swal from "sweetalert2";
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

const AttendancePage = () => {
  const { t } = useTranslation();
  const [closeDialog, setCloseDialog] = useState(false);
  const [dataStudentDetail, setDataStudentDetail] = useState({});
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { data: currentUserTeacher } = useFetch("Auth/current");

  //lấy id theo ngày từ id lớp
  const {
    arrGetAttendanceByClass,
    nameAttendanceByClassFirst,
    idAttendanceByClassFirst,
  } = GetAttendanceClass(currentUserTeacher?.classId);

  const { classId, getClassId, arrClassName } = GetClass();

  const [attendance, setAttendance] = useState("");

  useEffect(() => {
    setAttendance(idAttendanceByClassFirst);
  }, [idAttendanceByClassFirst]);

  useEffect(() => {
    setOjbData([]);
  }, [refresh]);

  const day = new Date();
  const year = day.getFullYear();

  //lấy thông tin lớp học
  const { data: detailClassData } = useFetch(
    `ClassRoom/Detail/id=${currentUserTeacher?.classId}&year=${year}`,
    refresh
  );
  //Lấy danh sách điểm danh theo ngày
  const { data: attendanceClassData, loading } = useFetch(
    `CheckIn/getListById?id=${attendance}`,
    refresh
  );

  const handleDialog = () => {
    setCloseDialog((currState) => !currState);
  };

  const searchChildInClass = (c: any): boolean => {
    const matchName: boolean = c.childName.toLowerCase().includes(search);
    return matchName;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      Started: "false",
      Ended: "false",
      Point: "",
      OffReason: "'",
      Note: "'",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //khi nhấn lưu thì set object data rỗng trước khi thêm data mới
    setOjbData([]);
    for (const key in data) {
      if (data[`Ended-${key.split("-")[1]}`] == true) {
        if (data[`Started-${key.split("-")[1]}`] == false) {
          alert(
            `STT: ${
              key.split("-")[1]
            } Chưa điểm danh vào lớp không thể điểm danh ra về!`
          );
          return;
        }
      }
      // xem id đã tách trong input có tồn tại không rồi lưu data vào objData để call api
      if (
        !(key.split("-")[1] === undefined) &&
        attendanceClassData.find((x: any) => x.id == key.split("-")[1])
      ) {
        // kiểm tra xem trong ojbData có tồn tài id đso chưa?
        if (!ojbData.find((x: any) => x.id == key.split("-")[1])) {
          ojbData.push({
            id: key.split("-")[1],
            Started: data[`Started-${key.split("-")[1]}`],
            Ended: data[`Ended-${key.split("-")[1]}`],
            Point: data[`Point-${key.split("-")[1]}`],
            OffReason: "''",
            Note: data[`Note-${key.split("-")[1]}`],
          });
        }
      }
    }
    Swal.fire({
      title: t("toastUpdate"),
      icon: "success",
      confirmButtonText: "Đóng",
      confirmButtonColor: "#F8853E",
      showConfirmButton: false,
      timer: 1500,
    });
    location.reload();

    callApiWithToken()
      .put(`CheckIn/save?id=${attendance}`)
      .then((response) => {
        setRefresh(true);
      })
      .catch((errors) => {
        Swal.fire({
          title: "Có lỗi khi cập nhật trạng thái lưu điểm danh!",
          icon: "error",
          confirmButtonText: "Đóng",
          confirmButtonColor: "#F8853E",
          showConfirmButton: false,
          timer: 1500,
        });
      });

    for (let i = 0; i < attendanceClassData.length; i++) {
      callApiWithToken()
        .put(
          `CheckIn/putById?id=${attendanceClassData[i]?.id}`,
          ojbData.find((x: any) => x.id == attendanceClassData[i]?.id),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setRefresh(true);
          handleRefresh();
        })
        .catch((error) => {
          toast.error("Có lỗi");
        });
    }
  };

  const handleRefresh = () => {
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  const [ojbData, setOjbData] = useState([] as object[]);
  const [openDialog, setOpenDialog] = useState(false);
  const [childIDChoose, setChildIDChoose] = useState("");

  const { data: dataPickup } = useFetch(`/Child/getPickups/${childIDChoose}`);

  return (
    <>
      {closeDialog ? (
        <DialogProfile
          handleDialog={handleDialog}
          dataProps={dataStudentDetail}
          teacher
        />
      ) : (
        ""
      )}

      <AlertDialog
        onOpenChange={() => {
          setOpenDialog((curr) => !curr);
        }}
        open={openDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Danh sách đưa đón
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-black">
              <div>
                <ul
                  role="list"
                  className="divide-y divide-gray max-h-[400px] overflow-auto"
                >
                  {dataPickup.length == 0 ? "Không có dữ liệu" : null}
                  {dataPickup &&
                    dataPickup.map((x: any) => (
                      <>
                        <li
                          className="flex md:gap-x-6 py-5 group w-full"
                          key={x.id}
                        >
                          <div className="md:w-5/12 flex min-w-0 gap-x-2">
                            <DefaultImage
                              key={x?.avatar}
                              img={getImageUrl(x?.avatar)}
                              fallback="/avatar.webp"
                              className={`h-24 w-24 flex-none rounded-full bg-gray-50`}
                              custom="w-[60px] h-[60px]"
                            />
                            {/* <img className="h-24 w-24 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                            <div className="min-w-0 flex-auto flex flex-col justify-evenly">
                              <p className="text-xl font-semibold leading-6 text-gray-900">
                                {x.fullName}
                              </p>
                              <p className="mt-1 truncate text-l leading-5 text-gray-500">
                                {x.phoneNumber}
                              </p>
                            </div>
                          </div>

                          <div className="md:w-6/12 hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-evenly">
                            <p className="text-xl leading-6 text-gray-900">
                              {t("address")}: {x.address}
                            </p>
                            <div className="mt-1 flex items-center gap-x-1.5">
                              {x.status ? (
                                <>
                                  <div
                                    className="cursor-pointer flex-none rounded-full bg-emerald-500/20 p-1"
                                    title={t("cancel")}
                                  >
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                  </div>
                                  <p className="text-l leading-5 text-gray-500">
                                    {t("allowedToPickUp")}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="cursor-pointer flex-none rounded-full bg-red-500/20 p-1"
                                    title={t("allow")}
                                  >
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                                  </div>
                                  <p className="text-l leading-5 text-gray-500">
                                    <del> {t("allowedToPickUp")}</del>
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </li>
                      </>
                    ))}
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Đóng</AlertDialogCancel>
            {/* <AlertDialogAction
              className="bg-green-500 hover:bg-green-900"
              onClick={() => {}}
            >
              Xác nhận duyệt
            </AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="h-[88vh] bg-white md:w-full m-auto rounded-xl">
        <div className="relative overflow-x-auto shadow-sm bg-white pt-2 sm:rounded-lg">
          <div className="p-4">
            <div>
              <div className="flex lg:flex-row flex-col items-center justify-between">
                <div className="flex justify-between w-full">
                  <div className="md:text-3xl flex items-center">
                    Điểm danh Lớp {detailClassData?.name}{" "}
                    <div className="bg-gray-100 shadow-sm rounded-lg mx-2 font-thin text-3xl ">
                      <Select
                        defaultValue={classId[0]?.trim()}
                        onValueChange={(value: any) => {
                          setAttendance(value);
                        }}
                      >
                        <SelectTrigger className="md:w-fill w-full text-2xl">
                          <p className="text-gray-600 mr-2">
                            <IoCalendarOutline />
                          </p>
                          <SelectValue
                            placeholder={nameAttendanceByClassFirst}
                            defaultValue={idAttendanceByClassFirst}
                          />
                        </SelectTrigger>
                        <SelectContent className="text-lg">
                          {arrGetAttendanceByClass
                            ?.map((data: any, index: any) => {
                              return (
                                <SelectItem
                                  key={data?.id}
                                  value={data?.id}
                                  className="text-lg"
                                >
                                  {data?.classOfDay?.split("-")[1]}
                                </SelectItem>
                              );
                            })
                            .reverse()}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <p className="md:text-xl flex items-center">
                      Giáo viên chủ nhiệm:
                      {detailClassData?.teachers.map((teacher: any) => {
                        return (
                          <span
                            className={`italic ml-2 flex items-center justify-center gap-2 bg-gray-100 p-2 rounded-md`}
                            key={teacher.teacherID}
                          >
                            <DefaultImage
                              img={getImageUrl(teacher.avatar)}
                              fallback="/avatar.webp"
                            />
                            {teacher.fullName}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="md:text-xl">
                  Số học sinh: {detailClassData?.count}
                </p>
              </div>
            </div>
            <div className="md:flex justify-between items-center">
              <div className="bg-white flex items-center md:mb-2 mb-4">
                <div className=" shadow-lg rounded-lg md:w-[480px] w-full flex">
                  <Input
                    type="email"
                    placeholder="Tìm kiếm..."
                    className="p-4 "
                    onChange={(event) => {
                      setSearch(event.target.value.toLowerCase());
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  label="Lưu điểm danh"
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[650px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-center text-lg">
                  <th scope="col" className="px-6 py-3">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hình
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Họ tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Vào lớp
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ra về
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nghỉ phép
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Điểm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ghi chú
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? "Đang tải..." : ""}
                {attendanceClassData
                  ?.filter(searchChildInClass)
                  .map((dataStudent: any, index: any) => {
                    return (
                      <tr
                        key={dataStudent.id}
                        className="odd:bg-white text-lg text-black text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {dataStudent.id}
                        </th>
                        <td className="px-6 py-4 text-left scale-125 flex justify-center items-center">
                          <DefaultImage
                            img={getImageUrl(dataStudent.avatar)}
                            fallback="/avatar.webp"
                          />
                        </td>
                        <td className="px-6 py-4 text-left font-semibold">
                          {dataStudent.childName}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            id={`Started-${dataStudent.id}`}
                            {...register(`Started-${dataStudent.id}`, {
                              required: false,
                            })}
                            type="checkbox"
                            defaultChecked={dataStudent.started}
                            className="scale-150 w-4 h-4"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            id={`Ended-${dataStudent.id}`}
                            {...register(`Ended-${dataStudent.id}`, {
                              required: false,
                            })}
                            type="checkbox"
                            defaultChecked={dataStudent.ended}
                            className="scale-150 w-4 h-4"
                          />
                        </td>
                        <td className="px-6 py-4">
                          {dataStudent.reason ? dataStudent.reason : "''"}
                        </td>
                        <td className="px-6 py-4 scale-125">
                          <input
                            id={`Point-${dataStudent.id}`}
                            {...register(`Point-${dataStudent.id}`, {
                              required: true,
                            })}
                            type="text"
                            defaultValue={
                              dataStudent.point ? dataStudent.point : "0"
                            }
                            className="w-14 border-2 px-2 py-1 font-bold text-lg text-center text-main rounded-md focus:outline-main"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <textarea
                            id={`Note-${dataStudent.id}`}
                            {...register(`Note-${dataStudent.id}`, {
                              required: false,
                            })}
                            className="border-2 px-2 py-1 rounded-md focus:outline-main"
                            placeholder="Ghi chú"
                            defaultValue={dataStudent.note}
                          />
                        </td>
                        <td
                          className="md:px-6 md:py-4 hover hover:text-main cursor-pointer"
                          // onClick={() => {
                          //   setDataStudentDetail({
                          //     avatar: dataStudent.avatar,
                          //     id: dataStudent.id,
                          //   });
                          //   setCloseDialog(true);
                          // }}
                          onClick={() => {
                            setOpenDialog((curr) => !curr);
                            setChildIDChoose(dataStudent.childId);
                            handleRefresh();
                          }}
                        >
                          <span className="flex justify-center items-center gap-2">
                            <PiUserListDuotone />
                            Danh sách đón
                          </span>
                          {/* <CiCircleMore size={24} /> */}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendancePage;
