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

interface DialogAddEventProps {
    onClose: () => void;
    onRefresh: () => void;
}

const DialogAddFee = ({
    onClose, onRefresh
}: DialogAddEventProps) => {
    const [type, setType] = useState('0');
    const [grade, setGrade] = useState('Mầm');

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
                type == '0' ? `tuition/addCategory` : 'tuition/AddBusCoats',
                {...data, grade}
            )
            .then((res) => {
                toast.success("Đã thêm");
                onRefresh();
                onClose();
                reset();
            })
            .catch((errors) => {
                toast.error("Có lỗi: " + errors);
            });
    };

    return (
        <div
            className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
        >
            <div className="bg-white p-4 rounded-xl  mx-4 min-w-[30vw] h-fit">
                <div className="flex justify-between items-center mb-4 py-2 border-b">
                    <h3 className="text-2xl ">Thêm học phí</h3>
                    <button className="text-gray-600" onClick={onClose} title="Đóng">
                        <IoMdClose size={28} />
                    </button>
                </div>

                <div className="p-2 bg-gray-100 mb-3">
                    <Select
                        onValueChange={(value: any) => {
                            setType(value);
                        }}
                    >
                        <SelectTrigger className="min-w-[200px] text-lg">
                            <p className="mr-2 text-gray-600">Loại phí:</p>
                            <SelectValue
                                placeholder={'Học phí'}
                                defaultValue={"0"}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'0'}>
                                Học phí
                            </SelectItem>
                            <SelectItem value={'1'}>
                                Phí xe bus
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {
                    type == '0' &&
                    <>
                        <div className="p-2 bg-gray-100 mb-3">
                            <Select
                                onValueChange={(value: any) => {
                                    setGrade(value);
                                }}
                            >
                                <SelectTrigger className="min-w-[200px] text-lg">
                                    <p className="mr-2 text-gray-600">Chọn khối:</p>
                                    <SelectValue
                                        placeholder={'Mầm'}
                                        defaultValue={"Mầm"}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={'Mầm'}>
                                        Mầm
                                    </SelectItem>
                                    <SelectItem value={'Chồi'}>
                                        Chồi
                                    </SelectItem>
                                    <SelectItem value={'Lá'}>
                                        Lá
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid my-2 gap-4">
                            <Input
                                id="name"
                                label="Tên"
                                required
                                register={register}
                                errors={errors}
                            />
                        </div>
                    </>
                }

                <div className="md:flex gap-4 items-center">
                    <Input
                        id="price"
                        type="number"
                        label="Số tiền"
                        required
                        register={register}
                        errors={errors}
                    />
                </div>
                <Button custom="mt-2" label="Lưu" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};

export default DialogAddFee;
