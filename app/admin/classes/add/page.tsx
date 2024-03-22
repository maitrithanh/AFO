"use client";
import BackAction from "@/app/components/admin/BackAction";
import Input from "@/app/components/inputs/input";
import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import DefaultImage from "@/app/components/shared/defaultImage";
import { callApiWithToken } from "@/utils/callApi";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
import { IoWarning } from "react-icons/io5";

const ColumnsTeacher: TableTemplateColumn[] = [
  {
    title: "Mã giáo viên",
    getData: (x) => x.teacherID,
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

const AddTeacherPage = () => {
  const router = useRouter();

  const date = new Date();
  const year = date.getFullYear();

  const { data: dataTeacher } = useFetch("ClassRoom/teacherFilter");
  const { data: dataStudent } = useFetch("ClassRoom/studentFilter");

  const [arrTeacher, setArrTeacher] = useState<any>([] as object[]);
  const [arrStudent, setArrStudent] = useState<any>([] as object[]);
  const [onSelect, setOnSelect] = useState(false);
  const [inputTeacherValue, setInputTeacherValue] = useState("");
  const [inputStudentValue, setInputStudentValue] = useState("");
  const [refresh, setRefresh] = useState(false);

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
        router.push(`/admin/classes`);
        handleRefresh();
      })
      .catch((errors) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

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

  //Xử lý thêm học sinh vào mảng
  const handleAddStudentToArr = (studentInfo: any, event: any) => {
    if (arrStudent.length >= 1) {
      if (
        arrStudent?.filter((x: any) => x.childID == studentInfo.childID)
          .length > 0
      ) {
        toast.error(`${studentInfo.fullName} đã được thêm vào lớp`);
        return;
      }
    }
    setInputStudentValue(event?.target?.value || "");
    arrStudent.push(studentInfo);
    setTimeout(() => {
      setInputStudentValue("");
      setOnSelect(false);
    }, 0);
  };
  //Refresh
  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  // Xử lý gỡ giáo viên đã chọn
  const handleRemoveTeacherInArr = (teacherID: any) => {
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
  // Xử lý gỡ học sinh đã chọn
  const handleRemoveStudentInArr = (childID: any) => {
    var index = arrStudent
      .map((x: any) => {
        return x.childID;
      })
      .indexOf(childID);
    if (index > -1) {
      arrStudent.splice(index, 1);
      handleRefresh();
    }
  };

  useEffect(() => {
    if (refresh) {
      setArrTeacher(arrTeacher);
      setArrStudent(arrStudent);
    }
  }, [refresh, arrTeacher, arrStudent]);
  return (
    <>
      <BackAction />
      <div className="flex justify-center items-center">
        <div className="w-full bg-white rounded-md shadow-3xl p-8">
          <p className="text-2xl">Thông tin lớp học</p>

          <div>
            <Input
              label="Tên lớp học"
              id="Name"
              errors={errors}
              register={register}
              required
            />

            <div className="border-2 border-slate-300 rounded-md p-2 my-2">
              <p className="text-2xl">Danh sách giáo viên</p>
              {dataTeacher ? (
                dataTeacher.length > 0 ? (
                  <div className="flex items-center">
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
                          handleAddTeacherToArr(dataTeacher[e.target.value], e);
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
              <TableTemplate
                title=""
                dataSource={arrTeacher || []}
                columns={ColumnsTeacher}
                actions={[
                  {
                    icon: (
                      <span className="hover hover:text-main text-gray-500">
                        <CiCircleRemove size={24} />
                      </span>
                    ),
                    onClick: (x) => {
                      handleRemoveTeacherInArr(x.teacherID);
                    },
                  },
                ]}
              />
            </div>

            <div className="border-2 border-slate-300 rounded-md p-2 my-2">
              <p className="text-2xl">Danh sách học sinh</p>

              {dataStudent ? (
                dataStudent.length > 0 ? (
                  <div className="flex items-center">
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
                          handleAddStudentToArr(dataStudent[e.target.value], e);
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
              <TableTemplate
                title=""
                dataSource={arrStudent || []}
                columns={ColumnsStudent}
                actions={[
                  {
                    icon: (
                      <span className="hover hover:text-main text-gray-500">
                        <CiCircleRemove size={24} />
                      </span>
                    ),
                    onClick: (x) => {
                      handleRemoveStudentInArr(x.childID);
                    },
                  },
                ]}
              />
            </div>

            <textarea
              {...register("Note", { required: false })}
              className={`border-2 rounded-md p-4 text-xl w-full outline-none bg-white font-light transition border-slate-300 h-40 focus:border-orange-500`}
              placeholder="Ghi chú"
              id="Note"
            />
          </div>

          <div className="flex justify-end mt-10">
            <button
              className="text-white bg-main hover:bg-mainBlur focus:ring-4 focus:outline-none font-medium rounded-md text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              onClick={handleSubmit(onSubmit)}
            >
              Tạo lớp
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeacherPage;
