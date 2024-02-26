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

interface DialogProfileProps {
  handleDialog: () => void;
  data: any;
  teacher?: boolean;
}

const DialogProfile: React.FC<DialogProfileProps> = ({
  handleDialog,
  data,
  teacher,
}) => {
  const { t } = useTranslation();
  const uploadAvatarRef = useRef<HTMLInputElement | null>(null);
  const editRef = useRef<HTMLInputElement | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { data: detailChild } = useFetch(
    "Child/getChild?id=" + data.id,
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
        "File/ChangeChildAvatar?Id=" + data.id,
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
    fullName: detailChild?.fullName,
    birthDay: detailChild?.birthDay,
    gender: detailChild?.gender,
    nation: detailChild?.nation,
    address: detailChild?.address,
    note: detailChild?.note,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: "",
      birthDay: "",
      gender: "",
      nation: "",
      address: "",
      note: "",
    },
    values,
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    callApiWithToken()
      .put(`Child/update/` + detailChild.id, data)
      .then((response) => {
        toast.success("Đã cập nhật");
        setRefresh(true);
        handleDialog();
      })
      .catch((error) => {
        toast.error(error, { id: error });
      });
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
      // onClick={() => {
      //   handleDialog();
      // }}
    >
      <div className="w-[550px] mx-2 h-fit">
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
                <DefaultImage
                  img={getImageUrl(data.avatar)}
                  fallback="/avatar.webp"
                  className={`w-14 h-14 rounded-full cursor-pointer`}
                  custom="w-[80px] h-[80px]"
                />
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
                    <Input
                      id="fullName"
                      label="Họ tên"
                      register={register}
                      errors={errors}
                    />
                    <Input
                      id="birthDay"
                      label="Ngày sinh"
                      register={register}
                      errors={errors}
                    />
                    <select
                      id="gender"
                      {...register("gender")}
                      className="outline-none border-slate-300 border-2 rounded-md p-4"
                    >
                      <option value="0">Nữ</option>
                      <option value="1">Nam</option>
                    </select>
                    <Input
                      id="nation"
                      label="Quốc tịch"
                      register={register}
                      errors={errors}
                    />
                    <Input
                      id="address"
                      label="Địa chỉ"
                      register={register}
                      errors={errors}
                    />
                    <Input
                      id="note"
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
