"use client";

import { useState } from "react";
import Button from "../shared/Button";
import Input from "../inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";

interface Prop {
  onClose: () => void;
}

const ChangePwDialog = ({ onClose }: Prop) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hidePasswordNew, setHidePasswordNew] = useState(true);
  const [hidePasswordOld, setHidePasswordOld] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      numberID: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    callApiWithToken()
      .put("Auth/ChangePassword", data)
      .then((res) => {
        toast.success("Đã cập nhật");
        onClose();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClickOut = (e: any) => {
    if (e.target != e.currentTarget) return;
    onClose();
  };

  return (
    <div
      onClick={onClickOut}
      className="fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center"
    >
      <form
        className="space-y-6 p-10 bg-white rounded-3xl w-[440px] mx-2"
        action="#"
        method="POST"
      >
        <h3 className="text-2xl text-justify">Đổi mật khẩu</h3>
        <div>
          <div className="mt-2">
            <Input
              id="OldPassword"
              label="Mật khẩu cũ"
              showLockIcon={true}
              type={!hidePasswordOld ? "text" : "password"}
              typePassword={!hidePasswordOld}
              disabled={isLoading}
              register={register}
              errors={errors}
              onclick={() => {
                setHidePasswordOld((x) => !x);
              }}
              required
            />
          </div>
        </div>

        <div>
          <div className="mt-2">
            <Input
              id="NewPassword"
              label="Mật khẩu mới"
              showLockIcon={true}
              type={!hidePasswordNew ? "text" : "password"}
              typePassword={!hidePasswordNew}
              disabled={isLoading}
              register={register}
              errors={errors}
              onclick={() => {
                setHidePasswordNew((x) => !x);
              }}
              required
            />
          </div>
        </div>

        <div>
          <Button
            loading={isLoading}
            label={"Xác nhận"}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePwDialog;
