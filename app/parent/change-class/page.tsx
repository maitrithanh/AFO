"use client";
import Input from "@/app/components/inputs/input";
import SelectOption from "@/app/components/inputs/selectOption";
import Button from "@/app/components/shared/Button";
import { callApiWithToken } from "@/utils/callApi";
import useFetch from "@/utils/useFetch";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const ChangeClassPage = () => {
  const [closeDialogBurnOut, setCloseDialogBurnOut] = useState(false);
  const childID = getCookie("child");
  const [refresh, setRefresh] = useState(false);
  const { data: dataListChangeClassByChild } = useFetch(
    `ChangeClass/getRequestByChild?childId=${childID}`,
    refresh
  );

  const { data: infoChild } = useFetch(`Child/getChild?id=${childID}`);
  const { data: getGrade } = useFetch(`ClassRoom/getGrade?childID=${childID}`);

  const onClose = () => {
    setCloseDialogBurnOut((curr) => !curr);
  };

  const values = {
    Title: "Đơn xin chuyển lớp",
    ChildID: childID,
    OldClass: infoChild?.classRoom?.classID,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      Title: "Đơn xin chuyển lớp",
      ChildID: childID,
      Content: "",
      OldClass: infoChild?.classRoom?.classID,
      NewClass: "",
    },
    values,
  });

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset({
  //       Title: "Đơn xin chuyển lớp",
  //       ChildID: childID,
  //       Content: "",
  //       OldClass: "",
  //       NewClass: "",
  //     });
  //   }
  // }, [isSubmitSuccessful, reset, childID]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (
      dataListChangeClassByChild?.filter((x: any) => x.active == false).length >
      0
    ) {
      onClose();
      alert("Bạn đã đăng ký đơn xin chuyển! Vui lòng chờ duyệt.");
    } else {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      callApiWithToken()
        .post(`ChangeClass/sendRequest`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success("Xin chuyển lớp thành công");
          handleSendNotiChangeClass();
          onClose();
          setRefresh(true);
        })
        .catch((errors) => {
          toast.error("Có lỗi", errors);
        });
    }
  };

  const handleSendNotiChangeClass = () => {
    callApiWithToken()
      .post(
        `Notification/sendUser`,
        {
          PhoneNumber: "admin",
          Title: `${infoChild?.fullName} xin chuyển lớp`,
          Content: `Học sinh ${infoChild?.fullName} xin chuyển lớp`,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {})
      .catch((errors) => {
        toast.error("Có lỗi", errors);
      });
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
            <h3 className="text-2xl ">Xin chuyển lớp</h3>
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
            id="Title"
            label={"Tiêu đề"}
            register={register}
            errors={errors}
            onclick={() => {}}
            readonly
            required
          />
          <div className="relative h-full w-full">
            <div className="outline-none text-xl border-slate-300 border-2 rounded-md w-full h-full p-4">
              {infoChild?.classRoom?.className}
            </div>
            <div className="text-gray-500 bg-white h-fit absolute top-0 left-2 -translate-y-3">
              Lớp hiện tại
            </div>
          </div>

          {/* <SelectOption
            id="OldClass"
            register={register}
            label="Lớp hiện tại"
            option={[
              {
                value: infoChild?.classRoom?.classID,
                name: infoChild?.classRoom?.className,
              },
            ]}
          /> */}

          <SelectOption
            id="NewClass"
            register={register}
            label="Lớp muốn chuyển"
            option={getGrade?.map((x: any) => {
              if (x.classID == infoChild?.classRoom?.classID) {
                return {
                  value: null,
                  name: null,
                };
              } else {
                return {
                  value: x.classID,
                  name: x.className,
                };
              }
            })}
          />

          <textarea
            id={`Content`}
            {...register(`Content`, {
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
            Lịch sử xin chuyển lớp
          </p>
          <div className="flex justify-between items-center">
            <div>
              {/* <p className="text-xl">Họ tên: Nguyễn Văn A</p>
              <p className="text-xl">Lớp: Mầm 1</p> */}
            </div>
            <div className="mb-2">
              <Button
                label="Tạo đơn xin chuyển lớp"
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
                    Họ tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lớp cũ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lớp mới
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lý do
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                  {/* <th scope="col" className="px-6 py-3"></th> */}
                </tr>
              </thead>
              <tbody>
                {dataListChangeClassByChild?.map((item: any) => {
                  return (
                    <tr
                      key={item.reqId}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td
                        className={`px-6 py-4 ${
                          item.active ? "text-green-600" : "text-yellow-600"
                        } font-bold`}
                      >
                        {item.reqId}
                      </td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">{item.childName}</td>
                      <td className="px-6 py-4">{item.oldClassName}</td>
                      <td className="px-6 py-4">{item.newClassName}</td>
                      <td className="px-6 py-4">{item.content}</td>
                      <td className="px-6 py-4">
                        {item.active ? (
                          <span className="text-green-600">Đã xem xét</span>
                        ) : (
                          <span className="text-yellow-600">Đã gửi</span>
                        )}
                      </td>
                      {/* <td
                        className={`md:px-6 md:py-4 hover hover:text-rose-600  ${
                          !item.active ? "cursor-pointer" : "cursor-not-allowed"
                        }`}
                        onClick={() => {
                          {
                            !item.isActive ? onSubmitDelete(item.reqId) : "";
                          }
                        }}
                      >
                        <MdCancelScheduleSend size={24} />
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex w-full justify-center items-center p-8">
            {dataListChangeClassByChild
              ? dataListChangeClassByChild.length <= 0
                ? "Chưa có đơn xin chuyển lớp nào"
                : null
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeClassPage;
