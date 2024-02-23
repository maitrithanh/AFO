import React, { useRef, useState } from "react";
import CardInfo from "./card/CardInfo";
import Link from "next/link";
import { MdChangeCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import DefaultImage from "../shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import { FaPen } from "react-icons/fa6";
import CardInfoLine from "./card/CardInfoLine";
import toast from "react-hot-toast";
import { callApiWithToken } from "@/utils/callApi";

interface DialogProfileProps {
  handleDialog: () => void;
  data: any;
}

const DialogProfile: React.FC<DialogProfileProps> = ({
  handleDialog,
  data,
}) => {
  const { t } = useTranslation();
  const uploadAvatarRef = useRef<HTMLInputElement | null>(null);

  //upload avtar
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var file: Blob = event.target.files![0];
    if (!file) return;
    const formData = new FormData();
    if (file) formData.append("file", file, undefined);

    callApiWithToken()
      .put(
        "File/ChangeAvatar",
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
      });
  };
  const onUpdateAvatarClick = () => {
    uploadAvatarRef.current?.click();
  };

  const infoChild = {
    fullName: "",
    birthDay: "",
    gender: "",
    joinDate: "",
    nation: "",
    status: "",
    address: "",
    note: "",
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
      onClick={() => {
        handleDialog();
      }}
    >
      <div className="w-[550px] mx-2 h-fit">
        <CardInfo cardName={t("infoChild")}>
          <div>
            <div className="absolute right-4 -top-10">
              <span className="relative group">
                <DefaultImage
                  img={getImageUrl()}
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
                    onChange={handleFileChange}
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
            <CardInfoLine
              lineName={t("fullName")}
              contentLine={data?.fullName}
            />
            <CardInfoLine
              lineName={t("dateOfBirth")}
              contentLine={infoChild?.birthDay}
            />
            <CardInfoLine
              lineName={t("gender")}
              contentLine={infoChild?.gender}
            />
            <CardInfoLine
              lineName={t("joinDate")}
              contentLine={infoChild?.joinDate}
            />
            <CardInfoLine
              lineName={t("nationality")}
              contentLine={infoChild?.nation}
            />
            <CardInfoLine
              lineName={t("status")}
              contentLine={infoChild?.status ? "Đang học" : "Đã nghỉ"}
            />

            <CardInfoLine
              lineName={t("address")}
              contentLine={infoChild?.address}
            />

            <CardInfoLine lineName={t("note")} contentLine={infoChild?.note} />
          </div>
        </CardInfo>
      </div>
    </div>
  );
};

export default DialogProfile;
