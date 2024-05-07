"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import callApi, { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import moment from "moment";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/shared/Button";
import TransactionModel from "@/types/Transaction";

interface DialogAddEventProps {
    onClose: () => void;
    onRefresh: () => void;
    editMode?: boolean;
    current?: TransactionModel;
}

const UpdateTransactionDialog = ({
    onClose,
    onRefresh,
    editMode,
    current,
}: DialogAddEventProps) => {
    const values = {
        
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: { note: editMode ? '' : current?.refNumber, id: current?.transactionID },
        values,
    });

    useEffect(() => {
        if (!editMode) {
            reset({});
        }
    }, [reset, editMode]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (editMode) {
            data.note = moment().format('DD/MM/yyyy hh:mm') + ' - ' + data.note;

            callApiWithToken()
                .put(
                    `Tuition/UpdateTransaction?id=${current?.transactionID}&note=${data.note}`,
                )
                .then((res) => {
                    toast.success("Đã cập nhật");
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
                    <h3 className="text-2xl ">
                        {
                            editMode ?
                                'Xác nhận giao dịch hợp lệ' :
                                'Thông tin giao dịch'
                        }
                    </h3>
                    <button className="text-gray-600" onClick={onClose} title="Đóng">
                        <IoMdClose size={28} />
                    </button>
                </div>
                <div className="grid my-2 gap-4">
                    <Input
                        id="note"
                        label="Ghi chú"
                        required
                        register={register}
                        errors={errors}
                        disabled={!editMode}
                    />
                </div>
                {editMode && <Button custom="mt-2" label="Lưu" onClick={handleSubmit(onSubmit)} />}
            </div>
        </div>
    );
};

export default UpdateTransactionDialog;
