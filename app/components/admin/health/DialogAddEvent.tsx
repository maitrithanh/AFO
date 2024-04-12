"use client";
import React, { useState } from "react";
import Input from "../../inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../shared/Button";
import { IoMdClose } from "react-icons/io";
import callApi, { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";

interface DialogAddEventProps {
  onClose: () => void;
}

const DialogAddEvent = ({ onClose }: DialogAddEventProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { content: "", dateTime: "" } });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    callApiWithToken()
      .post(
        `/Healthy/addEvent?content=${data.content}&dateTime=${data.dateTime}`
      )
      .then((res) => {
        toast.success("Đã thêm");
        console.log(res);
        onClose();
        // location.reload();
      })
      .catch((errors) => {
        toast.error("Có lỗi: " + errors);
      });
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="bg-white p-4 rounded-xl md:w-1/3 mx-4 w-full h-fit">
        <div className="flex justify-between items-center mb-8 py-2 border-b">
          <h3 className="text-2xl ">Thêm lịch khám sức khoẻ</h3>
          <button className="text-gray-600" onClick={onClose} title="Đóng"> 
            <IoMdClose size={28} />
          </button>
        </div>
        <div className="grid my-2 gap-4">
          <Input
            id="dateTime"
            type="date"
            label="Ngày khám"
            required
            register={register}
            errors={errors}
          />
          <textarea
            {...register("content", { required: true })}
            className="border-2 rounded-md p-4 text-xl w-full pt-4 outline-none bg-white font-light transition border-slate-300 h-[413px]"
            name="content"
            placeholder="Nội dung"
          ></textarea>
        </div>
        <Button label="Lưu" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
};

export default DialogAddEvent;
