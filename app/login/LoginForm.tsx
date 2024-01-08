"use client";

import Image from "next/image";
import React, { useState } from "react";
import Input from "../components/inputs/input";
import Button from "../components/Button";
import { FaGoogle, FaFacebook } from "react-icons/fa";
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
      <div className="brightness-[.4]">
        <Image
          className="absolute h-screen w-full"
          src="https://www.8newsnow.com/wp-content/uploads/sites/59/2022/06/GettyImages-1069920924.jpg?w=2560&h=1440&crop=1"
          alt="Background Login"
          width={2560}
          height={1440}
        />
      </div>
      <div className="flex min-h-full flex-col justify-center px-8 py-12 lg:px-8">
        <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-md shadow-xl p-8 rounded-lg bg-white z-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              className="mx-auto h-10 w-auto"
              src="/Logo.png"
              alt="Your Company"
              width={500}
              height={500}
            />
            <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Đăng nhập
            </h2>
          </div>
          <form className="space-y-6" action="#" method="POST">
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
                <div className="text-sm mt-2">
                  <a
                    href="#"
                    className="font-semibold text-[#0070f4] hover:opacity-80"
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

          <hr className="my-3" />

          <div className="flex">
            <Button
              label={"Google"}
              outline
              custom="mr-2"
              icon={FaGoogle}
              onClick={() => {
                router.push("/dashboard");
              }}
            />
            <Button
              label={"Facebook"}
              outline
              icon={FaFacebook}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
