"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import PickUpListRes from "@/types/PickUpListRes";
import { toYMD } from "@/utils/dateTime";
import { getImageUrl } from "@/utils/image";

interface Prop {
    onClose: () => void
    onSuccess: () => void
    mode: string,
    defaultData: PickUpListRes | null
}

const PutPickupDialog = ({ onSuccess, onClose, mode, defaultData }: Prop) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currAvatar, setCurrAvatar] = useState<File | null>(null);

    if (defaultData) {
        defaultData.birthDay = toYMD(defaultData?.birthDay);
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: (defaultData && mode == 'edt') ? defaultData : {
            fullName: '',
            phoneNumber: '',
            birthDay: '',
            address: '',
            note: '',
            avatar: null
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        if (currAvatar) {
            formData.append("avatar", currAvatar);
        }

        if (mode === 'add') {
            callApiWithToken()
                .post("parent/addpickup", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Specify content type
                    },
                })
                .then((res) => {
                    toast.success("Đã cập nhật");
                    onClose();
                    onSuccess();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else if (mode === 'edt') { 
            callApiWithToken()
                .put("parent/editpickup/" + defaultData?.id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Specify content type
                    },
                })
                .then((res) => {
                    toast.success("Đã cập nhật");
                    onClose();
                    onSuccess();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
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
                className="space-y-6 p-10 bg-white rounded-3xl w-[440px] mx-2 max-h-[80%] overflow-auto"
                action="#"
                method="POST"
            >
                <h3 className="text-2xl text-justify font-bold">
                    {
                        mode === 'add' ? 'Thêm người đưa đón'
                            : 
                        mode == 'edt' ? 'Sửa thông tin người đưa đón' : '???'
                    }
                </h3>

                <div className="mt-2 border-slate-300 border-2 rounded-md p-4">
                    <div className="flex items-center mb-4"> 
                        <span className="mr-4 text-slate-500">Avatar: </span>
                        {!currAvatar && defaultData?.avatar && mode === 'edt' &&
                            <img src={getImageUrl(defaultData.avatar)} alt="" className="w-14 h-14 rounded-full" />
                        }

                        {currAvatar && (
                            <img src={URL.createObjectURL(currAvatar)} alt="Current Avatar"
                                className="w-14 h-14 rounded-full"/>
                        )}
                    </div>

                    <input
                        id={'avatar'}
                        {...register('avatar', { required: mode === 'add' })} 
                        type={'file'}
                        onChange={(e) => setCurrAvatar(e.target.files![0])}
                    />
                </div>

                <div>
                    <div className="mt-2">
                        <Input
                            id="fullName"
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
                            id="phoneNumber"
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
                            id="birthDay"
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
                            id="address"
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
                            id="note"
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
