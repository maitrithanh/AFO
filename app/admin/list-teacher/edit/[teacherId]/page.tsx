"use client";
import BackAction from "@/app/components/admin/BackAction";
import DefaultImage from "@/app/components/shared/defaultImage";
import { callApiWithToken, fetchApiWithFetch } from "@/utils/callApi";
import { toYMD } from "@/utils/dateTime";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditTeacherPage = (params: any) => {
  const [currAvatar, setCurrAvatar] = useState<File | null>(null);
  const [teacherClassID, setTeacherClassID] = useState("");

  const router = useRouter();
  const token = getCookie("token");

  const date = new Date();
  const year = date.getFullYear();

  //fetch data
  const { data: dataTeacher } = useFetch("Teacher/getList");

  const { data: dataClass } = useFetch(`ClassRoom/List/${year}`);

  const detailTeacher = dataTeacher?.find(
    (info: any) => info.id == params.params.teacherId
  );

  useEffect(() => {
    if (detailTeacher) {
      setTeacherClassID(
        detailTeacher?.classId == null ? "" : `${detailTeacher?.classId}`
      );
    }
  }, [detailTeacher]);

  const values = {
    FullName: detailTeacher?.fullName,
    teacherID: params.params.teacherId,
    PhoneNumber: detailTeacher?.phoneNumber,
    Gender: detailTeacher?.gender,
    Address: detailTeacher?.address,
    BirthDay: toYMD(detailTeacher?.birthDay),
    IDNumber: detailTeacher?.idNumber,
    Education: detailTeacher?.education,
    Note: detailTeacher?.note,
    ClassId:
      detailTeacher?.classId != null
        ? `${detailTeacher?.classId + "-" + detailTeacher?.className}`
        : "",
    File: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      FullName: "",
      PhoneNumber: "",
      Gender: "",
      Address: "",
      BirthDay: "",
      IDNumber: "",
      Education: "",
      Note: "",
      ClassId: "",
      teacherID: "",
    },
    values,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //có chỉnh sửa classId
    // if (teacherClassID != data["ClassId"].split("-")[0].trim()) {
    //   console.log("Có chỉnh sửa");
    //   //hiện tại teacher đã có lớp
    //   if (teacherClassID != "") {
    //     console.log("Khác Nulll", teacherClassID != null);
    //     const formData = new FormData();
    //     formData.append("classID", teacherClassID);
    //     formData.append("teacherID", params.params.teacherId);

    //     //nếu classid mới là null thì xoá lớp
    //     if (data["ClassId"].length == 0) {
    //       console.log("Class id mới là null");
    //       fetch("http://localhost:5088/api/ClassRoom/removeTeacherOutClass", {
    //         method: "DELETE",
    //         body: formData,
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }).then((response) => response.json());
    //     } else {
    //       //ngược lại nếu classid là mới thì xoá cái cũ cập nhật cái mới
    //       console.log("Classid mới");
    //       fetch("http://localhost:5088/api/ClassRoom/removeTeacherOutClass", {
    //         method: "DELETE",
    //         body: formData,
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }).then((response) =>
    //         callApiWithToken().post(
    //           `Teacher/addTeacherToClass?teacherID=${
    //             params.params.teacherId
    //           }&classId=${data["ClassId"].split("-")[0].trim()}`
    //         )
    //       );
    //     }
    //   } else {
    //     callApiWithToken().post(
    //       `Teacher/addTeacherToClass?teacherID=${
    //         params.params.teacherId
    //       }&classId=${data["ClassId"].split("-")[0].trim()}`
    //     );
    //   }
    // }

    if (!(data.PhoneNumber.length == 10)) {
      toast.error("Số điện thoại phải đủ 10 số");
    } else if (!(data.IDNumber.length == 12)) {
      toast.error("Căn cước công dân phải đủ 12 số");
    } else {
      const formData = new FormData();
      for (let key in data) {
        if (key == "teacherID") {
          formData.append(key, params.params.teacherId);
        } else {
          formData.append(key, data[key]);
        }
      }

      if (currAvatar) {
        formData.append("File", currAvatar);
      }

      callApiWithToken()
        .put(`Teacher/putTeacher`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success("Hồ sơ đã được lưu");
          router.push("/admin/list-teacher");
        })
        .catch((errors) => {
          toast.error("Có lỗi xảy ra!");
        });
    }
  };
  return (
    <>
      <BackAction />
      <div className="flex justify-center items-center ">
        <div className="w-full bg-white rounded-md shadow-3xl p-8">
          <p className="text-2xl">Thông tin giáo viên</p>
          <div className="flex items-center">
            <div className="rounded-md shadow-3xl mr-5">
              <label htmlFor="File" title="Hình ảnh">
                {currAvatar ? (
                  <img
                    src={URL.createObjectURL(currAvatar)}
                    alt="Current Avatar"
                    className="w-[120px] h-[150px] rounded-md cursor-pointer"
                  />
                ) : detailTeacher ? (
                  <DefaultImage
                    img={getImageUrl(detailTeacher?.avatar)}
                    fallback="/upload-image.jpg"
                    custom="w-[120px] h-[150px] cursor-pointer rounded-md"
                  />
                ) : null}
              </label>
              <input
                id={"File"}
                type={"file"}
                className="hidden"
                onChange={(e) => setCurrAvatar(e.target.files![0])}
              />
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex items-baseline">
                <div className="relative z-0 flex-1 mb-5 group">
                  <input
                    type="text"
                    id="FullName"
                    {...register("FullName", { required: true })}
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="FullName"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Họ và tên
                  </label>
                </div>

                {detailTeacher?.gender ? (
                  <div className="grid md:grid-cols-2 md:gap-3 mx-5 border-gray-200 border rounded-md">
                    <div className="flex items-center ps-4 rounded dark:border-gray-700">
                      <input
                        id="Gender-male-c"
                        type="radio"
                        radioGroup="gender-children"
                        value="1"
                        defaultChecked={detailTeacher?.gender === "Nam"}
                        {...register("Gender", { required: true })}
                        className="w-4 h-4 text-orange-600 bg-gray-100  focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="Gender-male-c"
                        className="w-full py-4 ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                      >
                        Nam
                      </label>
                    </div>
                    <div className="flex items-center ps-4  rounded dark:border-gray-700">
                      <input
                        id="Gender-female-c"
                        type="radio"
                        radioGroup="gender-children"
                        value="0"
                        defaultChecked={detailTeacher?.gender === "Nữ"}
                        {...register("Gender", { required: true })}
                        className="w-4 h-4 text-orange-600 bg-gray-100 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="Gender-female-c"
                        className="w-full py-4 ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                      >
                        Nữ
                      </label>
                    </div>
                  </div>
                ) : (
                  "Đang tải..."
                )}

                <div className="relative z-0 mb-5 group w-[150px]">
                  <input
                    type="text"
                    id="IDNumber"
                    {...register("IDNumber", { required: true })}
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="IDNumber"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    CCCD
                  </label>
                </div>
              </div>
              {/* Số điện thoại */}
              <div className="flex">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    id="PhoneNumber"
                    {...register(`PhoneNumber`, { required: true })}
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="PhoneNumber"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Số điện thoại
                  </label>
                </div>
                {/* Trình độ */}
                <div className="relative z-0 w-full mb-5 ml-5 group">
                  <select
                    id="Education"
                    {...register(`Education`, { required: true })}
                    className="block py-2.5 px-0 w-full  text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  >
                    <option
                      value="Tiến Sĩ"
                      selected={detailTeacher?.education?.trim() === "Tiến Sĩ"}
                    >
                      Tiến Sĩ
                    </option>
                    <option
                      value="Thạc Sĩ"
                      selected={detailTeacher?.education?.trim() === "Thạc Sĩ"}
                    >
                      Thạc Sĩ
                    </option>
                    <option
                      value="Đại Học"
                      selected={detailTeacher?.education?.trim() == "Đại Học"}
                    >
                      Đại Học
                    </option>
                    <option
                      value="Cao Đẳng"
                      selected={detailTeacher?.education?.trim() === "Cao Đẳng"}
                    >
                      Cao Đẳng
                    </option>
                    <option
                      value="Trung Cấp"
                      selected={
                        detailTeacher?.education?.trim() === "Trung Cấp"
                      }
                    >
                      Trung Cấp
                    </option>
                  </select>

                  <label
                    htmlFor="Education"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Trình độ
                  </label>
                </div>
                {/* Ngày sinh */}
                <div className="relative z-0 group ml-5">
                  <input
                    type="date"
                    id="BirthDay"
                    {...register(`BirthDay`, { required: true })}
                    className="block py-2.5 px-0 w-[150px] text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="BirthDay"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Ngày sinh
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Địa chỉ */}
          <div className=" flex gap-4 mt-6">
            <div className="relative w-full z-0 mb-5 group ">
              <input
                type="text"
                id="Address"
                {...register(`Address`, { required: true })}
                className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="Address"
                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Địa chỉ
              </label>
            </div>

            {/* <div className="relative">
              <input
                type="text"
                id="ClassId"
                list={"classIdList"}
                {...register(`ClassId`, { required: false })}
                className="relative block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="ClassId"
                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Lớp chủ nhiệm
              </label>
              <datalist id="classIdList">
                {dataClass?.map((classItem: any) => {
                  return (
                    <option
                      key={classItem.id}
                      value={classItem.id + "-" + classItem.name}
                    ></option>
                  );
                })}
              </datalist>
            </div> */}
          </div>

          {/* Ghi chú */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="Note"
              {...register(`Note`, { required: false })}
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="Note"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ghi chú
            </label>
          </div>
          <div className="flex justify-end mt-10">
            <button
              className="text-white bg-main hover:bg-mainBlur focus:ring-4 focus:outline-none font-medium rounded-md text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              onClick={handleSubmit(onSubmit)}
            >
              Lưu hồ sơ
            </button>
          </div>
        </div>
      </div>
      <div className="p-2 mt-8">
        <p>Lưu ý:</p>
        <div className="text-rose-600 italic ml-2">
          <p>
            Số điện thoại phải đủ 10 số.<sup>*</sup>
          </p>
          <p>
            CCCD (Căn cước công dân) phải đủ 12 số. <sup>*</sup>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default EditTeacherPage;
