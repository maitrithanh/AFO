"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "../components/inputs/input";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import callApi from "@/utils/callApi";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [typePassword, setTypePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      passwordHash: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    callApi
      .post(`Auth/login/`, data)
      .then((response) => {
        setCookie("token", response.data.token);
        setCookie("role", response.data.role);
        setCookie("expiration", response.data.expiration);
        toast.success("Đăng nhập thành công", { id: response.data.role });
        switch (response.data.role) {
          case "Admin":
            router.push("/admin");
            break;
          case "Teacher":
            router.push("/teacher");
            break;
          default:
            router.push("/");
            break;
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Sai tài khoản hoặc mật khẩu", { id: error });
      });
  };

  const handleHidePassword = () => {
    setTypePassword((curr) => !curr);
  };
  return (
    <div className="relative">
      <div className="brightness-[.8]">
        <Image
          className="absolute h-screen w-full object-cover sm:object-fill"
          src="/background.jpg"
          alt="Background Login"
          width={2560}
          height={1440}
        />
      </div>
      <div className="flex min-h-full flex-col justify-center px-4 py-12 items-center lg:px-8">
        <div className="relative mt-24 w-full sm:max-w-[440px] shadow-xl px-6 py-8 rounded-lg bg-white z-10 pt-20 flex justify-center">
          <div className="absolute z-10 top-0 -translate-y-[50%]">
            <Image
              className="mx-auto h-[120px] w-[120px] rounded-full object-cover shadow-lg"
              src="/Logo.jpg"
              alt="Your Company"
              width={100}
              height={100}
            />
          </div>
          <form className="space-y-6 w-full" action="#" method="POST">
            <div>
              <div className="mt-2">
                <Input
                  id="username"
                  label="Tài khoản"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <Input
                  id="passwordHash"
                  label="Mật khẩu"
                  type={typePassword ? "text" : "password"}
                  typePassword={typePassword}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  onclick={handleHidePassword}
                  required
                />
              </div>
              <div className="flex items-center justify-end">
                <div className="text-sm mt-1">
                  <a
                    href="#"
                    className="font-semibold text-[#dc662b] hover:opacity-80"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <Button
                loading={isLoading}
                label={"Đăng nhập"}
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
