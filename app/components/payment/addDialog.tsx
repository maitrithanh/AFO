"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import callApi, { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Input from "../inputs/input";
import Button from "../shared/Button";
import useFetch from "@/utils/useFetch";
import FeeRes from "@/types/Fee";
import ResponseData from "@/types/ResponseData";

interface DialogAddEventProps {
    onClose: () => void;
    onRefresh: () => void;
}

const DialogAddPayment = ({
    onClose, onRefresh
}: DialogAddEventProps) => {

    const { data: dataFee } = useFetch<FeeRes[]>('/Tuition/getFees')

    const values = {
        Name: '',
        Price: 0,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: values,
        values,
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        callApiWithToken()
            .post(
                'tuition/AddAllTuition'
            )
            .then((res) => {
                toast.success("Đã thêm");
                onRefresh();
                onClose();
            })
            .catch((errors) => {
                var resp: ResponseData<any> = errors.response.data;
                toast.error(resp.error);
            });
    };

    return (
        <div
            className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
        >
            <div className="bg-white p-4 rounded-xl  mx-4 min-w-[30vw] h-fit">
                <div className="flex justify-between items-center mb-4 py-2 border-b">
                    <h3 className="text-2xl ">Xác nhận thu học phí tháng này?</h3>
                    <button className="text-gray-600" onClick={onClose} title="Đóng">
                        <IoMdClose size={28} />
                    </button>
                </div>

                {
                    dataFee?.filter(x => x.isActive).map(x => <div>
                        {x.name}: <b>{x.price.toLocaleString('en') + 'đ'}</b>
                    </div>)
                }


                <Button custom="mt-2" label="Lưu" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};

export default DialogAddPayment;
