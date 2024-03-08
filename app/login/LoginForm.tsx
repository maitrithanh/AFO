"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "../components/inputs/input";
import Button from "../components/shared/Button";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import callApi, { callApiWithToken } from "@/utils/callApi";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { AxiosResponse } from "axios";
import ResponseData from "@/types/ResponseData";
import LoginRes from "@/types/LoginRes";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Asap_Condensed } from "next/font/google";
import { useGlobalContext } from "../contexts/GlobalContext";

const font_asap_condensed = Asap_Condensed({
  weight: "800", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [typePassword, setTypePassword] = useState(false);
  //translate
  const { t } = useTranslation();
  const { refreshContactList } = useGlobalContext();

  //session nhận data sau khi sign in google hoặc fb và chuyển hướng về
  const { data: Session } = useSession();

  useEffect(() => {
    const external = sessionStorage.getItem("external");

    if (external) {
      var path, token: string;
      if (external === "google") {
        path = "Auth/LoginGoogle/";
        token = Session?.token;
      } else if (external == "facebook") {
        path = "Auth/LoginFacebook/";
        token = Session?.access_token;
      } else return;

      if (!token) return;

      setIsLoading(true);
      callApiWithToken()
        .post<ResponseData<LoginRes>>(path, {
          token,
        })
        .then(async (response) => {
          sessionStorage.removeItem("external");
          onLoginSuccess(response);
        })
        .catch((error) => {
          const data = error.response.data as ResponseData<LoginRes>;
          toast.error(data.error || t("toastLoginFail"));
          sessionStorage.removeItem("external");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [Session]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      phone: "",
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
        setIsLoading(false);
        toast.error(t("toastLoginWrong"), { id: error });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onLoginSuccess = (res: AxiosResponse<ResponseData<LoginRes>>) => {
    var role = res.data.data.role;
    var token = res.data.data.token;

    setCookie("token", token);
    setCookie("role", role);
    setCookie("expiration", res.data.data.expiration);
    if(refreshContactList) refreshContactList();
    toast.success(t("toastLoginSuccess"), { id: role });
    switch (role) {
      case "Admin":
        router.push("/admin");
        break;
      case "Teacher":
        router.push("/teacher");
        break;
      default:
        router.push("/choose-user");
        break;
    }
  };

  const handleHidePassword = () => {
    setTypePassword((curr) => !curr);
  };

  const ExternalLogin = (s: string) => {
    setIsLoading(true);
    signIn(s);
    sessionStorage.setItem("external", s);
  };

  return (
    <>
      <div className="relative">
        <div className="brightness-[.5]">
          <Image
            className="absolute h-screen w-full object-cover sm:object-fill"
            src="/background.webp"
            alt="Background Login"
            width={2560}
            height={1440}
          />
        </div>
        <div className="flex min-h-full flex-col justify-center px-8 py-12 items-center lg:px-8">
          <div className="relative mt-16 w-full sm:max-w-[440px] shadow-xl p-8 rounded-lg bg-white z-10 pt-20  justify-center">
            <div className="absolute z-10 top-0 left-0 -translate-y-[50%] justify-center w-full ">
              <Link href={"/"}>
                <Image
                  className="mx-auto h-[120px] w-[120px] rounded-full object-cover shadow-lg bg-white"
                  src="/Logo.webp"
                  alt="AFO"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div
              className={`flex justify-center text-main pb-2 text-3xl ${font_asap_condensed.className}`}
            >
              ĐĂNG NHẬP
            </div>
            <form className="space-y-6 w-full" action="#" method="POST">
              <div>
                <div className="mt-2">
                  <Input
                    id="phone"
                    label={t("account")}
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
                    label={t("password")}
                    showLockIcon={true}
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
                      {t("forgetPassword")}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  loading={isLoading}
                  label={t("login")}
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </form>
            <div className="relative flex w-full justify-center my-1">
              <hr className="my-3 w-full" />
              <p className="absolute top-0 bg-white px-2 text-gray-500"></p>
            </div>
            <div className="grid gap-2 md:grid-cols-2 ">
              <button
                className="text-[#f8853e] border-[#f8853e] border-2 p-3  font-semibold rounded-lg flex items-center justify-center gap-2"
                onClick={() => ExternalLogin("google")}
              >
                <Image
                  src={"/icons/google.webp"}
                  width={22}
                  height={22}
                  alt="Google"
                />
                Google
              </button>
              <button
                className="text-[#f8853e] border-[#f8853e] border-2 p-3 font-semibold rounded-lg flex items-center justify-center gap-2"
                onClick={() => ExternalLogin("facebook")}
              >
                <Image
                  src={"/icons/facebook.webp"}
                  width={22}
                  height={22}
                  alt="Facebook"
                />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
