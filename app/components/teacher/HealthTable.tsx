"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "@/utils/useFetch";
import DefaultImage from "../shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import DialogUpdateHealth from "./DialogUpdateHealth";
import TableTemplate, { TableTemplateColumn } from "../shared/TableTemplate";
import { MdEditNote } from "react-icons/md";

interface HeathTableProps {
  month: any;
  classId: any;
}

const Columns: TableTemplateColumn[] = [
  {
    title: "Hình",
    getData: (x) => (
      <div className=" scale-125 w-[50px] h-[50px]">
        <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
      </div>
    ),
    width: "60",
  },
  {
    title: "Họ tên",
    getData: (x) => x.fullName,
  },
  {
    title: "Chiều cao",
    getData: (x) => x.height,
  },
  {
    title: "Cân nặng",
    getData: (x) => x.weight,
  },
  {
    title: "BMI",
    getData: (x) => x.bmi,
  },
  {
    title: "Mắt",
    getData: (x) => x.eye,
  },
  {
    title: "Tình trạng",
    getData: (x) =>
      x.status == "Khỏe Mạnh" ? (
        <span className="text-green-600">{x.status}</span>
      ) : (
        <span className="text-yellow-600">{x.status}</span>
      ),
  },
];

const HealthTable = ({ month, classId }: HeathTableProps) => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  const { data: healthListStudent } = useFetch(
    `Healthy/getListHealthy?eventId=${month}&classId=${classId}`,
    refresh
  );

  const [closeDialogAddEvent, setCloseDialogAddEvent] = useState(false);
  const [dataHealth, setDataHealth] = useState({});
  const onClose = () => {
    setCloseDialogAddEvent((curr) => !curr);
  };
  const handleUpdateHealth = (data: any) => {
    setDataHealth(data);
    onClose();
  };
  const handleRefresh = () => {
    setRefresh((curr) => !curr);
  };

  return (
    <>
      <div
        className={`${
          !closeDialogAddEvent ? "hidden opacity-0" : "block opacity-100"
        } transition-all`}
      >
        <DialogUpdateHealth
          onClose={onClose}
          dataProp={dataHealth}
          refresh={handleRefresh}
        />
      </div>
      <TableTemplate
        title={``}
        dataSource={healthListStudent || []}
        columns={Columns}
        searchColumns={[Columns[1]]}
        searchPlaceHolder="Tìm kiếm..."
        // addButton={{ link: "#" }}
        actions={[
          {
            icon: (
              <span className="text-black">
                <MdEditNote size={24} />
              </span>
            ),
            onClick: (x) => {
              handleUpdateHealth(x);
            },
          },
        ]}
        // extraElementsToolBar={selectMonth}
      />
      <div className="flex justify-center items-center p-2">
        {healthListStudent ? (
          healthListStudent.length <= 0 ? (
            <p>Không có dữ liệu</p>
          ) : null
        ) : (
          "Đang tải"
        )}
      </div>
    </>
  );
};

export default HealthTable;
