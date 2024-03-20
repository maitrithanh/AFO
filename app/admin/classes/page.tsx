"use client";

import TableTemplate, {
  FilterOptions,
  TableTemplateColumn,
  TableTemplateFilter,
  TableTemplateSort,
} from "@/app/components/shared/TableTemplate";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoClose, IoWarning } from "react-icons/io5";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";

const Columns: TableTemplateColumn[] = [
  {
    title: "tên lớp",
    getData: (x) => x.name,
  },
  {
    title: "số học sinh",
    getData: (x) => x.count,
  },
  {
    title: "giáo viên chủ nhiệm",
    getData: (x) => x.teachers,
  },
  {
    title: "ghi chú",
    getData: (x) => x.note,
  },
];

const gradeOptions: FilterOptions[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Mầm",
    filter: (obj) => obj.name.toLowerCase().includes("mầm"),
  },
  {
    value: "Chồi",
    filter: (obj) => obj.name.toLowerCase().includes("chồi"),
  },
  {
    value: "Lá",
    filter: (obj) => obj.name.toLowerCase().includes("lá"),
  },
];

const filterGrade: TableTemplateFilter = {
  name: "Lớp",
  options: gradeOptions,
};

const sorts: TableTemplateSort[] = [
  {
    title: "Mặc định",
    compare: (a, b) => 0,
  },
  {
    title: "Số học sinh tăng dần",
    compare: (a, b) => a.count - b.count,
  },
  {
    title: "Số học sinh giảm dần",
    compare: (a, b) => b.count - a.count,
  },
];

const ClassesPage = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [openDialog, setOpenDialog] = useState(false);
  const [arrTeacher, setArrTeacher] = useState<any>([] as object[]);
  const [arrStudent, setArrStudent] = useState<any>([] as object[]);
  const [inputTeacherValue, setInputTeacherValue] = useState("");
  const [inputStudentValue, setInputStudentValue] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [onSelect, setOnSelect] = useState(false);

  //fetch data  const [inputTeacherValue, setInputTeacherValue] = useState("");

  const { data: classData } = useFetch(`/ClassRoom/List/${year}`, refresh);
  // const { data: dataTeacher } = useFetch("Teacher/getList");
  // const { data: dataStudent } = useFetch("Teacher/getList");

  const { data: dataTeacher } = useFetch("ClassRoom/teacherFilter");
  const { data: dataStudent } = useFetch("ClassRoom/studentFilter");

  const years = [];
  for (var i = 2024; i >= 2022; i--) years.push(i);
  const selectYear = (
    <div className="bg-gray-100 shadow-sm rounded-lg mx-4">
      <Select
        onValueChange={(value: any) => {
          setYear(value);
        }}
      >
        <SelectTrigger className="w-[180px] text-lg">
          <p>Năm học:</p>
          <SelectValue placeholder={year} defaultValue={year} />
        </SelectTrigger>
        <SelectContent>
          {years.map((x) => (
            <>
              <SelectItem value={x + ""}>{x}</SelectItem>
            </>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

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
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        Name: "",
        Note: "",
        teacherID: "",
        childID: "",
      });
      setArrStudent([]);
      setArrTeacher([]);
    }
  }, [reset, isSubmitSuccessful]);

  //Xử lý thêm giáo viên vào mảng
  const handleAddTeacherToArr = (teacherInfo: any, event: any) => {
    if (arrTeacher.length >= 2) {
      alert("Một lớp tối đa 2 giáo viên!");
    } else {
      if (
        arrStudent?.filter((x: any) => x.teacherID == teacherInfo.teacherID)
      ) {
        toast.error(`${teacherInfo.fullName} đã được thêm vào lớp`);
      } else {
        setInputTeacherValue(event?.target?.value || "");
        arrTeacher.push(teacherInfo);
        setTimeout(() => {
          setInputTeacherValue("");
          setOnSelect(false);
        }, 0);
      }
    }
  };

  //Xử lý thêm học sinh vào mảng
  const handleAddStudentToArr = (studentInfo: any, event: any) => {
    setInputStudentValue(event?.target?.value || "");
    if (arrStudent?.filter((x: any) => x.childID == studentInfo.childID)) {
      toast.error(`${studentInfo.fullName} đã được thêm vào lớp`);
    } else {
      arrStudent.push(studentInfo);
      setTimeout(() => {
        setInputStudentValue("");
        setOnSelect(false);
      }, 0);
    }
  };

  //Refresh
  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  // Xử lý gỡ giáo viên đã chọn
  const handleRemoveTeacherInArr = (i: any) => {
    if (i > -1) {
      arrTeacher.splice(i, 1);
      handleRefresh();
    }
  };
  // Xử lý gỡ học sinh đã chọn
  const handleRemoveStudentInArr = (i: any) => {
    if (i > -1) {
      arrStudent.splice(i, 1);
      handleRefresh();
    }
  };
  useEffect(() => {
    if (refresh) {
      setArrTeacher(arrTeacher);
      setArrStudent(arrStudent);
    }
  }, [refresh, arrTeacher, arrStudent]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }
    for (const keyForTeacherId in arrTeacher) {
      formData.append("teacherID", arrTeacher[keyForTeacherId]?.teacherID);
    }

    for (const keyForStudentId in arrStudent) {
      formData.append("childID", arrStudent[keyForStudentId]?.childID);
    }

    callApiWithToken()
      .post(`ClassRoom/addClassRoom`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Tạo lớp thành công");
        handleRefresh();
        setOpenDialog((curr) => !curr);
      })
      .catch((errors) => {
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
        <AlertDialogContent className="w-2/3">
          <AlertDialogHeader>
            <AlertDialogTitle>Thông tin lớp học</AlertDialogTitle>
            <AlertDialogDescription className="text-black font-bold">
              <div className="grid gap-4">
                <Input
                  id="Name"
                  label="Tên lớp học"
                  register={register}
                  errors={errors}
                />

                {/* Chọn Giáo Viên */}
                <div className="relative w-full border-slate-300 border-2 rounded-md p-4">
                  <label
                    htmlFor=""
                    className="absolute -top-3 bg-white text-gray-500"
                  >
                    Giáo viên
                  </label>
                  {/* chọn giáo viên */}
                  <div>
                    {dataTeacher ? (
                      dataTeacher.length > 0 ? (
                        <div className="flex items-center">
                          {arrTeacher?.map((data: any, i: number) => {
                            return (
                              <div
                                key={data.id}
                                className="p-2 text-main bg-gray-200 rounded-xl w-fit flex justify-center items-center mx-2"
                              >
                                <p className="text-lg">{data?.fullName}</p>
                                <span
                                  className="text-rose-600 ml-2 flex justify-center items-center cursor-pointer"
                                  onClick={() => {
                                    handleRemoveTeacherInArr(i);
                                  }}
                                >
                                  <IoClose size={24} />
                                </span>
                              </div>
                            );
                          })}
                          {arrTeacher ? (
                            arrTeacher.length <= 0 ? (
                              <p className="flex w-full justify-center items-center">
                                <span className="text-yellow-500 mx-1">
                                  <IoWarning size={20} />
                                </span>
                                Chưa có giáo viên nào được thêm
                              </p>
                            ) : null
                          ) : (
                            "Đang tải..."
                          )}
                        </div>
                      ) : (
                        <p className="flex w-full justify-center items-center">
                          <span className="text-yellow-500 mx-1">
                            <IoWarning size={20} />
                          </span>
                          Hiện không có giáo viên nào trống lớp
                        </p>
                      )
                    ) : null}
                    {dataTeacher ? (
                      dataTeacher.length > 0 ? (
                        <div className="mt-4">
                          <input
                            type="text"
                            list={"dataListTeacher"}
                            placeholder="Tìm giáo viên"
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
                      ) : null
                    ) : null}
                  </div>
                </div>
                {/* Chọn giáo viên */}
              </div>

              {/* =================================================================== */}

              {/* Chọn Học sinh */}
              <div className="relative w-full border-slate-300 border-2 rounded-md p-4 my-4">
                <label
                  htmlFor=""
                  className="absolute -top-3 bg-white text-gray-500"
                >
                  Học sinh
                </label>
                <div>
                  {dataStudent ? (
                    dataStudent.length > 0 ? (
                      <div className="flex items-center">
                        {arrStudent?.map((data: any, i: number) => {
                          return (
                            <div
                              key={data.id}
                              className="p-2 text-main bg-gray-200 rounded-xl w-fit flex justify-center items-center mx-2"
                            >
                              <p className="text-lg">{data?.fullName}</p>
                              <span
                                className="text-rose-600 ml-2 flex justify-center items-center cursor-pointer"
                                onClick={() => {
                                  handleRemoveStudentInArr(i);
                                }}
                              >
                                <IoClose size={24} />
                              </span>
                            </div>
                          );
                        })}
                        {arrStudent ? (
                          arrStudent.length <= 0 ? (
                            <p className="flex w-full justify-center items-center">
                              <span className="text-yellow-500 mx-1">
                                <IoWarning size={20} />
                              </span>
                              Chưa có học sinh nào được thêm
                            </p>
                          ) : null
                        ) : (
                          "Đang tải..."
                        )}
                      </div>
                    ) : (
                      <p className="flex w-full justify-center items-center">
                        <span className="text-yellow-500 mx-1">
                          <IoWarning size={20} />
                        </span>
                        Hiện không có học sinh nào chưa có lớp
                      </p>
                    )
                  ) : null}
                  {dataStudent ? (
                    dataStudent.length > 0 ? (
                      <div className="mt-4">
                        <input
                          type="text"
                          list={"dataListStudent"}
                          placeholder="Tìm học sinh"
                          onClick={() => {
                            setOnSelect(true);
                          }}
                          onChange={(e) => {
                            if (onSelect) {
                              handleAddStudentToArr(
                                dataStudent[e.target.value],
                                e
                              );
                            }
                          }}
                          value={inputStudentValue}
                          className="w-full p-4 outline-none shadow-3xl rounded-md border"
                        />
                        <datalist id="dataListStudent">
                          {dataStudent?.map((data: any, i: number) => {
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
                    ) : null
                  ) : null}
                </div>
                {/* ----------------------------- */}
              </div>
              <textarea
                {...register("Note", { required: true })}
                className="border-2 rounded-md p-4 text-xl w-full pt-4 outline-none bg-white font-light transition border-slate-300 h-80"
                placeholder="Ghi chú"
                id="Note"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600 hover:bg-green-900"
              onClick={handleSubmit(onSubmit)}
            >
              Tạo lớp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TableTemplate
        title="Danh sách lớp học"
        dataSource={classData || []}
        columns={Columns}
        actions={[{ getLink: (x) => `/admin/classes/${x.id}?&year=${year}` }]}
        searchColumns={[Columns[2], Columns[0]]}
        searchPlaceHolder="Nhập tên lớp hoặc tên giáo viên"
        addButton={{
          onClick: () => {
            setOpenDialog((curr) => !curr);
          },
        }}
        extraElementsToolBar={selectYear}
        filters={[filterGrade]}
        sortOptions={sorts}
      />
    </>
  );
};

export default ClassesPage;
