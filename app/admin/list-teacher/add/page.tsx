"use client";
import BackAction from "@/app/components/admin/BackAction";
import { callApiWithToken } from "@/utils/callApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddTeacherPage = () => {
  const [currAvatar, setCurrAvatar] = useState<File | null>(null);
  const router = useRouter();

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
      File: "",
    },
  });

  console.log(errors);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    if (currAvatar) {
      formData.append("File", currAvatar);
    }

    callApiWithToken()
      .post(
        `Teacher/addTeacher?FullName=${data.FullName}&PhoneNumber=${data.PhoneNumber}&Gender=${data.Gender}&Address=${data.Address}&BirthDay=${data.BirthDay}&IDNumber=${data.IDNumber}&Education=${data.Education}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        toast.success("Hồ sơ đã được lưu");
        router.push("/admin/list-teacher");
      })
      .catch((errors) => {
        toast.error("Có lỗi xảy ra!");
      });
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
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="FullName"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                      className="w-4 h-4 text-blue-600 bg-gray-100  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                      className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="IDNumber"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="PhoneNumber"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Số điện thoại
                  </label>
                </div>
                {/* Trình độ */}
                <div className="relative z-0 w-full mb-5 ml-5 group">
                  <select
                    id="Education"
                    {...register(`Education`, { required: true })}
                    className="block py-2.5 px-0 w-full  text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option value="Tiến sĩ">Tiến sĩ</option>
                    <option value="Thạc sĩ">Thạc sĩ</option>
                    <option value="Đại học">Đại học</option>
                    <option value="Cao đẳng">Cao đẳng</option>
                    <option value="Trung cấp">Trung cấp</option>
                  </select>

                  {/* <input
                    type="text"
                    name="Education"
                    id="Education"
                    {...(register(`Education`), { required: true })}
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  /> */}
                  <label
                    htmlFor="Education"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    className="block py-2.5 px-0 w-[150px] text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer h-[41.6px]"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="BirthDay"
                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Ngày sinh
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Địa chỉ */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="Address"
              {...register(`Address`, { required: true })}
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Address"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Địa chỉ
            </label>
          </div>

          {/* Ghi chú */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="Note"
              {...register(`Note`, { required: false })}
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="Note"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ghi chú
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className="text-white bg-main hover:bg-mainBlur focus:ring-4 focus:outline-none font-medium rounded-md text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
