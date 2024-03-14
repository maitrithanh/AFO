"use client";
import React, { useEffect, useRef, useState } from "react";
import CardInfo from "./card/CardInfo";
import { useTranslation } from "react-i18next";
import DefaultImage from "../shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import { FaPen } from "react-icons/fa6";
import CardInfoLine from "./card/CardInfoLine";
import toast from "react-hot-toast";
import { callApiWithToken } from "@/utils/callApi";
import useFetch from "@/utils/useFetch";
import Input from "../inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../shared/Button";
import { IoIosArrowBack } from "react-icons/io";
import { toYMD } from "@/utils/dateTime";

interface DialogProfileProps {
  handleDialog: () => void;
  dataProps?: any;
  teacher?: boolean;
}

const DialogProfile: React.FC<DialogProfileProps> = ({
  handleDialog,
  dataProps,
  teacher,
}) => {
  const { t } = useTranslation();
  const uploadAvatarRef = useRef<HTMLInputElement | null>(null);
  const editRef = useRef<HTMLInputElement | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [currAvatar, setCurrAvatar] = useState<File | null>(null);
  const [refresh, setRefresh] = useState(false);

  const { data: detailChild } = useFetch(
    "Child/getChild?id=" + dataProps.id,
    refresh
  );

  //upload avtar child
  const handleFileChangeChild = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    var file: Blob = event.target.files![0];
    if (!file) return;
    const formData = new FormData();
    if (file) formData.append("file", file, undefined);

    callApiWithToken()
      .put(
        "File/ChangeChildAvatar?Id=" + dataProps.id,
        { file },
        { headers: { "content-type": "multipart/form-data" } }
      )
      .then((res) => {
        toast.success("Đã cập nhật");
        //setRefresh((x) => x + 1);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(() => {});
  };

  const onUpdateAvatarClick = () => {
    uploadAvatarRef.current?.click();
  };

  const onEditClick = () => {
    editRef.current?.click();
  };

  const handleChangeModeEdit = () => {
    setEditMode((curr) => !curr);
  };
  const values = {
    FullName: detailChild?.fullName,
    BirthDay: toYMD(detailChild?.birthDay),
    Gender: detailChild?.gender,
    Nation: detailChild?.nation,
    Address: detailChild?.address,
    Note: detailChild?.note,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      FullName: "",
      BirthDay: "",
      Gender: "",
      Nation: "",
      Address: "",
      Note: "",
    },
    values,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setRefresh(true);
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (currAvatar) {
      formData.append("AvatarFile", currAvatar);
    }

    callApiWithToken()
      .put(`Child/update/` + detailChild.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Specify content type
        },
      })
      .then((response) => {
        toast.success("Đã cập nhật");
        setTimeout(() => {
          setRefresh(false);
        }, 1000);
        handleDialog();
      })
      .catch((error) => {
        toast.error(error, { id: error });
      });
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="w-[650px] mx-2 h-fit">
        <CardInfo cardName={t("infoChild")}>
          <div className="mb-4 ">
            {editMode ? (
              <button
                onClick={() => handleChangeModeEdit()}
                className="text-main flex items-center"
              >
                <IoIosArrowBack />
                Trở lại
              </button>
            ) : (
              ""
            )}
          </div>

          <div>
            <div className="absolute right-4 -top-10">
              <span className="relative group">
                {editMode ? (
                  ""
                ) : (
                  <DefaultImage
                    img={getImageUrl(dataProps.avatar)}
                    fallback="/avatar.webp"
                    className={`w-14 h-14 rounded-full cursor-pointer`}
                    custom="w-[80px] h-[80px]"
                  />
                )}
                <div
                  title="Đổi ảnh"
                  className="h-full w-full justify-center items-center bg-black bg-opacity-50 rounded-full absolute top-0 left-0 hidden group-hover:flex"
                >
                  <input
                    type="file"
                    onChange={handleFileChangeChild}
                    className="hidden"
                    title="no"
                    ref={uploadAvatarRef}
                  />
                  <FaPen
                    onClick={onUpdateAvatarClick}
                    className="cursor-pointer text-white"
                  />
                </div>
              </span>
            </div>

            {!editMode ? (
              <>
                <CardInfoLine
                  lineName={t("fullName")}
                  contentLine={detailChild?.fullName}
                />
                <CardInfoLine
                  lineName={t("dateOfBirth")}
                  contentLine={detailChild?.birthDay}
                />
                <CardInfoLine
                  lineName={t("gender")}
                  contentLine={detailChild?.gender == 0 ? "Nữ" : "Nam"}
                />
                <CardInfoLine
                  lineName={t("joinDate")}
                  contentLine={detailChild?.joinDate}
                />
                <CardInfoLine
                  lineName={t("nationality")}
                  contentLine={detailChild?.nation}
                />
                <CardInfoLine
                  lineName={t("status")}
                  contentLine={detailChild?.status ? "Đang học" : "Đã nghỉ"}
                />

                <CardInfoLine
                  lineName={t("address")}
                  contentLine={detailChild?.address}
                />

                <CardInfoLine
                  lineName={t("note")}
                  contentLine={detailChild?.note}
                />
              </>
            ) : (
              <>
                <div className="flex w-full">
                  <div className="grid grid-rows-1 gap-4 w-full">
                    <div className="flex relative items-center border-2 border-dashed rounded-md h-fit">
                      <div className=" flex items-center p-2 ">
                        {!currAvatar && detailChild?.avatar && editMode && (
                          <img
                            src={getImageUrl(detailChild.avatar)}
                            alt=""
                            className="w-[80px] h-[80px] rounded-full"
                          />
                        )}

                        {currAvatar && (
                          <img
                            src={URL.createObjectURL(currAvatar)}
                            alt="Current Avatar"
                            className="w-[60px] h-[60px] rounded-full"
                          />
                        )}
                      </div>

                      <input
                        id={"avatar"}
                        {...register("avatar", { required: false })}
                        type={"file"}
                        onChange={(e) => setCurrAvatar(e.target.files![0])}
                      />
                    </div>

                    <Input
                      id="FullName"
                      label="Họ tên"
                      register={register}
                      errors={errors}
                    />
                    <div className="flex gap-2">
                      <Input
                        id="BirthDay"
                        label="Ngày sinh"
                        required
                        type="date"
                        register={register}
                        errors={errors}
                      />
                      <div className="relative h-full">
                        <select
                          id="Gender"
                          {...register("Gender")}
                          className="outline-none text-xl border-slate-300 border-2 rounded-md h-full px-8"
                        >
                          <option value="0">Nữ</option>
                          <option value="1">Nam</option>
                        </select>
                        <div className="text-gray-500 bg-white h-fit absolute top-0 left-2 -translate-y-3">
                          Giới tính
                        </div>
                      </div>
                    </div>
                    <Input
                      id="Nation"
                      label="Quốc tịch"
                      register={register}
                      errors={errors}
                    />
                    <Input
                      id="Address"
                      label="Địa chỉ"
                      required
                      register={register}
                      errors={errors}
                    />
                    <Input
                      id="Note"
                      type="textarea"
                      label="Ghi Chú"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-4">
            {!teacher ? (
              !editMode ? (
                <Button
                  label="Chỉnh sửa"
                  custom="my-2"
                  outline
                  onClick={() => handleChangeModeEdit()}
                />
              ) : (
                <div className="flex gap-2">
                  <Button
                    label="Lưu"
                    custom="my-2"
                    outline
                    onClick={handleSubmit(onSubmit)}
                  />
                </div>
              )
            ) : (
              ""
            )}

            <Button label="Thoát" onClick={() => handleDialog()} />
          </div>
        </CardInfo>
      </div>
    </div>
  );
};

export default DialogProfile;
