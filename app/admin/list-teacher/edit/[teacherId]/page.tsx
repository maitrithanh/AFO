"use client";
import BackAction from "@/app/components/admin/BackAction";
import Input from "@/app/components/shared/Input";
import DefaultImage from "@/app/components/shared/defaultImage";
import { callApiWithToken, fetchApiWithFetch } from "@/utils/callApi";
import { toYMD } from "@/utils/dateTime";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Asap_Condensed } from "next/font/google";

const font_asap_condensed = Asap_Condensed({
  weight: "600", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

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

  console.log(detailTeacher);

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
    Email: detailTeacher?.email,
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
      Email: "",
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
        .put(`Teacher/putTeacher?email=${data["Email"]}`, formData, {
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
      <div className="flex justify-center items-center">
        <div className="w-full py-10 bg-white rounded-md shadow-3xl p-8">
          <div
            className={`flex justify-center items-center mb-4 ${font_asap_condensed.className}`}
          >
            <h1 className="text-3xl uppercase flex items-center">
              Chỉnh sửa thông tin giáo viên
            </h1>
          </div>
          <h5 className="text-2xl uppercase">Thông tin giáo viên</h5>

          <div className="flex gap-4">
            <div className="w-full">
              <div className="flex items-center gap-4">
                <Input
                  label="Họ và tên giáo viên"
                  id="FullName"
                  type="text"
                  placeholder="Họ và tên giáo viên"
                  register={register}
                  errors={errors}
                  required
                />
                {detailTeacher?.gender ? (
                  <div id="Gender" className="w-fit">
                    <label htmlFor="Gender" className={`text-lg `}>
                      Giới tính
                      <span className={`text-rose-600`}>*</span>
                    </label>
                    <div
                      className={`flex border  p-2.5 rounded-md ${
                        errors["Gender"]
                          ? "border-rose-400"
                          : "border-slate-300"
                      }`}
                    >
                      <div className="flex items-center rounded-full ">
                        <input
                          id="Gender-male-c"
                          type="radio"
                          radioGroup="gender-children"
                          value="1"
                          defaultChecked={detailTeacher?.gender === "Nam"}
                          {...register("Gender", { required: true })}
                          className={`w-4 h-4 text-orange-600 bg-gray-100  focus:ring-orange-500 rounded-full scale-125 ${
                            errors["Gender"]
                              ? "border-rose-400"
                              : "border-slate-300"
                          }
                          ${
                            errors["Gender"]
                              ? "focus:border-rose-400"
                              : "focus:border-[#F8853E]"
                          }`}
                        />
                        <label
                          htmlFor="Gender-male-c"
                          className="w-full ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          Nam
                        </label>
                      </div>
                      <div
                        className={`flex items-center ps-4 rounded-full dark:border-gray-700`}
                      >
                        <input
                          id="Gender-female-c"
                          type="radio"
                          radioGroup="gender-children"
                          value="0"
                          defaultChecked={detailTeacher?.gender === "Nữ"}
                          {...register("Gender", { required: true })}
                          className={`w-4 h-4 text-orange-600 bg-gray-100  focus:ring-orange-500 rounded-full scale-125 `}
                        />
                        <label
                          htmlFor="Gender-female-c"
                          className="w-full ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          Nữ
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  "Đang tải..."
                )}

                <Input
                  label="Ngày sinh"
                  id="BirthDay"
                  type="date"
                  placeholder="Ngày sinh"
                  register={register}
                  errors={errors}
                  required
                />
              </div>
              <div className="my-2 w-full ">
                <div className="flex gap-4">
                  <Input
                    label="Số căn cước công dân"
                    id="IDNumber"
                    type="text"
                    placeholder="12 số căn cước công dân"
                    register={register}
                    errors={errors}
                    required
                  />
                  <div className="w-full my-2">
                    <label htmlFor="Education" className="text-lg">
                      Trình độ
                      <span className={`text-rose-600`}>*</span>
                    </label>
                    <select
                      id="Education"
                      {...register(`Education`, { required: true })}
                      className={`border p-2.5 block rounded-md w-full focus-visible:border-main focus-visible:outline-none ${
                        errors["Education"]
                          ? "border-rose-400"
                          : "border-slate-300"
                      }`}
                    >
                      <option value="Tiến Sĩ">Tiến Sĩ</option>
                      <option value="Thạc Sĩ">Thạc Sĩ</option>
                      <option value="Đại Học" defaultChecked>
                        Đại Học
                      </option>
                      <option value="Cao Đẳng">Cao Đẳng</option>
                      <option value="Trung Cấp">Trung Cấp</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Input
                  label="Số điện thoại"
                  id="PhoneNumber"
                  type="text"
                  placeholder="Số điện thoại"
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  label="Email"
                  id="Email"
                  type="text"
                  placeholder="Địa chỉ email"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              <div className="my-4">
                <Input
                  label="Địa chỉ"
                  id="Address"
                  type="text"
                  placeholder="Số nhà, đường/phố, quận/huyện, tỉnh/thành phố"
                  register={register}
                  errors={errors}
                  required
                />
              </div>
              <div className="my-4">
                {/* Ghi chú */}
                <label htmlFor="Note" className="text-lg">
                  Ghi chú
                </label>
                <input
                  type="text"
                  id="Note"
                  {...register(`Note`, { required: false })}
                  className="border p-3 block rounded-sm w-full focus-visible:border-main focus-visible:outline-none"
                  placeholder="Ghi chú"
                />
              </div>
            </div>

            <div className="w-1/3">
              <label htmlFor="" className="text-lg">
                Hình 3x4 <span className={`text-rose-600`}>*</span>
              </label>
              <div className="rounded-md shadow-3xl mr-5 border">
                <div className="flex gap-4 p-4 justify-center items-center">
                  <div className="relative border rounded-sm w-[105px] h-[135px]">
                    <Image
                      src={"/image3x4-template.webp"}
                      alt="Hình 3x4"
                      width={105}
                      height={135}
                      className="rounded-sm w-[105px] h-[135px]"
                    />
                    <span className="absolute bottom-0 w-full flex justify-center">
                      Ảnh mẫu
                    </span>
                  </div>
                  <div className="border rounded-sm">
                    <label htmlFor="File" title="Hình ảnh">
                      {currAvatar ? (
                        <span className="cursor-pointer relative">
                          <Image
                            src={URL.createObjectURL(currAvatar)}
                            alt="Hình 3x4"
                            width={105}
                            height={135}
                            className="w-[105px] h-[135px] rounded-sm"
                          />
                          <span className="absolute bottom-0 text-white w-full flex justify-center bg-main">
                            Đổi ảnh
                          </span>
                        </span>
                      ) : (
                        <span className="cursor-pointer relative">
                          <Image
                            src={"/user-default.webp"}
                            alt="Hình 3x4"
                            width={105}
                            height={135}
                            className="min-w-[105px] min-h-[135px] rounded-sm"
                          />
                          <span className="absolute bottom-0 text-white w-full flex justify-center bg-main">
                            Tải lên
                          </span>
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                <input
                  id={"File"}
                  type={"file"}
                  className="hidden"
                  onChange={(e) => setCurrAvatar(e.target.files![0])}
                />
              </div>

              <div className="p-2 mt-8">
                <p>Lưu ý:</p>
                <div className="text-rose-600 italic">
                  <p>
                    Số điện thoại phải đủ 10 số.<sup>*</sup>
                  </p>
                  <p>
                    CCCD (Căn cước công dân) phải đủ 12 số. <sup>*</sup>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              className="text-white bg-main hover:bg-mainBlur focus:outline-none font-medium rounded-md text-lg w-full sm:w-auto px-5 py-2.5 text-center "
              onClick={handleSubmit(onSubmit)}
            >
              Lưu hồ sơ
            </button>
          </div>
          {/* *** */}
        </div>
      </div>
    </>
  );
};

export default EditTeacherPage;
