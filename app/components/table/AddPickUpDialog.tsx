"use client";

import { useState } from "react";
import Button from "../shared/Button";
import Input from "../inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

interface Prop {
  onClose: () => void;
}

const AddPickUpDialog = ({ onClose }: Prop) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    callApiWithToken()
      .post("Parent/AddPickup", data, {
        headers: { "content-type": "multipart/form-data" },
      })
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
        className="relative space-y-6 p-10 pt-14 bg-white rounded-lg w-[640px] mx-2"
        action="#"
        method="POST"
      >
        <div>
          <div
            className="absolute top-4 right-4 text-rose-500 cursor-pointer"
            onClick={() => {
              onClose();
            }}
          >
            <IoClose size={24} />
          </div>
          <p className="absolute top-4 text-2xl">Thêm người đưa đón</p>
        </div>
        <div>
          <div className="mt-2">
            <Input
              id="avatar"
              label="Hình"
              type={"file"}
              disabled={isLoading}
              register={register}
              errors={errors}
            />
          </div>
        </div>
        <div>
          <div className="mt-2">
            <Input
              id="fullName"
              label="Tên"
              type={"text"}
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
              id="phoneNumber"
              label="Số điện thoại"
              type={"text"}
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
              id="birthDay"
              label="Ngày sinh"
              type={"date"}
              disabled={isLoading}
              register={register}
              errors={errors}
            />
          </div>
        </div>

        <div>
          <div className="mt-2">
            <Input
              id="address"
              label="Địa chỉ"
              type={"text"}
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
              id="note"
              label="Ghi chú"
              type={"text"}
              disabled={isLoading}
              register={register}
              errors={errors}
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

export default AddPickUpDialog;
