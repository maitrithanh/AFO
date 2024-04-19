"use client";
import BackAction from "@/app/components/admin/BackAction";
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
import Input from "@/app/components/shared/Input";
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
import { Asap_Condensed } from "next/font/google";
import { IoIosAddCircle } from "react-icons/io";

const font_asap_condensed = Asap_Condensed({
  weight: "600", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

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

  const [arrTeacher, setArrTeacher] = useState<any>([] as object[]);
  const [arrStudent, setArrStudent] = useState<any>([] as object[]);
  const [onSelect, setOnSelect] = useState(false);
  const [inputTeacherValue, setInputTeacherValue] = useState("");
  const [inputStudentValue, setInputStudentValue] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [openAddChildDialog, setOpenAddChildDialog] = useState(false);
  const [openAddTeacherDialog, setOpenAddTeacherDialog] = useState(false);
  const [listStudent, setListStudent] = useState<any>([] as object[]);
  const [listTeacher, setListTeacher] = useState<any>([] as object[]);

  const { data: dataTeacher } = useFetch("ClassRoom/teacherFilter");
  const { data: dataStudent } = useFetch("ClassRoom/studentFilter");

  useEffect(() => {
    setListStudent(dataStudent);
  }, [dataStudent]);

  useEffect(() => {
    setListTeacher(dataTeacher);
  }, [dataTeacher]);

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
  const handleAddTeacherToArr = (teacherInfo: any) => {
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
      arrTeacher.push(teacherInfo);
      toast.success("Đã thêm giáo viên");
      handleRemoveTeacherAlert(teacherInfo.teacherID);
    }
  };
  //Xử lý thêm giáo viên vào alert
  const handleAddTeacherAlert = (teacherInfo: any) => {
    listTeacher.push(teacherInfo);
  };

  //Xử lý thêm học sinh vào mảng
  const handleAddStudentToArr = (studentInfo: any, id: any) => {
    if (arrStudent.length >= 1) {
      if (
        arrStudent?.filter((x: any) => x.childID == studentInfo.childID)
          .length > 0
      ) {
        toast.error(`${studentInfo.fullName} đã được thêm vào lớp`);
        return;
      }
    }
    handleRemoveStudentAlert(id);
    setInputStudentValue(id || "");
    arrStudent.push(studentInfo);
    toast.success("Đã thêm");
  };
  //Xử lý thêm học sinh vào alert
  const handleAddStudentAlert = (studentInfo: any) => {
    listStudent.push(studentInfo);
  };

  //Refresh
  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  // Xử lý gỡ giáo viên đã chọn
  const handleRemoveTeacherInArr = (teacherID: any, infoTeacher: any) => {
    var index = arrTeacher
      .map((x: any) => {
        return x.teacherID;
      })
      .indexOf(teacherID);

    if (index > -1) {
      arrTeacher.splice(index, 1);
      handleAddTeacherAlert(infoTeacher);
      handleRefresh();
    }
  };
  const handleRemoveTeacherAlert = (teacherID: any) => {
    var index = listTeacher
      .map((x: any) => {
        return x.teacherID;
      })
      .indexOf(teacherID);

    if (index > -1) {
      listTeacher.splice(index, 1);
      handleRefresh();
    }
  };
  // Xử lý gỡ học sinh đã chọn
  const handleRemoveStudentInArr = (childID: any, infoStudent: any) => {
    var index = arrStudent
      .map((x: any) => {
        return x.childID;
      })
      .indexOf(childID);
    if (index > -1) {
      arrStudent.splice(index, 1);
      handleAddStudentAlert(infoStudent);
      handleRefresh();
    }
  };

  // Xử lý gỡ học sinh đã chọn trong alert
  const handleRemoveStudentAlert = (childID: any) => {
    var index = listStudent
      .map((x: any) => {
        return x.childID;
      })
      .indexOf(childID);
    if (index > -1) {
      listStudent.splice(index, 1);
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
      {/* TEACHERRRRRRRRRRRRRRRRRRRRRRRRRR */}
      <AlertDialog
        onOpenChange={() => {
          setOpenAddTeacherDialog((curr) => !curr);
        }}
        open={openAddTeacherDialog}
      >
        <AlertDialogContent className="max-w-[800px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Thêm giáo viên phụ trách</AlertDialogTitle>
            <div>
              <TableTemplate
                title=""
                dataSource={listTeacher || []}
                columns={ColumnsTeacher}
                actions={[
                  {
                    icon: (
                      <span className="hover hover:text-main text-gray-500">
                        <IoIosAddCircle size={24} />
                      </span>
                    ),
                    onClick: (x) => {
                      handleAddTeacherToArr(x);
                    },
                  },
                ]}
              />
              {dataTeacher?.length <= 0 ? (
                <p className="flex w-full justify-center items-center">
                  <span className="text-yellow-500 mx-1">
                    <IoWarning size={20} />
                  </span>
                  Hiện không có giáo viên nào trống lớp!
                </p>
              ) : null}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Đóng</AlertDialogCancel>
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
                dataSource={listStudent || []}
                columns={ColumnsStudent}
                actions={[
                  {
                    icon: (
                      <span className="hover hover:text-main text-gray-500">
                        <IoIosAddCircle size={24} />
                      </span>
                    ),
                    onClick: (x) => {
                      handleAddStudentToArr(x, x.childID);
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
      <BackAction />

      <div className="flex justify-center items-center">
        <div className="w-full bg-white rounded-md shadow-3xl p-8">
          <div
            className={`flex justify-center items-center mb-4 ${font_asap_condensed.className}`}
          >
            <h1 className="text-3xl uppercase flex items-center">
              Thêm lớp học
            </h1>
          </div>
          <p className="text-2xl">Thông tin lớp học</p>

          <div>
            <Input
              label="Tên lớp học"
              id="Name"
              type="text"
              placeholder="Tên lớp học"
              register={register}
              errors={errors}
              required
            />

            <div className="rounded-md my-4">
              <div className="flex justify-between items-center">
                <p className="text-lg">
                  Giáo viên phụ trách
                  <span className={`text-rose-600 `}>*</span> (2 giáo viên)
                </p>
                <button
                  className="mx-2 bg-main px-2 py-1 w-32 rounded-sm text-white"
                  onClick={() => setOpenAddTeacherDialog(true)}
                >
                  Thêm giáo viên
                </button>
              </div>

              <table className="w-full text-md text-left rtl:text-right bg-white my-2 text-gray-500 dark:text-gray-400 max-h-[600px]">
                <thead className="text-md text-white uppercase bg-main text-md font-normal dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Mã giáo viên</th>
                    <th className="px-6 py-3">Hình</th>
                    <th className="px-6 py-3">Tên</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {arrTeacher?.map((x: any, i: any) => (
                    <tr
                      key={x.teacherID}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td className="pl-6 py-4">{i + 1}</td>
                      <td className="pl-6 py-4">{x.teacherID}</td>
                      <td className="pl-6 py-4">
                        <DefaultImage
                          img={getImageUrl(x.avatar)}
                          fallback="/avatar.webp"
                        />
                      </td>{" "}
                      <td className="pl-6 py-4">{x.fullName}</td>
                      <td>
                        <span
                          onClick={() =>
                            handleRemoveTeacherInArr(x.teacherID, x)
                          }
                          className="hover:cursor-pointer hover:text-main text-gray-500"
                        >
                          <CiCircleRemove size={24} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <span className="w-full justify-center items-center flex">
                {arrTeacher?.length == 0 ? "Chưa có giáo viên nào" : null}
              </span>

              {/* <TableTemplate
                title=""
                dataSource={arrTeacher || []}
                columns={ColumnsTeacher}
                // addButton={{ link: "/admin/children/add" }}
                hidePaging={arrTeacher.length < 10}
                actions={[
                  {
                    icon: (
                      <span className="hover hover:text-main text-gray-500">
                        <CiCircleRemove size={24} />
                      </span>
                    ),
                    onClick: (x) => {
                      handleRemoveTeacherInArr(x.teacherID, x);
                    },
                  },
                ]}
              /> */}
            </div>

            <div className="rounded-md my-4">
              <div className="flex justify-between items-center">
                <p className="text-lg">
                  Danh sách trẻ
                  <span className={`text-rose-600 mr-2`}>*</span>
                  (Sĩ số: {arrStudent.length})
                </p>
                <button
                  className="mx-2 bg-main px-2 py-1 w-32 rounded-sm text-white"
                  onClick={() => setOpenAddChildDialog(true)}
                >
                  Thêm trẻ
                </button>
              </div>

              <table className="w-full text-md text-left rtl:text-right bg-white my-2 text-gray-500 dark:text-gray-400 max-h-[600px]">
                <thead className="text-md text-white uppercase bg-main text-md font-normal dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Mã trẻ</th>
                    <th className="px-6 py-3">Hình</th>
                    <th className="px-6 py-3">Tên</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {arrStudent?.map((x: any, i: any) => (
                    <tr
                      key={x.childID}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td className="pl-6 py-4">{i + 1}</td>
                      <td className="pl-6 py-4">{x.childID}</td>
                      <td className="pl-6 py-4">
                        <DefaultImage
                          img={getImageUrl(x.avatar)}
                          fallback="/avatar.webp"
                        />
                      </td>{" "}
                      <td className="pl-6 py-4">{x.fullName}</td>
                      <td>
                        <span
                          onClick={() => handleRemoveStudentInArr(x.childID, x)}
                          className="hover:cursor-pointer hover:text-main text-gray-500"
                        >
                          <CiCircleRemove size={24} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <span className="w-full justify-center items-center flex">
                {arrStudent?.length == 0 ? "Chưa có học sinh nào" : null}
              </span>

              {/* <TableTemplate
                title={``}
                dataSource={arrStudent || []}
                columns={ColumnsStudent}
                hidePaging={arrStudent.length < 10}
                // addButton={{ onClick: () => setOpenAddChildDialog(true) }}
                actions={[
                  {
                    icon: (
                      <span className="hover hover:text-main text-gray-500">
                        <CiCircleRemove size={24} />
                      </span>
                    ),
                    onClick: (x) => {
                      handleRemoveStudentInArr(x.childID, x);
                    },
                  },
                ]}
              /> */}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-lg">Ghi chú</p>
            </div>

            <textarea
              {...register("Note", { required: false })}
              className={`border rounded-md p-4 text-xl w-full outline-none bg-white font-light transition border-slate-300 h-40 focus:border-orange-500`}
              placeholder="Ghi chú"
              id="Note"
            />
          </div>

          <div className=" w-full flex justify-end mt-10">
            <button
              className="text-white bg-main hover:bg-mainBlur focus:ring-4 focus:outline-none font-medium rounded-md text-lg w-full px-5 py-2.5 text-center "
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
