"use client";
import React, { useEffect, useState } from "react";
import Input from "../../inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../shared/Button";
import { IoMdClose } from "react-icons/io";
import callApi, { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";

interface DialogAddEventProps {
  onClose: () => void;
  editMode?: boolean;
  currentEvents?: any;
}

const DialogAddEvent = ({
  onClose,
  editMode,
  currentEvents,
}: DialogAddEventProps) => {
  function formatDate(date: string) {
    var d = new Date(reformatDateString(date)),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const values = {
    title: currentEvents?.title,
    start: formatDate(currentEvents?.startDate),
    end: formatDate(currentEvents?.endDate),
  };

  function reformatDateString(date: string) {
    var b = date?.split(/\D/);
    return b?.reverse().join("-");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: { title: "", start: "", end: "" },
    values,
  });

  useEffect(() => {
    if (!editMode) {
      reset({});
    }
  }, [reset, editMode]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (editMode) {
      callApiWithToken()
        .put(
          `Events/updateEvent?id=${currentEvents?.id}&title=${data.title}&start=${data.start}&end=${data.end}`
        )
        .then((res) => {
          toast.success("Đã lưu");
          console.log(res);
          onClose();
          // location.reload();
        })
        .catch((errors) => {
          toast.error("Có lỗi: " + errors);
        });
    } else {
      callApiWithToken()
        .post(
          `Events/addEvent?title=${data.title}&start=${data.start}&end=${data.end}`
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
    }
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="bg-white p-4 rounded-xl  mx-4 w-fit h-fit">
        <div className="flex justify-between items-center mb-4 py-2 border-b">
          <h3 className="text-2xl ">Thêm lịch sự kiện</h3>
          <button className="text-gray-600" onClick={onClose}>
            <IoMdClose size={28} />
          </button>
        </div>
        <div className="grid my-2 gap-4">
          <Input
            id="title"
            label="Tên sự kiện"
            required
            register={register}
            errors={errors}
          />
          <div className="md:flex gap-4 items-center">
            <Input
              id="start"
              type="date"
              label="Ngày bắt đầu"
              required
              register={register}
              errors={errors}
            />
            <p className="z-50">Đến</p>
            <Input
              id="end"
              type="date"
              label="Ngày kết thúc"
              required
              register={register}
              errors={errors}
            />
          </div>
        </div>
        <Button custom="mt-2" label="Lưu" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
};

export default DialogAddEvent;
