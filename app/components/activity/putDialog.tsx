"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import callApi, { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import { formatDate, reformatDateString } from "@/utils/formatDate/formatDate";
import Button from "../shared/Button";
import Input from "../inputs/input";
import Activity from "@/types/Activity";

interface DialogAddEventProps {
    onClose: () => void;
    onRefresh: () => void;
    editMode?: boolean;
    current?: Activity;
}

const PutActivityDialog = ({
    onClose,
    onRefresh,
    editMode,
    current,
}: DialogAddEventProps) => {
    const values = {
       ...current
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: { name: "", desc: "", time: 0 },
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
                    `Schedule/UpdateActivity/${current?.id}`, data
                )
                .then((res) => {
                    toast.success("Đã thêm");
                    onRefresh();
                    onClose();
                })
                .catch((errors) => {
                    toast.error("Có lỗi");
                });
            
        } else {
            callApiWithToken()
                .post(
                    `Schedule/AddActivity`, data
                )
                .then((res) => {
                    toast.success("Đã lưu");
                    onRefresh();
                    onClose();
                })
                .catch((errors) => {
                    toast.error("Có lỗi");
                });
        }
    };

    const onClickOut = (e: any) => {
        if (e.target != e.currentTarget) return;
        onClose();
    };

    return (
        <div
            className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
            onClick={onClickOut}
        >
            <div className="bg-white p-4 rounded-xl  mx-4 w-fit h-fit min-w-[40vw]">
                <div className="flex justify-between items-center mb-4 py-2 border-b">
                    <h3 className="text-2xl ">{editMode ? 'Sửa' : 'Thêm'} hoạt động</h3>
                    <button className="text-gray-600" onClick={onClose} title="Đóng">
                        <IoMdClose size={28} />
                    </button>
                </div>
                <div className="grid my-2 gap-4">
                    <Input
                        id="name"
                        label="Tên hoạt động"
                        required
                        register={register}
                        errors={errors}
                    />
                    <div className="md:flex gap-4 items-center">
                        <Input
                            id="desc"
                            label="Mô tả"
                            required
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="md:flex gap-4 items-center">
                        <Input
                            id="time"
                            type="number"
                            label="Thời gian (phút)"
                            required
                            register={register}
                            errors={errors}
                            min={5}
                            step={5}
                        />
                    </div>
                </div>
                <Button custom="mt-2" label="Lưu" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};

export default PutActivityDialog;
