"use client";
import Input from "@/app/components/inputs/input";
import { EditActionIcon } from "@/app/components/shared/ActionIcon";
import Button from "@/app/components/shared/Button";
import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import DefaultImage from "@/app/components/shared/defaultImage";
import { callApiWithToken } from "@/utils/callApi";
import { toYMD } from "@/utils/dateTime";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const Columns: TableTemplateColumn[] = [
  {
    title: "Hình",
    getData: (x) => (
      <DefaultImage
        img={getImageUrl(x?.avatar)}
        fallback="/avatar.webp"
        className={`w-10 h-10 rounded-full cursor-pointer`}
        custom="w-[40px] h-[40px]"
      />
    ),
    width: "60",
  },
  {
    title: "Họ tên",
    getData: (x) => x.fullName,
  },

  {
    title: "Số điện thoại",
    getData: (x) => x.phoneNumber,
  },
  {
    title: "Bằng lái",
    getData: (x) => x.license,
  },
  {
    title: "Năm sinh",
    getData: (x) => x.birthDay,
  },
];

const DriverPage = () => {
  const [refresh, setRefresh] = useState(false);
  const { data: driverData } = useFetch(`BusDriver/getDriverList`, refresh);
  const [closeDialogAddEvent, setCloseDialogAddEvent] = useState(false);
  const [closeDialogEditEvent, setCloseDialogEditEvent] = useState(false);
  const [currAvatar, setCurrAvatar] = useState<File | null>(null);
  const [chooseDriverID, setChooseDriverID] = useState("");
  const [editMode, setEditMode] = useState(false);
  const detailDriver = driverData?.find((x: any) => x.id == chooseDriverID);

  const onClose = () => {
    setCloseDialogAddEvent((curr) => !curr);
  };
  const onCloseEdit = () => {
    setCloseDialogEditEvent((curr) => !curr);
  };

  const values = editMode
    ? {
        FullName: detailDriver?.fullName,
        NumberID: detailDriver?.numberID,
        Avatar: detailDriver?.avatar,
        PhoneNumber: detailDriver?.phoneNumber,
        BirthDay: toYMD(detailDriver?.birthDay),
        License: detailDriver?.license,
        Note: detailDriver?.note,
      }
    : {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm<FieldValues>({
    defaultValues: {
      FullName: "",
      NumberID: "",
      Avatar: "",
      PhoneNumber: "",
      BirthDay: "",
      License: "",
      Note: "",
    },
    values,
  });

  useEffect(() => {
    if (isSubmitSuccessful || editMode == false || isSubmitted) {
      reset({
        FullName: "",
        NumberID: "",
        Avatar: "",
        PhoneNumber: "",
        BirthDay: "",
        License: "",
        Note: "",
      });
      setCurrAvatar(null);
    }
  }, [isSubmitSuccessful, reset, editMode, isSubmitted]);

  const handleRefresh = () => {
    setRefresh((curr) => !curr);
    setEditMode(false);
    setCurrAvatar(null);
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

    if (currAvatar) {
      formData.append("Avatar", currAvatar?.name);
    }

    callApiWithToken()
      .post(`BusDriver/addDriver`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Đã thêm tài xế");
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

    if (currAvatar) {
      formData.append("Avatar", currAvatar?.name);
    }

    callApiWithToken()
      .put(`BusDriver/putDriver?id=${chooseDriverID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Đã lưu thay đổi");
        handleRefresh();
        onCloseEdit();
      })
      .catch((error) => {
        toast.error("Có lỗi");
      });
  };

  //dialog thêm tài xế
  const DialogAdd = (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="bg-white p-4 rounded-xl md:w-1/3 mx-4 w-full h-fit">
        <div className="flex justify-between items-center mb-4 py-2 border-b">
          <h3 className="text-2xl ">Thêm Tài xế </h3>
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
          <div className="flex relative items-center border-2 border-dashed rounded-md h-fit p-2">
            <div className=" flex items-center p-2 ">
              {currAvatar && (
                <img
                  src={URL.createObjectURL(currAvatar)}
                  alt="Current Avatar"
                  className="w-[60px] h-[60px] rounded-full scale-125 mx-2"
                />
              )}
            </div>

            <input
              id={"Avatar"}
              type={"file"}
              onChange={(e) => setCurrAvatar(e.target.files![0])}
            />
          </div>
          <Input
            id="FullName"
            type="text"
            label="Họ tên"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="NumberID"
            type="text"
            label="Căn cước công dân"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="PhoneNumber"
            type="text"
            label="Số điện thoại"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="BirthDay"
            type="date"
            label="Ngày sinh"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="License"
            type="text"
            label="Hạng Bằng"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="Note"
            type="text"
            label="Ghi chú"
            register={register}
            errors={errors}
            required
          />
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
            Chỉnh sửa thông tin tài xế:{" "}
            <strong className="text-main font-bold">
              {detailDriver?.fullName}
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
          <div className="flex relative items-center border-2 border-dashed rounded-md h-fit p-2">
            <div className=" flex items-center p-2 scale-125 mx-2">
              {!currAvatar && (
                <DefaultImage
                  img={getImageUrl(detailDriver?.avatar)}
                  fallback="/avatar.webp"
                  className="w-[120px] h-[120px] rounded-full"
                />
              )}

              {currAvatar && (
                <img
                  src={URL.createObjectURL(currAvatar)}
                  alt="Current Avatar"
                  className="w-[120px] h-[120px] rounded-full"
                />
              )}
            </div>

            <input
              id={"Avatar"}
              // {...register("Avatar", { required: true })}
              type={"file"}
              onChange={(e) => setCurrAvatar(e.target.files![0])}
            />
          </div>
          <Input
            id="FullName"
            type="text"
            label="Họ tên"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="NumberID"
            type="text"
            label="Căn cước công dân"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="PhoneNumber"
            type="text"
            label="Số điện thoại"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="BirthDay"
            type="date"
            label="Ngày sinh"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="License"
            type="text"
            label="Hạng Bằng"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="Note"
            type="text"
            label="Ghi chú"
            register={register}
            errors={errors}
            required
          />
        </div>

        <Button label="Lưu" onClick={handleSubmit(onSubmitEdit)} />
      </div>
    </div>
  );
  return (
    <>
      {closeDialogAddEvent ? DialogAdd : ""}
      {closeDialogEditEvent ? DialogEdit : ""}

      <TableTemplate
        title="Danh sách tài xế"
        dataSource={driverData || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Nhập tên tài xế..."
        addButton={{
          onClick: () => {
            {
              setEditMode(false);
              onClose();
            }
          },
        }}
        actions={[
          { getLink: (x) => `/admin/bus/driver/${x.id}` },
          {
            icon: EditActionIcon,
            onClick: (x) => {
              setChooseDriverID(x.id);
              onCloseEdit();
              setEditMode(true);
            },
          },
        ]}
      />
    </>
  );
};

export default DriverPage;
