"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/shared/Input";
import { addEnroll } from "@/utils/handleAPI";
import Swal from "sweetalert2";
import Link from "next/link";

const EnrollPage = () => {
  const { t } = useTranslation();
  const [level, setLevel] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [submit, setSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FieldValues>({
    defaultValues: {
      fullNameParent: "",
      fullNameChild: "",
      phoneNumber: "",
      level: "",
      email: "",
    },
  });

  //reset form sau khi submit
  useEffect(() => {
    if (submit) {
      reset({
        fullNameParent: "",
        fullNameChild: "",
        phoneNumber: "",
        level: "",
        email: "",
      });
      setLevel("");
    }
  }, [reset, submit]);

  //xử lý dữ liệu  xuống backend
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setError([]);
    if (data.phoneNumber.length < 10 || data.phoneNumber.length > 10) {
      error.push("Số điện thoại phải đủ 10 số");
    }
    if (!data.email.includes("@")) {
      error.push("Email sai định dạng");
    }

    const contentError = error.map((error, i) => error).join("<br>");

    if (error.length > 0) {
      Swal.fire({
        title: "Đăng ký không thành công",
        icon: "error",
        html: contentError,
        text: "",
        confirmButtonText: "Đóng",
        confirmButtonColor: "#F8853E",
        // showConfirmButton: false,
        // timer: 1500,
      });
      return;
    } else {
      setSubmit(true);
    }
    //chèn thêm field level vào object data
    const formData = { ...data, level };
    addEnroll(formData);
    Swal.fire({
      title: "Đăng ký thành công",
      icon: "success",
      text: "Cảm ơn quý phụ huynh đã đăng ký tuyển sinh, nhà trường sẽ liên hệ với quý phụ huynh trong vòng 7 ngày làm việc.",
      confirmButtonText: "Xác nhận",
      confirmButtonColor: "#F8853E",
      // showConfirmButton: false,
      // timer: 1500,
    });
  };

  return (
    <div className="relative min-h-screen grid xl:grid-cols-2 grid-cols-1 bg-[url(/banner-homepage.webp)] bg-no-repeat bg-cover">
      <div className=" lg:bottom-32 right-2 bottom-14 flex justify-center items-center ">
        <Image
          src={"/enroll.webp"}
          alt="banner"
          width={800}
          height={640}
          priority
          className="transition-all duration-5000"
        />
      </div>
      <div className="md:mx-24 mx-8 mb-16 mt-20">
        <div className="h-full flex md:items-center items-start mt-20 xl:mt-0">
          <div className="w-full bg-white p-6 rounded-xl">
            <h2 className="text-3xl font-bold text-main w-full flex justify-center pb-8">
              ĐĂNG KÝ TUYỂN SINH
            </h2>
            <Input
              required
              id="fullNameParent"
              register={register}
              errors={errors}
              label="Họ tên Phụ Huynh"
            />
            <Input
              required
              id="fullNameChild"
              register={register}
              errors={errors}
              label="Họ tên trẻ"
            />
            <Input
              required
              id="phoneNumber"
              register={register}
              errors={errors}
              label="Số điện thoại"
            />
            <Input
              required
              id="email"
              register={register}
              errors={errors}
              label="Email"
            />
            <div>
              <p className="text-lg">
                Khối muốn đăng ký <span className={`text-rose-600 `}>*</span>
              </p>
              <div className="flex justify-center items-center gap-4 cursor-pointer">
                <div
                  onClick={() => {
                    setLevel("Mầm");
                  }}
                  className={`w-full flex items-center justify-center p-2 border-2 rounded-xl group ${
                    level === "Mầm" ? "border-main border-2" : "border-2"
                  }`}
                >
                  <div>
                    <img
                      className="group-hover:scale-105 transition-all duration-300"
                      src="https://vnmediadev.monkeyuni.net/upload/web/storage_web/29-05-2023_10:33:59_logo-monkey_abc.png"
                      alt=""
                    />
                    <p className="text-[#8bbd27] text-lg font-bold mt-4">
                      Khối Mầm
                    </p>
                    <p className="text-[#ee202e] font-bold">
                      Dành cho bé 1-2 tuổi
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setLevel("Chồi");
                  }}
                  className={`w-full flex items-center justify-center p-2 border-2 rounded-xl group ${
                    level === "Chồi" ? "border-main" : "border-2"
                  }`}
                >
                  <div>
                    <img
                      className="group-hover:scale-105 transition-all duration-300"
                      src="https://vnmediadev.monkeyuni.net/upload/web/storage_web/25-08-2023_11:09:29_Asset%204@3x-8.png"
                      alt=""
                    />
                    <p className="text-[#49cbfd] text-lg font-bold mt-4">
                      Khối Chồi
                    </p>
                    <p className="text-[#ee202e] font-bold">
                      Dành cho bé 3-4 tuổi
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setLevel("Lá");
                  }}
                  className={`w-full flex items-center justify-center p-2 border-2 rounded-xl group ${
                    level === "Lá" ? "border-main" : "border-2"
                  }`}
                >
                  <div>
                    <img
                      className="group-hover:scale-105 transition-all duration-300"
                      src="https://vnmedia2.monkeyuni.net/upload/web/storage_web/28-11-2023_08:58:10_360x246.png"
                      alt=""
                    />
                    <p className="text-[#c08eff] text-lg font-bold mt-4">
                      Khối Lá
                    </p>
                    <p className="text-[#ee202e] font-bold">
                      Dành cho bé 5-6 tuổi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="float-right pt-2 text-lg">
              Bạn đã đăng ký?{" "}
              <Link
                href={"/home/tra-cuu-tuyen-sinh"}
                className="text-main hover:text-mainBlur"
              >
                Tra cứu tại đây
              </Link>
            </p>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-main px-6 w-full py-3 mt-4 font-bold text-white float-right rounded-md text-lg"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollPage;
