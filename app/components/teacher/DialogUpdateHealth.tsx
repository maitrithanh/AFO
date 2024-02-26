"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import callApi, { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import Button from "../shared/Button";
import Input from "../inputs/input";

interface DialogUpdateHealthProps {
  onClose: () => void;
  refresh: () => void;
  dataProp: any;
}
import { CiCalculator2 } from "react-icons/ci";

const DialogUpdateHealth = ({
  onClose,
  refresh,
  dataProp,
}: DialogUpdateHealthProps) => {
  const [bmiValue, setBmiValue] = useState(0);

  const values = {
    height: dataProp?.height,
    weight: dataProp?.weight,
    bmi: bmiValue.toFixed(2),
    eye: dataProp?.eye,
    status: dataProp?.status,
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FieldValues>({
    defaultValues: {
      height: "",
      weight: "",
      bmi: 0,
      eye: "",
      status: "",
    },
    values,
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
  });
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ something: "" });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    callApiWithToken()
      .put(`Healthy/updateHealthy?healthyId=` + dataProp?.id, data)
      .then((res) => {
        toast.success("Đã cập nhật");
        refresh();
        onClose();
        // location.reload();
      })
      .catch((errors) => {
        toast.error("Có lỗi: " + errors);
      });
  };
  const handleBmiValue = () => {
    setBmiValue(
      getValues("weight") /
        ((getValues("height") / 100) * (getValues("height") / 100))
    );
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="bg-white p-4 rounded-xl md:w-1/3 mx-4 w-full h-fit">
        <div className="flex justify-between items-center mb-4 py-2 border-b">
          <h3 className="text-2xl ">Cập nhật sức khoẻ bé</h3>
          <button className="text-gray-600" onClick={onClose}>
            <IoMdClose size={28} />
          </button>
        </div>
        <div className="grid grid-flow-col gap-4">
          <Input
            id="height"
            type="text"
            label="Chiều cao"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="weight"
            type="text"
            label="Cân nặng"
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="grid gap-4 my-4">
          <Input
            id="eye"
            type="text"
            label="Mắt"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="status"
            type="text"
            label="Trình trạng"
            register={register}
            errors={errors}
            required
          />
        </div>
        <Button label="Lưu" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
};

export default DialogUpdateHealth;
