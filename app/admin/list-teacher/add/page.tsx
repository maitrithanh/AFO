"use client";
import BackAction from "@/app/components/admin/BackAction";
import { callApiWithToken } from "@/utils/callApi";
import useFetch from "@/utils/useFetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "@/app/components/shared/Input";
import { Asap_Condensed } from "next/font/google";
import SelectAddress from "@/app/components/shared/selectAddress";
import Swal from "sweetalert2";

const font_asap_condensed = Asap_Condensed({
  weight: "600", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

const AddTeacherPage = () => {
  const [currAvatar, setCurrAvatar] = useState<File | null>(null);
  const router = useRouter();

  const date = new Date();
  const year = date.getFullYear();
  const { data: dataClass } = useFetch(`ClassRoom/List/${year}`);
  const [address, setAddress] = useState<string>("");

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
      Email: "",
      Note: "",
      File: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!(data.PhoneNumber.length == 10)) {
      toast.error("Số điện thoại phải đủ 10 số");
      return;
    } else if (!(data.IDNumber.length == 12)) {
      toast.error("Căn cước công dân phải đủ 12 số");
      return;
    }
    if (data.Gender == null) {
      toast.error("Giới tính không được bỏ trống");
      return;
    }

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    formData.set("Address", address ?? "");

    if (currAvatar) {
      formData.append("File", currAvatar);
    }
    callApiWithToken()
      .post(`Teacher/addTeacher?email=${data["Email"]}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Hồ sơ đã được lưu",
          icon: "success",
          confirmButtonText: "Đóng",
          confirmButtonColor: "#F8853E",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/admin/list-teacher");
      })
      .catch((errors) => {
        Swal.fire({
          title: "Có lỗi xảy ra!",
          text: errors,
          icon: "error",
          confirmButtonText: "Đóng",
          confirmButtonColor: "#F8853E",
        });
      });
  };

  const changeAddress = (addr: string) => {
    setAddress(addr);
  };

  const decodeAddress = (encoded: string): string => {
    return encoded
      .split("&")
      .filter((x) => x.length)
      .join(", ");
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
              Thêm giáo viên
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

                <div id="Gender" className="w-fit">
                  <label htmlFor="Gender" className={`text-lg `}>
                    Giới tính
                    <span className={`text-rose-600`}>*</span>
                  </label>
                  <div
                    className={`flex border  p-2.5 rounded-md ${
                      errors["Gender"] ? "border-rose-400" : "border-slate-300"
                    }`}
                  >
                    <div className="flex items-center rounded-full ">
                      <input
                        id="Gender-male-c"
                        type="radio"
                        radioGroup="gender-children"
                        value="1"
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

              {/* <div className="my-4">
                <Input
                  label="Địa chỉ"
                  id="Address"
                  type="text"
                  placeholder="Số nhà, đường/phố, quận/huyện, tỉnh/thành phố"
                  register={register}
                  errors={errors}
                  required
                />
              </div> */}
              <div className="my-4">
                <label htmlFor="birthDay" className="text-lg">
                  Địa chỉ
                  <span className={`text-rose-600 `}>*</span>
                </label>
                <SelectAddress setAddress={changeAddress} address={address} />
                <p>{decodeAddress(address ?? "")}</p>
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
                  title="Avatar"
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

export default AddTeacherPage;
