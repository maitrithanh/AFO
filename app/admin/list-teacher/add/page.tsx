"use client";
import BackAction from "@/app/components/admin/BackAction";
import { callApiWithToken } from "@/utils/callApi";
import useFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddTeacherPage = () => {
  const [currAvatar, setCurrAvatar] = useState<File | null>(null);
  const router = useRouter();

  const date = new Date();
  const year = date.getFullYear();
  const { data: dataClass } = useFetch(`ClassRoom/List/${year}`);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
      classId: "",
      File: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!(data.PhoneNumber.length == 10)) {
      toast.error("Số điện thoại phải đủ 10 số");
    } else if (!(data.IDNumber.length == 12)) {
      toast.error("Căn cước công dân phải đủ 12 số");
    } else {
      const formData = new FormData();
      for (let key in data) {
        if (key == "classId") {
          formData.append(key, data[key].split("-")[0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      if (currAvatar) {
        formData.append("File", currAvatar);
      }

      callApiWithToken()
        .post(`Teacher/addTeacher`, formData, {
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
      <div className="flex justify-center items-center mt-10">
        <div className="w-2/3 bg-white rounded-md shadow-3xl p-8">
          <BackAction />
          <p className="text-2xl">Thông tin giáo viên</p>
          <div className="flex items-center">
            <div className="rounded-md shadow-3xl mr-5">
              <label htmlFor="File" title="Hình ảnh">
                {currAvatar ? (
                  <img
                    src={URL.createObjectURL(currAvatar)}
                    alt="Current Avatar"
                    className="w-[100px] h-[130px] rounded-md cursor-pointer"
                  />
                ) : (
                  <img
                    src="/upload-image.jpg"
                    alt=""
                    className="w-[100px] h-[130px] cursor-pointer rounded-md"
                  />
                )}
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

                <div className="grid md:grid-cols-2 md:gap-3 mx-5 border-gray-200 border">
                  <div className="flex items-center ps-4 rounded dark:border-gray-700">
                    <input
                      id="Gender-male-c"
                      type="radio"
                      radioGroup="gender-children"
                      value="1"
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
                    <option value="Tiến Sĩ">Tiến Sĩ</option>
                    <option value="Thạc Sĩ">Thạc Sĩ</option>
                    <option value="Đại Học">Đại Học</option>
                    <option value="Cao Đẳng">Cao Đẳng</option>
                    <option value="Trung Cấp">Trung Cấp</option>
                  </select>
                  <label
                    htmlFor="Education"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Trình độ
                  </label>
                </div>
                {/* Ngày sinh */}
                <div className="relative z-0 mb-5 group ml-5">
                  <input
                    type="date"
                    id="BirthDay"
                    {...register(`BirthDay`, { required: true })}
                    className="block py-2.5 px-0 w-[150px] text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer h-[41.6px]"
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
          <div className=" flex gap-4">
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

            <div className="relative">
              <input
                type="text"
                id="classId"
                list={"classIdList"}
                {...register(`classId`, { required: false })}
                className="relative block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="classId"
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
            </div>
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
          <div className="flex justify-end">
            <button
              className="text-white bg-main hover:bg-mainBlur focus:ring-4 focus:outline-none font-medium rounded-md text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              onClick={handleSubmit(onSubmit)}
            >
              Lưu hồ sơ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeacherPage;
