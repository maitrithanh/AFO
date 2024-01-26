"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import PickUpListRes from "@/types/PickUpListRes";

interface Prop {
    onClose: () => void;
    mode: string,
    defaultData?: PickUpListRes
}

const PutPickupDialog = ({ onClose, mode, defaultData }: Prop) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: defaultData ?? {
            FullName: '',
            PhoneNumber: '',
            BirthDay: '',
            Address: '',
            Note: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log('datatata', data);
        // setIsLoading(true);
        // callApiWithToken()
        //     .put("Auth/ChangePassword", data)
        //     .then((res) => {
        //         toast.success("Đã cập nhật");
        //         onClose();
        //     })
        //     .catch((err) => {
        //         toast.error(err?.response?.data?.error);
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });
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
                <h3 className="text-2xl text-justify">
                    {
                        mode === 'add' ? 'Thêm người đưa đón'
                            : 
                        mode == 'edt' ? 'Sửa thông tin người đưa đón' : '???'
                    }
                </h3>
                <div>
                    <div className="mt-2">
                        <Input
                            id="FullName"
                            label="Họ tên"
                            type={'text'}
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
                            id="PhoneNumber"
                            label="Số điện thoại"
                            type={'text'}
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
                            id="BirthDay"
                            label="Ngày sinh"
                            type={'date'}
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
                            id="Address"
                            label="Địa chỉ"
                            type={'text'}
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
                            id="Note"
                            label="Chú thích"
                            type={'text'}
                            disabled={isLoading}
                            register={register}
                            errors={errors}
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

export default PutPickupDialog;
