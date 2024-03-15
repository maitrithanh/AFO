"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/utils/useFetch";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import DefaultImage from "@/app/components/shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import GetClass from "@/utils/classes/getClass";
import { CiCircleMore } from "react-icons/ci";
import { SiGoogleclassroom } from "react-icons/si";
import DialogProfile from "@/app/components/profile/DialogProfile";
import Button from "@/app/components/shared/Button";
import GetAttendanceClass from "@/utils/attendance/getAttendance";
import { IoCalendarOutline } from "react-icons/io5";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";

const AttendancePage = () => {
  const { t } = useTranslation();
  const [closeDialog, setCloseDialog] = useState(false);
  const [dataStudentDetail, setDataStudentDetail] = useState({});
  const [search, setSearch] = useState("");
  const [defaultClassID, setDefaultClassID] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { classId, getClassId, arrClassName } = GetClass();

  const {
    arrGetAttendanceByClass,
    nameAttendanceByClassFirst,
    idAttendanceByClassFirst,
  } = GetAttendanceClass(defaultClassID);
  const [attendance, setAttendance] = useState("");

  useEffect(() => {
    setDefaultClassID(classId[0]?.trim());
  }, [classId]);

  useEffect(() => {
    setAttendance(idAttendanceByClassFirst);
  }, [idAttendanceByClassFirst]);

  useEffect(() => {
    setDefaultClassID(getClassId);
    setRefresh(true);
  }, [getClassId]);

  useEffect(() => {
    setOjbData([]);
  }, [refresh]);

  const day = new Date();
  const year = day.getFullYear();

  const { data: detailClassData } = useFetch(
    `ClassRoom/Detail/id=${defaultClassID}&year=${year}`,
    refresh
  );
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

    toast.success("Đã cập nhật");
    location.reload();

    callApiWithToken()
      .put(`CheckIn/save?id=${attendance}`)
      .then((response) => {
        setRefresh(true);
      })
      .catch((errors) => {
        toast.error("Có lỗi khi cập nhật trạng thái lưu điểm danh!");
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
        })
        .catch((error) => {
          toast.error("Có lỗi");
        });
    }
  };

  setTimeout(() => {
    setRefresh(false);
  }, 2000);
  const [ojbData, setOjbData] = useState([] as object[]);

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
      <div className="h-[600px] bg-white md:w-3/4 m-auto rounded-xl">
        <div className="relative overflow-x-auto shadow-sm bg-white pt-2 sm:rounded-lg">
          <div className="p-4">
            <div className="flex lg:flex-row flex-col items-center justify-between">
              <div className="">
                <div className="md:text-3xl flex items-center">
                  Điểm danh
                  <div className="bg-gray-100 shadow-sm rounded-lg mx-2 font-bold text-3xl ">
                    <Select
                      defaultValue={classId[0]?.trim()}
                      onValueChange={(value: any) => {
                        setAttendance(value);
                      }}
                    >
                      <SelectTrigger className="md:w-fill w-full text-lg">
                        <p className="text-gray-600 mr-2">
                          <IoCalendarOutline />
                        </p>
                        <SelectValue
                          placeholder={nameAttendanceByClassFirst}
                          defaultValue={idAttendanceByClassFirst}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {arrGetAttendanceByClass?.map(
                          (data: any, index: any) => {
                            return (
                              <SelectItem key={data?.id} value={data?.id}>
                                {data?.classOfDay?.split("-")[1]}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  - Lớp
                  <div className="bg-gray-100 shadow-sm rounded-lg ml-2 font-bold text-3xl ">
                    <Select
                      defaultValue={classId[0]?.trim()}
                      onValueChange={(value: any) => {
                        setDefaultClassID(value);
                      }}
                    >
                      <SelectTrigger className="md:w-[140px] w-full text-lg">
                        <p className="text-gray-600 mr-2">
                          <SiGoogleclassroom />
                        </p>
                        <SelectValue
                          placeholder={arrClassName[0]?.trim()}
                          defaultValue={classId[0]?.trim()}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {classId?.map((data: any, index: any) => {
                          return (
                            <SelectItem key={data?.trim()} value={data?.trim()}>
                              {arrClassName[index]}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex">
                  <p className="md:text-xl">
                    Giáo viên chủ nhiệm:
                    <span className="italic ml-2">
                      {detailClassData?.teachers}
                    </span>
                  </p>
                </div>
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

          <div className="overflow-y-auto max-h-[590px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-3">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hình
                  </th>
                  <th scope="col" className="px-6 py-3">
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
                  {/* <th scope="col" className="px-6 py-3"></th> */}
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
                        className="odd:bg-white text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {dataStudent.id}
                        </th>
                        <td className="px-6 py-4 text-left">
                          <DefaultImage
                            img={getImageUrl(dataStudent.avatar)}
                            fallback="/avatar.webp"
                          />
                        </td>
                        <td className="px-6 py-4 text-left">
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
                            className="scale-150"
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
                            className="scale-150"
                          />
                        </td>
                        <td className="px-6 py-4">
                          {dataStudent.reason ? dataStudent.reason : "''"}
                        </td>
                        <td className="px-6 py-4">
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
                        {/* <td
                          className="md:px-6 md:py-4 hover hover:text-main"
                          // onClick={() => {
                          //   setDataStudentDetail({
                          //     avatar: dataStudent.avatar,
                          //     id: dataStudent.id,
                          //   });
                          //   setCloseDialog(true);
                          // }}
                        >
                          <CiCircleMore size={24} />
                        </td> */}
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
