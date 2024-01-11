"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "../components/inputs/input";
import Button from "../components/Button";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useRouter} from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import callApi, { callApiWithToken } from "@/utils/callApi";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { signIn, useSession } from 'next-auth/react'
import { AxiosResponse } from "axios";
import ResponseData from "@/types/ResponseData";
import LoginRes from "@/types/LoginRes";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [typePassword, setTypePassword] = useState(false);

  //session nhận data sau khi sign in google hoặc fb và chuyển hướng về
  const { data: Session } = useSession();

  useEffect(() => { 
    const external = sessionStorage.getItem('external');

    if (external) { 
      var path, token: string;
      if (external === 'google') {
        path = 'Auth/LoginGoogle/';
        token = Session?.token;
      } else if (external == 'facebook') {
        path = 'Auth/LoginFacebook/';
        token = Session?.access_token;
      } else return;

      if (!token) return;

      setIsLoading(true);
      callApiWithToken()
        .post<ResponseData<LoginRes>>(path, {
          token
      })
        .then(async (response) => {
          sessionStorage.removeItem('external');
          onLoginSuccess(response);
        })
        .catch((error) => {
          const data = error.response.data as ResponseData<LoginRes>;
          toast.error(data.error || 'Đăng nhập thất bại');
          setIsLoading(false);
          sessionStorage.removeItem('external');
        })    
    }
  }, [Session])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    callApi
      .post(`Auth/login/`, data)
      .then((response) => {
        onLoginSuccess(response);
      })
      .catch((error) => {
        toast.error("Sai tài khoản hoặc mật khẩu", { id: error });
      }).finally(() => { 
        setIsLoading(false);
      })
  };

  const onLoginSuccess = (res: AxiosResponse<ResponseData<LoginRes>>) => { 
    var role = res.data.data.role
    var token = res.data.data.token
    
    setCookie("token", token);
    setCookie("role", role);
    setCookie("expiration", res.data.data.expiration);
    toast.success("Đăng nhập thành công ", { id: role });
    switch (role) {
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
  }

  const handleHidePassword = () => {
    setTypePassword((curr) => !curr);
  };

  const ExternalLogin = (s: string) => {
    setIsLoading(true);
    signIn(s);
    sessionStorage.setItem('external', s);
  }

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
      <div className="flex min-h-full flex-col justify-center px-8 py-12 items-center lg:px-8">
        <div className="relative mt-16 w-full sm:max-w-[440px] shadow-xl p-8 rounded-lg bg-[#e8e6e67d] z-10 pt-24  justify-center">
          <div className="absolute z-10 top-0 left-0 -translate-y-[50%] justify-center w-full">
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
                  id="password"
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

          <hr className="my-3" />

          <div className="flex">
            <Button
              label={"Google"}
              outline
              custom="mr-2"
              icon={FaGoogle}
              onClick={() => ExternalLogin('google')}
            />
            <Button
              label={"Facebook"}
              outline
              icon={FaFacebook}
              onClick={() => ExternalLogin('facebook')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
