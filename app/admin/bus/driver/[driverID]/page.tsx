"use client";
import BackAction from "@/app/components/admin/BackAction";
import CardInfo from "@/app/components/profile/card/CardInfo";
import CardInfoLine from "@/app/components/profile/card/CardInfoLine";
import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import DefaultImage from "@/app/components/shared/defaultImage";
import { callApiWithToken } from "@/utils/callApi";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import { t } from "i18next";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa6";

const DetailDriver = (params: any) => {
  const { data: driverDetail } = useFetch(
    `BusDriver/getDriverDetail?id=${params.params.driverID}`
  );
  const { data: busData } = useFetch(
    `BusDriver/getBusByDriver?idDriver=${params.params.driverID}`
  );

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
  const Columns: TableTemplateColumn[] = [
    {
      title: "Tên tuyến",
      getData: (x) => x.routeName,
    },
    {
      title: "Số lượng trẻ",
      getData: (x) => x.count,
    },
    {
      title: "Bắt đầu",
      getData: (x) => x.startTime,
    },
    {
      title: "Tên tài xế",
      getData: (x) => x.fullName,
    },
    {
      title: "Biển số",
      getData: (x) => x.busID,
    },
  ];
  return (
    <>
      <BackAction />
      {driverDetail?.map((driver: any) => {
        return (
          <div key={driver.id}>
            <CardInfo cardName={"Chi Tiết thông tin tài xế"}>
              <div className="absolute right-4 -top-10">
                <span className="relative group">
                  <DefaultImage
                    img={getImageUrl(driver?.avatar)}
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
                contentLine={driver?.fullName}
              />
              <CardInfoLine
                lineName={t("dateOfBirth")}
                contentLine={driver?.birthDay}
              />

              <CardInfoLine
                lineName={t("phoneNumber")}
                contentLine={driver?.phoneNumber}
              />
              <CardInfoLine
                lineName={t("idNumber")}
                contentLine={driver?.numberID}
              />
              <CardInfoLine
                lineName={"Hạng bằng"}
                contentLine={driver?.license}
              />
              <CardInfoLine lineName={t("note")} contentLine={driver?.note} />
            </CardInfo>

            <TableTemplate
              title="Danh sách tuyến xe tài xế phụ trách"
              dataSource={busData || []}
              columns={Columns}
              searchColumns={[Columns[0]]}
              searchPlaceHolder="Nhập tên tuyến..."
              addButton={{ link: "#" }}
              actions={[{ getLink: (x) => `/admin/bus/${x.id}` }]}
            />
          </div>
        );
      })}
    </>
  );
};

export default DetailDriver;
