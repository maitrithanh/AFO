"use client";

import React, { useRef } from "react";
import DefaultImage from "../../shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import CardInfo from "../../profile/card/CardInfo";
import toast from "react-hot-toast";
import { callApiWithToken } from "@/utils/callApi";
import { FaPen } from "react-icons/fa6";
import CardInfoLine from "../../profile/card/CardInfoLine";
import { useTranslation } from "react-i18next";
import useFetch from "@/utils/useFetch";
import BackAction from "../BackAction";
import TableTemplate, { TableTemplateColumn } from "../../shared/TableTemplate";

const Columns: TableTemplateColumn[] = [
  {
    title: "Hình",
    getData: (x) => x.avatar,
  },
  {
    title: "Họ tên",
    getData: (x) => x.fullName,
  },
  {
    title: "Ngày sinh",
    getData: (x) => x.birthDay,
  },
  {
    title: "Địa chỉ",
    getData: (x) => x.address,
  },
  {
    title: "Lớp",
    getData: (x) => x.classRoom,
  },
  {
    title: "Liên hệ phụ huynh",
    getData: (x) => x.phone,
  },
];

const DetailBus = ({ param }: any) => {
  //Translate
  const { t } = useTranslation();
  const { data: busDetail } = useFetch(`BusDriver/getBusDetail?busId=${param}`);
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

  return (
    <div>
      <BackAction />
      <div>
        <div className="bg-white p-4 rounded-md shadow-3xl">
          <p className="md:text-2xl text-lg md:mb-0 mb-8">
            Chi tiết tuyến xe:{" "}
            <strong className="text-main">{busDetail?.routeName}</strong>
          </p>
          <CardInfo cardName={"Thông tin tài xế"}>
            <div className="absolute right-4 -top-10">
              <span className="relative group">
                <DefaultImage
                  img={getImageUrl(busDetail?.driver?.avatar)}
                  fallback="/avatar.webp"
                  className={`w-14 h-14 rounded-full cursor-pointer`}
                  custom="w-[80px] h-[80px]"
                />
                <div
                  title="Đổi ảnh"
                  className="h-full w-full justify-center items-center bg-black bg-opacity-50 rounded-full absolute top-0 left-0 hidden group-hover:flex"
                >
                  {/* <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    title="no"
                    ref={uploadAvatarRef}
                  />
                  <FaPen
                    onClick={onUpdateAvatarClick}
                    className="cursor-pointer text-white"
                  /> */}
                </div>
              </span>
            </div>
            <CardInfoLine
              lineName={t("fullName")}
              contentLine={busDetail?.driver?.fullName}
            />
            <CardInfoLine
              lineName={t("dateOfBirth")}
              contentLine={busDetail?.driver?.birthDay}
            />

            <CardInfoLine
              lineName={t("phoneNumber")}
              contentLine={busDetail?.driver?.phoneNumber}
            />
            <CardInfoLine
              lineName={t("idNumber")}
              contentLine={busDetail?.driver?.numberID}
            />
            <CardInfoLine
              lineName={"Hạng bằng"}
              contentLine={busDetail?.driver?.license}
            />
            <CardInfoLine
              lineName={t("note")}
              contentLine={busDetail?.driver?.note}
            />
          </CardInfo>
          <div className="mt-4 shadow-3xl p-4 px-8 rounded-md border">
            <p className="font-bold text-2xl text-main py-1 mb-2 border-b">
              Thông tin trạm
            </p>
            <div className="md:grid md:grid-cols-2 flex justify-between text-xl font-bold text-gray-700">
              <div>Địa điểm đón</div>
              <div>Thời gian đón</div>
            </div>
            <div className="md:grid md:grid-cols-2 flex justify-between text-lg">
              <p>{busDetail?.stationStart}</p>
              <p>{busDetail?.startTime}</p>
            </div>
            <div className="md:grid md:grid-cols-2 flex justify-between text-xl font-bold text-gray-700">
              <div>Địa điểm trả</div>
              <div>Thời gian trả</div>
            </div>
            <div className="md:grid md:grid-cols-2 flex justify-between text-lg">
              <p>{busDetail?.stationEnd}</p>
              <p>{busDetail?.endTime}</p>
            </div>
          </div>
          <div className="mt-4 bg-white p-2 rounded-md shadow-3xl">
            <TableTemplate
              title="Danh sách trẻ"
              dataSource={busDetail?.children || []}
              columns={Columns}
              searchColumns={[Columns[0]]}
              searchPlaceHolder="Nhập tên học sinh..."
              addButton={{ link: "#" }}
              actions={[{ getLink: (x) => `/admin/detail/child/${x.id}` }]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBus;
