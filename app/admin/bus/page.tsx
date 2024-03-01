"use client";
import Input from "@/app/components/inputs/input";
import { EditActionIcon } from "@/app/components/shared/ActionIcon";
import Button from "@/app/components/shared/Button";
import { DeleteActionIcon } from "@/app/components/shared/DeleteActionIcon";
import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import { callApiWithToken } from "@/utils/callApi";
import { toYMD } from "@/utils/dateTime";
import { hanldeDateTime } from "@/utils/formatDate/hanldeDateTime";
import useFetch from "@/utils/useFetch";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

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
  const [refresh, setRefresh] = useState(false);
  const { data: busData } = useFetch(`BusDriver/getBusList`, refresh);
  const { data: driverData } = useFetch(`BusDriver/getDriverList`);
  const [closeDialogAddEvent, setCloseDialogAddEvent] = useState(false);
  const [closeDialogEditEvent, setCloseDialogEditEvent] = useState(false);
  const [idBusChoose, setIdBusChoose] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { data: busDataDetail } = useFetch(
    `BusDriver/getBusDetail?busId=${idBusChoose}`
  );

  const onClose = () => {
    setEditMode(false);
    setCloseDialogAddEvent((curr) => !curr);
  };
  const onCloseEdit = () => {
    setCloseDialogEditEvent((curr) => !curr);
  };

  const values = {
    RouteName: busData?.find((x: any) => x.id === idBusChoose)?.routeName,
    StationStart: busData?.find((x: any) => x.id === idBusChoose)?.stationStart,
    StationEnd: busData?.find((x: any) => x.id === idBusChoose)?.stationEnd,
    StartTime: hanldeDateTime(
      busData
        ?.find((x: any) => x.id === idBusChoose)
        ?.startTime.split(" - ")[0],
      busData?.find((x: any) => x.id === idBusChoose)?.startTime.split(" - ")[1]
    ),
    EndTime: hanldeDateTime(
      busData?.find((x: any) => x.id === idBusChoose)?.endTime.split(" - ")[0],
      busData?.find((x: any) => x.id === idBusChoose)?.endTime.split(" - ")[1]
    ),
    DriverId: busData?.find((x: any) => x.id === idBusChoose)?.driverId,
    BusID: busData?.find((x: any) => x.id === idBusChoose)?.busID,
    Status: busData?.find((x: any) => x.id === idBusChoose)?.status,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      RouteName: "",
      StationStart: "",
      StationEnd: "",
      StartTime: "",
      EndTime: "",
      DriverId: "",
      BusID: "",
      Status: "",
    },
    values,
  });

  useEffect(() => {
    if (editMode === false || isSubmitSuccessful) {
      reset({
        RouteName: "",
        StationStart: "",
        StationEnd: "",
        StartTime: "",
        EndTime: "",
        DriverId: "",
        BusID: "",
        Status: "",
      });
    }
  }, [reset, editMode, closeDialogAddEvent, isSubmitSuccessful]);

  const handleRefresh = () => {
    setRefresh((curr) => !curr);
    setEditMode(false);
    if (refresh === true) {
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    console.log(formData);

    callApiWithToken()
      .post(`BusDriver/addBus`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Đã thêm tuyến xe");
        handleRefresh();
        onClose();
      })
      .catch((error) => {
        toast.error("Có lỗi");
      });
  };

  const onSubmitEdit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    callApiWithToken()
      .put(`BusDriver/putBus?id=${idBusChoose}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Sửa thành công");
        handleRefresh();
        onCloseEdit();
      })
      .catch((error) => {
        toast.error("Có lỗi");
      });
  };

  const DialogAdd = (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="bg-white p-4 rounded-xl md:w-1/3 mx-4 w-full h-fit">
        <div className="flex justify-between items-center mb-4 py-2 border-b">
          <h3 className="text-2xl ">Thêm tuyến xe </h3>
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
          <Input
            id="RouteName"
            type="text"
            label="Tên tuyến"
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="grid grid-flow-col gap-4">
          <Input
            id="StationStart"
            type="text"
            label="Điểm đón "
            register={register}
            errors={errors}
            required
          />
          <Input
            id="StationEnd"
            type="text"
            label="Điểm trả"
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="grid grid-flow-row gap-4 my-4">
          <Input
            id="StartTime"
            type="datetime-local"
            label="Giờ đón"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="EndTime"
            type="datetime-local"
            label="Giờ trả"
            register={register}
            errors={errors}
            required
          />
        </div>
        <Input
          id="BusID"
          type="text"
          label="Biển số xe"
          register={register}
          errors={errors}
          required
        />
        <div className="grid gap-4 my-4">
          <div className="relative h-full w-full">
            <select
              id="DriverId"
              {...register("DriverId", { required: true })}
              className="outline-none text-xl border-slate-300 border-2 rounded-md w-full h-full p-4"
            >
              {driverData?.map((item: any, index: any) => {
                return (
                  <option key={index} value={item.id}>
                    {item.fullName}
                  </option>
                );
              })}
            </select>
            <div className="text-gray-500 bg-white h-fit absolute top-0 left-2 -translate-y-3">
              Tài xế
            </div>
          </div>
        </div>
        <Button label="Lưu" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );

  const DialogEdit = (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="bg-white p-4 rounded-xl md:w-1/3 mx-4 w-full h-fit">
        <div className="flex justify-between items-center mb-4 py-2 border-b">
          <h3 className="text-2xl ">
            Chỉnh sửa tuyến xe{" "}
            <strong className="text-main font-bold">
              {" "}
              {values?.RouteName}
            </strong>
          </h3>
          <button
            className="text-gray-600"
            onClick={() => {
              onCloseEdit();
            }}
          >
            <IoMdClose size={28} />
          </button>
        </div>
        <div className="grid gap-4 my-4">
          <Input
            id="RouteName"
            type="text"
            label="Tên tuyến"
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="grid grid-flow-col gap-4">
          <Input
            id="StationStart"
            type="text"
            label="Điểm đón "
            register={register}
            errors={errors}
            required
          />
          <Input
            id="StationEnd"
            type="text"
            label="Điểm trả"
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="grid grid-flow-row gap-4 my-4">
          <Input
            id="StartTime"
            type="datetime-local"
            label="Giờ đón"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="EndTime"
            type="datetime-local"
            label="Giờ trả"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="BusID"
            type="text"
            label="Biển số xe"
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="grid gap-4 my-4">
          <div className="relative h-full w-full">
            <select
              id="DriverId"
              {...register("DriverId", { required: true })}
              className="outline-none text-xl border-slate-300 border-2 rounded-md w-full h-full p-4"
            >
              <option value={busDataDetail?.driver?.id} defaultChecked>
                {busDataDetail?.driver?.fullName}
              </option>
              {driverData?.map((item: any) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.fullName}
                  </option>
                );
              })}
            </select>
            <div className="text-gray-500 bg-white h-fit absolute top-0 left-2 -translate-y-3">
              Tài xế
            </div>
          </div>

          <div className="relative h-full w-full">
            <select
              id="Status"
              {...register("Status", { required: true })}
              className="outline-none text-xl border-slate-300 border-2 rounded-md w-full h-full p-4"
            >
              <option value="true" defaultChecked>
                Hoạt động
              </option>
              <option value="false">Dừng</option>
            </select>
            <div className="text-gray-500 bg-white h-fit absolute top-0 left-2 -translate-y-3">
              Trạng thái
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {/* <Button
            label="Huỷ"
            outline
            onClick={() => {
              onCloseEdit();
              setEditMode(true);
            }}
          /> */}

          <Button label="Lưu" onClick={handleSubmit(onSubmitEdit)} />
        </div>
      </div>
    </div>
  );
  return (
    <>
      {closeDialogAddEvent ? DialogAdd : ""}
      {closeDialogEditEvent ? DialogEdit : ""}
      <TableTemplate
        title="Danh sách tuyến xe"
        dataSource={busData || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Nhập tên tuyến..."
        addButton={{
          onClick: () => {
            {
              setEditMode(false);
              onClose();
            }
          },
        }}
        actions={[
          {
            icon: EditActionIcon,
            onClick: (x) => {
              setIdBusChoose(x.id);
              onCloseEdit();
            },
          },
          { getLink: (x) => `/admin/bus/${x.id}` },
        ]}
      />
    </>
  );
};

export default BusPage;
