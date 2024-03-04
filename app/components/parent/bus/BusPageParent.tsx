"use client";
import React, { useEffect, useState } from "react";
import CardInfo from "../../profile/card/CardInfo";
import DefaultImage from "../../shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import CardInfoLine from "../../profile/card/CardInfoLine";
import useFetch from "@/utils/useFetch";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import TableTemplate, { TableTemplateColumn } from "../../shared/TableTemplate";
import { getCookie } from "cookies-next";

const Columns: TableTemplateColumn[] = [
  {
    title: "Tên tuyến",
    getData: (x) => x.routeName,
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
  {
    title: "Tình trạng",
    getData: (x) =>
      x.status === true ? (
        <p className="text-green-600">Đang hoạt động</p>
      ) : (
        <p className="text-rose-600">Đã dừng</p>
      ),
  },
];

const BusPage = () => {
  const { t } = useTranslation();
  const { data: allBus } = useFetch(`BusDriver/getBusList`);
  const [station, setStation] = useState("");
  const [stationName, setStationName] = useState("");
  const childID = getCookie("child");
  const { data: busDetail } = useFetch(
    `BusDriver/getBusDetail?busId=${station}`
  );
  const { data: busData } = useFetch(
    `BusDriver/getBusByChild?childId=${childID}`
  );

  useEffect(() => {
    if (allBus) {
      setStation(allBus[0].id);
      setStationName(allBus[0].routeName + " - " + allBus[0].startTime);
    }
  }, [allBus]);

  return (
    <>
      <div>
        <div>
          <div>
            <div className="bg-white z-40 w-full">
              <Select
                onValueChange={(value: any) => {
                  setStation(value);

                  setStationName(
                    allBus[value - 1].routeName +
                      " - " +
                      allBus[value - 1].startTime
                  );
                }}
              >
                <SelectTrigger className="w-fit flex px-2 text-xl bg-white outline-none">
                  Chi tiết tuyến:
                  <strong className="text-main mx-2">{stationName}</strong>
                  {/* <div className="mx-2 text-main font-bold">
                    <SelectValue
                      placeholder={stationName}
                      defaultValue={station}
                    />
                  </div> */}
                </SelectTrigger>
                <SelectContent className="bg-white z-40 p-4 border rounded-md h-[400px] overflow-auto shadow-3xl">
                  {allBus?.map((x: any) => (
                    <SelectItem
                      key={x?.id}
                      value={x?.id}
                      className="border my-2 p-2 rounded-md hover:outline-main cursor-pointer"
                    >
                      {x?.routeName} - {x?.startTime}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardInfo cardName={"Thông tin tài xế"}>
              <div className="absolute right-4 -top-10">
                <span className="relative group">
                  <DefaultImage
                    img={getImageUrl(busDetail?.driver?.avatar)}
                    fallback="/avatar.webp"
                    className={`w-14 h-14 rounded-full cursor-pointer`}
                    custom="w-[80px] h-[80px]"
                  />
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
                <div>Chuyến bắt đầu từ</div>
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
            <div className="mt-4">
              <TableTemplate
                title={`Danh sách tuyến xe đã đăng ký`}
                dataSource={busData || []}
                columns={Columns}
                searchColumns={[Columns[0]]}
                searchPlaceHolder="Nhập tên tuyến..."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusPage;
