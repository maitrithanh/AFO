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
import DialogProfile from "@/app/components/profile/DialogProfile";
import GetAttendanceClass from "@/utils/attendance/getAttendance";
import { IoCalendarOutline } from "react-icons/io5";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";

const AttendancePage = () => {
  const { t } = useTranslation();
  const [closeDialog, setCloseDialog] = useState(false);
  const [dataStudentDetail, setDataStudentDetail] = useState({});
  const [search, setSearch] = useState("");
  const [defaultClassID, setDefaultClassID] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { classId, getClassId, arrClassName } = GetClass();
  const [childI, setChildI] = useState("");
  const child = getCookie("child");

  const [attendance, setAttendance] = useState("");

  const day = new Date();
  const year = day.getFullYear();

  const { data: allClass } = useFetch(`ClassRoom/List/${year}`);
  const { data: listChild } = useFetch("parent/childrenlist");
  const infoChild = listChild?.find((x: any) => x.id == child);
  const infoClass = allClass?.find(
    (classInfo: any) => classInfo.name == infoChild?.classRoom
  );
  const {
    arrGetAttendanceByClass,
    nameAttendanceByClassFirst,
    idAttendanceByClassFirst,
  } = GetAttendanceClass(infoClass?.id);

  const { data: attendanceClassData, loading } = useFetch(
    `CheckIn/getListById?id=${idAttendanceByClassFirst}`,
    refresh
  );

  console.log(infoClass?.id);

  console.log(attendanceClassData?.find((x: any) => x.id == child));

  const handleDialog = () => {
    setCloseDialog((currState) => !currState);
  };

  const searchChildInClass = (c: any): boolean => {
    const matchID: boolean = c.childId === child;
    return matchID;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      Started: "false",
      Ended: "false",
      Point: "1",
      OffReason: "'",
      Note: "'",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setOjbData([]);
    for (const key in data) {
      if (
        !(key.split("-")[1] === undefined) &&
        attendanceClassData.find((x: any) => x.id == key.split("-")[1])
      ) {
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

    callApiWithToken()
      .put(`CheckIn/save?id=${attendance}`)
      .then((response) => {})
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
  }, 1000);
  const [ojbData, setOjbData] = useState([] as object[]);

  return (
    <>
      {closeDialog ? (
        <DialogProfile
          handleDialog={handleDialog}
          data={dataStudentDetail}
          teacher
          setRefresh={setRefresh((b) => b)}
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
                                {data?.classOfDay}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
                  ?.map((dataStudent: any, index: any) => {
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
                          {dataStudent.childName}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            id={`Started-${dataStudent.id}`}
                            type="checkbox"
                            defaultChecked={dataStudent.started}
                            className="scale-150"
                            readOnly
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
                            readOnly
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
                            readOnly
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
                            readOnly
                            defaultValue={dataStudent.note}
                          />
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
