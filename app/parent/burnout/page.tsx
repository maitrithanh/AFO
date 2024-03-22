"use client";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/shared/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { callApiWithToken } from "@/utils/callApi";
import useFetch from "@/utils/useFetch";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiCircleMore } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdCancelScheduleSend } from "react-icons/md";

const BurnOutPage = () => {
  const [closeDialogBurnOut, setCloseDialogBurnOut] = useState(false);
  const childID = getCookie("child");
  const [refresh, setRefresh] = useState(false);
  const { data: dataListBurnOutByChild } = useFetch(
    `CheckIn/getRequestByChild?childId=${childID}`,
    refresh
  );

  const onClose = () => {
    setCloseDialogBurnOut((curr) => !curr);
  };

  let today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  console.log(mm + "-" + dd + "-" + yyyy);

  const values = {
    startTime: yyyy + "-" + mm + "-" + dd,
    endTime: "",
    childId: childID,
    reason: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      startTime: "",
      endTime: "",
      childId: childID,
      reason: "",
    },
    values,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ startTime: "", endTime: "", childId: childID, reason: "" });
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const dateStart = new Date(data.startTime);
    const dateEnd = new Date(data.endTime);

    if (dateStart > dateEnd) {
      alert("Ngày kết thúc không được nhỏ hơn ngày bắt đầu!");
    } else {
      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }
      callApiWithToken()
        .post(`CheckIn/postRequest`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success("Tạo thành công");
          onClose();
          setRefresh(true);
        })
        .catch((errors) => {
          toast.error("Có lỗi", errors);
        });
    }
  };

  const onSubmitDelete = (reqId: any) => {
    callApiWithToken()
      .delete(`CheckIn/undoRequest?reqID=${reqId}`)
      .then((response) => {
        toast.success("Đã huỷ");
        setRefresh(true);
      })
      .catch((errors) => {
        toast.error("Có lỗi", errors);
      });
  };

  setTimeout(() => {
    setRefresh(false);
  }, 2000);

  const DialogBurnOut = (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40 justify-center `}
    >
      <div className="bg-white p-4 rounded-xl md:w-1/3 mx-4 w-full h-fit">
        <div className="flex justify-between items-center mb-4 py-2 border-b">
          <div className="flex">
            <h3 className="text-2xl ">Xin nghỉ</h3>
          </div>
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
            id="startTime"
            type="date"
            label={"Ngày bắt đầu nghỉ"}
            register={register}
            errors={errors}
            onclick={() => {}}
            required
          />
          <Input
            id="endTime"
            type="date"
            label={"Ngày kết thúc nghỉ"}
            register={register}
            errors={errors}
            onclick={() => {}}
            required
          />
          <textarea
            id={`reason`}
            {...register(`reason`, {
              required: true,
            })}
            className="border-2 px-2 py-1 rounded-md focus:outline-main"
            placeholder="Lý do"
          />
        </div>

        <Button label="Gửi" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
  return (
    <div className="h-[88vh] bg-white w-full m-auto rounded-xl">
      <div className="relative overflow-x-auto  bg-white pt-2 sm:rounded-lg">
        {closeDialogBurnOut ? DialogBurnOut : ""}
        <div className="p-4">
          <p className="text-3xl flex justify-center items-center pb-4 border-b mb-4">
            Lịch sử xin nghỉ
          </p>
          <div className="flex justify-between items-center">
            <div>
              {/* <p className="text-xl">Họ tên: Nguyễn Văn A</p>
              <p className="text-xl">Lớp: Mầm 1</p> */}
            </div>
            <div className="mb-2">
              <Button
                label="Tạo đơn xin nghỉ"
                onClick={() => {
                  onClose();
                }}
              />
            </div>
          </div>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="">
                  <th scope="col" className="px-6 py-3">
                    Mã yêu cầu
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lý do
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {dataListBurnOutByChild?.map((item: any) => {
                  return (
                    <tr
                      key={item.reqId}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td
                        className={`px-6 py-4 ${
                          item.isActive ? "text-green-600" : "text-yellow-600"
                        } font-bold`}
                      >
                        {item.reqId}
                      </td>
                      <td className="px-6 py-4">
                        {item.startTime + " - " + item.endTime}
                      </td>
                      <td className="px-6 py-4">{item.reason}</td>
                      <td className="px-6 py-4">
                        {item.isActive ? (
                          <span className="text-green-600">Đã xem xét</span>
                        ) : (
                          <span className="text-yellow-600">Đã gửi</span>
                        )}
                      </td>
                      <td
                        className={`md:px-6 md:py-4 hover hover:text-rose-600  ${
                          !item.isActive
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        }`}
                        onClick={() => {
                          {
                            !item.isActive ? onSubmitDelete(item.reqId) : "";
                          }
                        }}
                      >
                        <MdCancelScheduleSend size={24} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex w-full justify-center items-center p-8">
            {dataListBurnOutByChild
              ? dataListBurnOutByChild.length <= 0
                ? "Chưa có đơn xin nghỉ nào"
                : null
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurnOutPage;
