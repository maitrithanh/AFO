"use client";

import React, { useRef, useState } from "react";
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
import Button from "../../shared/Button";
import Input from "@/app/components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { DeleteActionIcon } from "../../shared/DeleteActionIcon";

const Columns: TableTemplateColumn[] = [
  {
    title: "Hình",
    getData: (x) => (
      <DefaultImage
        img={getImageUrl(x?.avatar)}
        fallback="/avatar.webp"
        className={`w-14 h-14 rounded-full cursor-pointer`}
        custom="w-[80px] h-[80px]"
      />
    ),
  },
  {
    title: "Họ tên",
    getData: (x) => x.fullName,
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
  const uploadAvatarRef = useRef<HTMLInputElement | null>(null);
  const { data: allKidsData } = useFetch(`Child/getList`);

  const [refresh, setRefresh] = useState(false);
  const [searchChild, setSearchChild] = useState("");
  const [closeDialogAddEvent, setCloseDialogAddEvent] = useState(false);
  const [closeDialogDeleteEvent, setCloseDialogDeleteEvent] = useState(false);
  const [chooseKids, setChooseKids] = useState("");
  const [chooseKidsDelete, setChooseKidsDelete] = useState("");
  const [openSearchKids, setOpenSearchKids] = useState(false);
  const [idBusChild, setIdBusChild] = useState("");
  const { data: busDetail } = useFetch(
    `BusDriver/getBusDetail?busId=${param}`,
    refresh
  );

  console.log(busDetail);

  const allKids = allKidsData?.filter((x: any) =>
    x.fullName?.toLowerCase()?.includes(searchChild.toLowerCase())
  );

  const onClose = () => {
    setCloseDialogAddEvent((curr) => !curr);
  };
  const onCloseDelete = () => {
    setCloseDialogDeleteEvent((curr) => !curr);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      RouteName: "",
      StationStart: "",
      StationEnd: "",
      StartTime: "",
      EndTime: "",
      DriverId: "",
    },
  });

  const handleRefresh = () => {
    setRefresh((curr) => !curr);
    if (refresh === true) {
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    callApiWithToken()
      .post(`BusDriver/addChildToBus?busId=${param}&childId=${chooseKids}`)
      .then((response) => {
        toast.success(response.data);
        handleRefresh();
        onClose();
      })
      .catch((error) => {
        toast.error("Có lỗi");
      });
  };

  const deleteChildOnBus = () => {
    callApiWithToken()
      .delete(`BusDriver/removeChildToBus?idBusChild=${chooseKidsDelete}`)
      .then((response) => {
        toast.success("Xoá thành công");
        handleRefresh();
        onCloseDelete();
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

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

  //dialog add kids
  const DialogAdd = (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="bg-white p-4 rounded-xl md:w-1/3 mx-4 w-full h-fit">
        <div className="flex justify-between items-center mb-4 py-2 border-b">
          <h3 className="text-2xl ">
            Thêm trẻ cho tuyến xe{" "}
            <strong className="text-main">{busDetail?.routeName}</strong>
          </h3>
          <button
            className="text-gray-600"
            onClick={() => {
              onClose();
            }}
          >
            <IoMdClose size={28} />
          </button>
        </div>

        <div className="grid gap-4 my-4">
          <div className="relative h-full w-full">
            <div className="text-gray-500 bg-white h-fit absolute top-0 left-2 -translate-y-3">
              Họ tên trẻ đã chọn
            </div>
            <div>
              <input
                onClick={() => {
                  setOpenSearchKids(true);
                }}
                type="text"
                value={
                  allKids?.find((x: any) => x.id === chooseKids)?.fullName +
                  " - " +
                  chooseKids
                }
                className="outline-none text-xl border-slate-300 border-2 rounded-md w-full h-full p-4"
              />
              {openSearchKids && (
                <>
                  <input
                    type="text"
                    onChange={(e) => setSearchChild(e.target.value)}
                    placeholder="Nhập tên để tìm trẻ..."
                    className="outline-none text-xl border-slate-300 shadow-2xl p-2 rounded-md w-full h-full my-1"
                  />
                  <div className="bg-white">
                    <div className="h-[200px] overflow-auto">
                      {allKids?.map((item: any) => {
                        return (
                          <div
                            className="text-xl hover:text-main cursor-pointer"
                            onClick={() => {
                              setChooseKids(item.id);
                            }}
                            key={item.id}
                          >
                            {item.fullName} - {item.id}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Button label="Lưu" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );

  const DialogDelete = (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="bg-white p-4 rounded-xl md:w-1/3 mx-4 w-full h-fit">
        <div className="flex justify-between items-center mb-4 py-2 border-b">
          <h3 className="text-2xl ">
            Xoá trẻ trong tuyến xe
            <strong className="text-main"> {busDetail?.routeName}</strong>
          </h3>
          <button
            className="text-gray-600"
            onClick={() => {
              onCloseDelete();
            }}
          >
            <IoMdClose size={28} />
          </button>
        </div>
        <div className="grid gap-4 my-4">
          <div className="relative h-full w-full">
            <div className="text-gray-500 bg-white h-fit absolute top-0 left-2 -translate-y-3">
              Họ tên trẻ đã chọn
            </div>
            <div>
              <input
                onClick={() => {
                  setOpenSearchKids(true);
                }}
                type="text"
                value={
                  busDetail?.children?.find(
                    (x: any) => x.idBus === chooseKidsDelete
                  )?.fullName
                }
                readOnly
                className="outline-none text-xl border-slate-300 border-2 rounded-md w-full h-full p-4"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            label="Huỷ"
            outline
            onClick={() => {
              onCloseDelete();
            }}
          />
          <Button
            label="Xoá"
            onClick={() => {
              deleteChildOnBus();
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <BackAction />
      {closeDialogAddEvent ? DialogAdd : ""}
      {closeDialogDeleteEvent ? DialogDelete : ""}
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
              <div>Chuyến bắt đầu</div>
            </div>
            <div className="md:grid md:grid-cols-2 flex justify-between text-lg">
              <p>{busDetail?.stationStart}</p>
              <p>{busDetail?.startTime}</p>
            </div>
            <div className="md:grid md:grid-cols-2 flex justify-between text-xl font-bold text-gray-700">
              <div>Địa điểm trả</div>
              <div>Chuyến sẽ kết thúc vào</div>
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
              addButton={{
                onClick: () => {
                  {
                    onClose();
                  }
                },
              }}
              actions={[
                { getLink: (x) => `/admin/detail/child/${x.id}` },
                {
                  icon: DeleteActionIcon,
                  onClick: (x) => {
                    onCloseDelete();
                    setChooseKidsDelete(x.idBus);
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBus;
