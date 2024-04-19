"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/utils/useFetch";
import { useTranslation } from "react-i18next";
import { CiCircleRemove, CiEdit } from "react-icons/ci";
import DefaultImage from "@/app/components/shared/defaultImage";
import { useRouter, useSearchParams } from "next/navigation";
import DialogProfile from "../../profile/DialogProfile";
import BackAction from "../BackAction";
import { getImageUrl } from "@/utils/image";
import { GoInfo } from "react-icons/go";
import { AiTwotoneDelete } from "react-icons/ai";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
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
import { FaSave } from "react-icons/fa";
import { IoIosAddCircle, IoMdAdd } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import Input from "@/app/components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TableTemplate, { TableTemplateColumn } from "../../shared/TableTemplate";

const ColumnsStudent: TableTemplateColumn[] = [
  {
    title: "Mã trẻ",
    getData: (x) => x.childID,
  },
  {
    title: "Hình",
    getData: (x) => (
      <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
    ),
  },
  {
    title: "Tên",
    getData: (x) => x.fullName,
  },
];

const DetailClasses = (id: any) => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const editMode = searchParams.get("edit");
  const [closeDialog, setCloseDialog] = useState(false);
  const [dataStudentDetail, setDataStudentDetail] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const token = getCookie("token");
  const [openDialog, setOpenDialog] = useState(false);
  const [childID, setChildID] = useState("");
  const [arrTeacher, setArrTeacher] = useState<any>([] as object[]);
  const [removeTeacher, setRemoveTeacher] = useState(false);
  const [onSelect, setOnSelect] = useState(false);
  const [inputTeacherValue, setInputTeacherValue] = useState("");
  const [openAddChildDialog, setOpenAddChildDialog] = useState(false);

  const { data: detailClassData } = useFetch(
    `ClassRoom/Detail/id=${id.id}&year=${year}`,
    refresh
  );
  const { data: dataTeacher } = useFetch("ClassRoom/teacherFilter", refresh);
  const { data: dataStudent } = useFetch("ClassRoom/studentFilter", refresh);

  const values = {
    Name: detailClassData?.name,
    Note: detailClassData?.note,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      Name: "",
      Note: "",
    },
    values,
  });

  useEffect(() => {
    if (removeTeacher == false) {
      setArrTeacher(detailClassData?.teachers);
    }
  }, [detailClassData, removeTeacher]);

  const handleDialog = () => {
    setCloseDialog((currState) => !currState);
    handleRefresh();
  };

  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (arrTeacher.length < 2) {
      alert("Một lớp phải có 2 giáo viên!");
      return;
    }
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }
    for (const keyForTeacherId in arrTeacher) {
      formData.append("teacherID", arrTeacher[keyForTeacherId]?.teacherID);
    }

    callApiWithToken()
      .put(`ClassRoom/putClassRoom?id=${id.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Lưu chỉnh sửa thành công");
        router.push(`/admin/classes`);
        handleRefresh();
      })
      .catch((errors) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

  const searchChildInClass = (c: any): boolean => {
    const matchName: boolean = c.fullName.toLowerCase().includes(search);
    const matchPhone: boolean = c.phone.includes(search);
    return matchName || matchPhone;
  };

  const handleRemoveChildOutClass = (childID: string) => {
    const formData = new FormData();
    formData.append("classId", id.id);
    formData.append("childID", childID);

    fetch(
      `${process.env.NEXT_PUBLIC_API_ENPOINT}ClassRoom/removeStudentOutClass`,
      {
        method: "DELETE",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        handleRefresh();
        toast.success("Đã gỡ trẻ ra khỏi lớp");
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

  // Xử lý gỡ giáo viên đã chọn
  const handleRemoveTeacherInArr = (teacherID: any, teacherName: any) => {
    toast.success(`Đã gỡ giáo viên ${teacherName}`);
    setRemoveTeacher(true);
    var index = arrTeacher
      .map((x: any) => {
        return x.teacherID;
      })
      .indexOf(teacherID);

    if (index > -1) {
      arrTeacher.splice(index, 1);
      handleRefresh();
    }
  };

  useEffect(() => {
    if (refresh) {
      setArrTeacher(arrTeacher);
    }
  }, [refresh, arrTeacher]);

  //Xử lý thêm giáo viên vào mảng
  const handleAddTeacherToArr = (teacherInfo: any, event: any) => {
    if (arrTeacher.length >= 2) {
      alert("Một lớp tối đa 2 giáo viên!");
    } else {
      if (arrTeacher.length >= 1) {
        if (
          arrTeacher?.filter((x: any) => x.teacherID == teacherInfo.teacherID)
            .length > 0
        ) {
          toast.error(`Giáo viên ${teacherInfo.fullName} đã được thêm vào lớp`);
          return;
        }
      }
      setInputTeacherValue(event?.target?.value || "");
      arrTeacher.push(teacherInfo);
      setTimeout(() => {
        setInputTeacherValue("");
        setOnSelect(false);
      }, 0);
    }
  };

  const handleAddChildInClass = (childID: string) => {
    const formData = new FormData();
    formData.append("classId", id.id);
    formData.append("childID", childID);

    fetch(`${process.env.NEXT_PUBLIC_API_ENPOINT}ClassRoom/addStudentToClass`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        handleRefresh();
        toast.success("Đã thêm trẻ vào lớp");
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

  return (
    <>
      {closeDialog ? (
        <DialogProfile
          handleDialog={handleDialog}
          dataProps={dataStudentDetail}
        />
      ) : null}
      <AlertDialog
        onOpenChange={() => {
          setOpenDialog((curr) => !curr);
        }}
        open={openDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc chắn xoá trẻ ra khỏi lớp?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-rose-600 font-bold">
              Xác nhận xoá trẻ có mã: {childID} ra khỏi lớp
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 hover:bg-rose-900"
              onClick={() => {
                handleRemoveChildOutClass(childID);
              }}
            >
              Xác nhận xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* KIDSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS */}
      <AlertDialog
        onOpenChange={() => {
          setOpenAddChildDialog((curr) => !curr);
        }}
        open={openAddChildDialog}
      >
        <AlertDialogContent className="max-w-[800px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Thêm trẻ vào lớp</AlertDialogTitle>
            <div>
              <TableTemplate
                title=""
                dataSource={dataStudent || []}
                columns={ColumnsStudent}
                actions={[
                  {
                    icon: (
                      <span className="hover hover:text-main text-gray-500">
                        <IoIosAddCircle size={24} />
                      </span>
                    ),
                    onClick: (x) => {
                      handleAddChildInClass(x.childID);
                    },
                  },
                ]}
              />
              {dataStudent?.length <= 0 ? (
                <p className="flex w-full justify-center items-center">
                  <span className="text-yellow-500 mx-1">
                    <IoWarning size={20} />
                  </span>
                  Hiện không có học sinh nào chưa có lớp
                </p>
              ) : null}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Đóng</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="h-[600px]">
        <div className="flex justify-between items-center mb-2">
          <BackAction />
          <div>
            {editMode == "true" ? (
              <div className="flex w-full items-center justify-end mt-4">
                <button
                  className="text-white bg-main hover:bg-mainBlur focus:ring-4 focus:outline-none font-medium rounded-md text-lg px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                  onClick={handleSubmit(onSubmit)}
                >
                  <span className="flex gap-2 items-center justify-center">
                    <FaSave />
                    Lưu thay đổi
                  </span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-sm bg-white pt-2 sm:rounded-lg">
          <div className="px-2">
            <div className="flex items-center justify-between">
              <div>
                {editMode == "true" ? (
                  <span>
                    <Input
                      label="Tên lớp học"
                      id="Name"
                      errors={errors}
                      register={register}
                      required
                    />
                  </span>
                ) : (
                  <p className="md:text-3xl">
                    Danh sách học sinh - Lớp {detailClassData?.name}
                  </p>
                )}
                <p className="md:text-xl">
                  Số học sinh: {detailClassData?.count}
                </p>
              </div>
              <div className="md:text-xl flex items-center justify-center">
                Giáo viên chủ nhiệm:
                <p className={`flex items-center justify-center `}>
                  {arrTeacher?.map((teacher: any) => {
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
                        {editMode == "true" ? (
                          <span
                            className="cursor-pointer hover:text-rose-600"
                            title="Gỡ giáo viên khỏi lớp"
                            onClick={() => {
                              handleRemoveTeacherInArr(
                                teacher.teacherID,
                                teacher.fullName
                              );
                            }}
                          >
                            <CiCircleRemove size={24} />
                          </span>
                        ) : null}
                      </span>
                    );
                  })}

                  {arrTeacher?.length < 2 ? (
                    dataTeacher?.length <= 0 ? (
                      <p className="flex w-full justify-center items-center bg-gray-100 p-2 rounded-md mx-2">
                        <span className="text-yellow-500 mx-1">
                          <IoWarning size={20} />
                        </span>
                        Hiện không có giáo viên nào trống lớp
                      </p>
                    ) : (
                      <>
                        {arrTeacher?.length < 1 ? (
                          <span
                            className={`italic ml-2 flex items-center justify-center gap-2 bg-gray-100 p-2 rounded-md`}
                          >
                            <div className="">
                              <input
                                type="text"
                                list={"dataListTeacher"}
                                placeholder="Giáo viên"
                                onClick={() => {
                                  setOnSelect(true);
                                }}
                                onChange={(e) => {
                                  if (onSelect) {
                                    handleAddTeacherToArr(
                                      dataTeacher[e.target.value],
                                      e
                                    );
                                  }
                                }}
                                value={inputTeacherValue}
                                className="w-full p-4 outline-none shadow-3xl rounded-md border"
                              />
                              <datalist id="dataListTeacher">
                                {dataTeacher?.map((data: any, i: number) => {
                                  return (
                                    <option
                                      key={data.id}
                                      value={i}
                                      onClick={() => {
                                        setOnSelect(true);
                                      }}
                                    >
                                      {data?.fullName}
                                    </option>
                                  );
                                })}
                              </datalist>
                            </div>
                          </span>
                        ) : null}
                        <span
                          className={`italic ml-2 flex items-center justify-center gap-2 bg-gray-100 p-2 rounded-md`}
                        >
                          <div className="">
                            <input
                              type="text"
                              list={"dataListTeacher"}
                              placeholder="Giáo viên"
                              onClick={() => {
                                setOnSelect(true);
                              }}
                              onChange={(e) => {
                                if (onSelect) {
                                  handleAddTeacherToArr(
                                    dataTeacher[e.target.value],
                                    e
                                  );
                                }
                              }}
                              value={inputTeacherValue}
                              className="w-full p-4 outline-none shadow-3xl rounded-md border"
                            />
                            <datalist id="dataListTeacher">
                              {dataTeacher?.map((data: any, i: number) => {
                                return (
                                  <option
                                    key={data.id}
                                    value={i}
                                    onClick={() => {
                                      setOnSelect(true);
                                    }}
                                  >
                                    {data?.fullName}
                                  </option>
                                );
                              })}
                            </datalist>
                          </div>
                        </span>
                      </>
                    )
                  ) : null}
                </p>
              </div>
            </div>
            <div className="md:flex justify-between items-center">
              <div className="bg-white w-full flex justify-between items-center md:mb-2 mb-4">
                <div className="rounded-lg md:w-[380px] w-full flex">
                  <form className="flex items-center max-w-sm mx-auto w-full">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 me-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        onChange={(event) => {
                          setSearch(event.target.value.toLowerCase());
                        }}
                        id="simple-search"
                        className="bg-gray-50 border focus-visible:outline-main border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tìm kiếm..."
                        required
                      />
                    </div>
                  </form>
                </div>
                <div>
                  {editMode == "true" ? (
                    <div className="flex w-full items-center justify-end mt-4">
                      <button
                        className="text-white bg-green-600 hover:bg-green-900 focus:outline-none font-medium rounded-full text-lg w-full px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                        onClick={() => setOpenAddChildDialog(true)}
                      >
                        <span className="flex gap-2 items-center justify-center">
                          <IoMdAdd />
                          Thêm trẻ
                        </span>
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full my-5">
                  + {t("addNew")}
                </button> */}
              </div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[590px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hình
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mã trẻ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Họ tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("dateOfBirth")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("phoneNumber")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Người giám hộ
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {detailClassData?.students
                  ?.filter(searchChildInClass)
                  .map((dataStudent: any, index: any) => {
                    return (
                      <tr
                        key={dataStudent.id}
                        // onClick={() => {
                        //   router.push(`/admin/detailChild/${dataStudent.id}`);
                        // }}
                        className="odd:bg-white cursor-pointer odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">
                          <DefaultImage
                            img={getImageUrl(dataStudent.avatar)}
                            className={`w-10 h-10 rounded-full cursor-pointer`}
                            custom="w-[50px] h-[50px]"
                            fallback="/avatar.webp"
                          />
                        </td>
                        <td className="px-6 py-4">{dataStudent.id}</td>
                        <td className="px-6 py-4">{dataStudent.fullName}</td>
                        <td className="px-6 py-4">{dataStudent.birthDay}</td>
                        <td className="px-6 py-4">{dataStudent.phone}</td>
                        <td className="px-6 py-4">{dataStudent.parentName}</td>
                        <td className="md:px-6 md:py-4 hover flex">
                          <span
                            className="hover:text-main mx-1"
                            onClick={() => {
                              setDataStudentDetail({
                                avatar: dataStudent.avatar,
                                id: dataStudent.id,
                              });
                              setCloseDialog(true);
                            }}
                          >
                            <CiEdit size={24} />
                          </span>
                          <span
                            className="hover:text-main mx-1"
                            onClick={() => {
                              router.push(
                                `/admin/detailChild/${dataStudent.id}`
                              );
                            }}
                          >
                            <GoInfo size={24} />
                          </span>
                          {editMode == "true" ? (
                            <span
                              className="hover:text-main mx-1"
                              onClick={() => {
                                setChildID(dataStudent.id);
                                setOpenDialog(true);
                              }}
                            >
                              <AiTwotoneDelete size={24} />
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {editMode == "true" ? (
          <div className="mt-4">
            <p className="ml-1 text-lg">Ghi chú</p>
            <textarea
              {...register("Note", { required: false })}
              className={`border-2 rounded-md p-4 text-xl w-full outline-none bg-white font-light transition border-slate-300 h-40 focus:border-orange-500`}
              placeholder="Ghi chú"
              id="Note"
            />
          </div>
        ) : (
          <div className="mt-4">
            <p className="ml-1 text-lg">Ghi chú</p>
            <div className="border bg-[#e1e1e14a] border-slate-300 w-full p-2 rounded-md italic text-lg">
              {detailClassData?.note}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailClasses;
