"use client";

import AddChildReq from "@/types/AddChildReq";
import DetailChildReq from "@/types/DetailChildReq";
import { toYMD } from "@/utils/dateTime";
import { ChangeEvent } from "react";
import DefaultImage from "../../shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import Image from "next/image";
import BackAction from "../BackAction";
import { Asap_Condensed } from "next/font/google";

const font_asap_condensed = Asap_Condensed({
  weight: "600", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});
interface Props {
  data?: DetailChildReq;
  setData: (data: DetailChildReq) => void;
  editable: boolean;
}

const ChildrenPutForm = ({ data, setData, editable }: Props) => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  console.log(data);

  return (
    <>
      <form>
        <div className="flex justify-center items-center">
          <div className="w-full py-10 bg-white rounded-md p-8">
            <div
              className={`flex justify-center items-center mb-4 ${font_asap_condensed.className}`}
            >
              <h1 className="text-3xl uppercase flex items-center">Thêm trẻ</h1>
            </div>
            <h5 className="text-2xl uppercase">Thông tin trẻ</h5>

            <div className="flex gap-4">
              <div className="w-full">
                <div className="flex items-center gap-4">
                  <div className="w-full my-2">
                    <label htmlFor="FullName" className="text-lg">
                      Họ tên trẻ
                      <span className={`text-rose-600 `}>*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="FullName"
                      className={`border p-3 block rounded-md w-full focus-visible:border-main focus-visible:outline-none border-slate-300`}
                      placeholder="Họ và tên"
                      onChange={onInputChange}
                      value={data?.fullName}
                      disabled={!editable}
                    />
                  </div>

                  <div id="Gender" className="w-fit">
                    <label htmlFor="Gender" className={`text-lg `}>
                      Giới tính
                      <span className={`text-rose-600`}>*</span>
                    </label>
                    <div className={`flex border  p-2.5 rounded-md `}>
                      <div className="flex items-center rounded-full ">
                        <input
                          id="Gender-male-c"
                          type="radio"
                          radioGroup="gender-children"
                          value="1"
                          name="gender"
                          className={`w-4 h-4 text-orange-600 bg-gray-100  focus:ring-orange-500 rounded-full scale-125 `}
                          onChange={onInputChange}
                          checked={data?.gender == 1}
                          disabled={!editable}
                        />
                        <label
                          htmlFor="Gender-male-c"
                          className="w-full ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          Nam
                        </label>
                      </div>
                      <div
                        className={`flex items-center ps-4 rounded-full dark:border-gray-700`}
                      >
                        <input
                          id="Gender-female-c"
                          type="radio"
                          radioGroup="gender-children"
                          value="0"
                          name="gender"
                          className={`w-4 h-4 text-orange-600 bg-gray-100  focus:ring-orange-500 rounded-full scale-125 `}
                          onChange={onInputChange}
                          checked={!data || data.gender != 1}
                          disabled={!editable}
                        />
                        <label
                          htmlFor="Gender-female-c"
                          className="w-full ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          Nữ
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-full my-2">
                    <label htmlFor="birthDay" className="text-lg">
                      Ngày sinh
                      <span className={`text-rose-600 `}>*</span>
                    </label>
                    <input
                      type="date"
                      name="birthDay"
                      id="BirthDay"
                      className={`border p-3 block rounded-md w-full focus-visible:border-main focus-visible:outline-none border-slate-300`}
                      placeholder=""
                      onChange={onInputChange}
                      value={toYMD(data?.birthDay || "")}
                      disabled={!editable}
                    />
                  </div>
                  <div className="w-full my-2">
                    <label htmlFor="national" className="text-lg">
                      Quốc tịch
                      <span className={`text-rose-600 `}>*</span>
                    </label>
                    <input
                      type="text"
                      name="nation"
                      id="Nation"
                      list="nationList"
                      className={`border p-3 block rounded-md w-full focus-visible:border-main focus-visible:outline-none border-slate-300`}
                      placeholder="Quốc tịch"
                      onChange={onInputChange}
                      value={data?.nation}
                      disabled={!editable}
                      required
                    />
                    <datalist id="nationList">
                      <option value="Việt Nam" />
                      <option value="American" />
                    </datalist>
                  </div>
                </div>

                <div className="my-4">
                  <div className="w-full my-2">
                    <label htmlFor="birthDay" className="text-lg">
                      Địa chỉ
                      <span className={`text-rose-600 `}>*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="Address"
                      className={`border p-3 block rounded-md w-full focus-visible:border-main focus-visible:outline-none border-slate-300`}
                      placeholder="Địa chỉ"
                      required
                      onChange={onInputChange}
                      value={data?.address}
                      disabled={!editable}
                    />
                  </div>
                </div>
                <div className="my-4">
                  {/* Ghi chú */}
                  <label htmlFor="Note" className="text-lg">
                    Ghi chú
                  </label>
                  <input
                    type="text"
                    name="note"
                    id="Note"
                    className="border p-3 block rounded-sm w-full focus-visible:border-main focus-visible:outline-none"
                    placeholder="Ghi chú"
                    required
                    onChange={onInputChange}
                    value={data?.note}
                    disabled={!editable}
                  />
                </div>
              </div>

              <div className="w-1/3">
                <label htmlFor="" className="text-lg">
                  Hình 3x4 <span className={`text-rose-600`}>*</span>
                </label>
                <div className="rounded-md shadow-3xl mr-5 border">
                  <div className="flex gap-4 p-4 justify-center items-center">
                    <div className="relative border rounded-sm w-[105px] h-[135px]">
                      <Image
                        src={"/image3x4-template2.webp"}
                        alt="Hình 3x4"
                        width={105}
                        height={135}
                        className="rounded-sm w-[105px] h-[135px]"
                      />
                      <span className="absolute bottom-0 w-full flex justify-center">
                        Ảnh mẫu
                      </span>
                    </div>
                    <div className="border rounded-sm">
                      <label htmlFor="avatar" title="Hình ảnh">
                        {data?.avatarFile ? (
                          <span className="cursor-pointer relative">
                            <Image
                              src={URL.createObjectURL(data.avatarFile)}
                              alt="Hình 3x4"
                              width={105}
                              height={135}
                              className="w-[105px] h-[135px] rounded-sm"
                            />
                            <span className="absolute bottom-0 text-white w-full flex justify-center bg-main">
                              Đổi ảnh
                            </span>
                          </span>
                        ) : (
                          <span className="cursor-pointer relative">
                            <Image
                              src={"/user-default.webp"}
                              alt="Hình 3x4"
                              width={105}
                              height={135}
                              className="min-w-[105px] min-h-[135px] rounded-sm"
                            />
                            <span className="absolute bottom-0 text-white w-full flex justify-center bg-main">
                              Tải lên
                            </span>
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    title="Chọn hình"
                    onChange={(e) =>
                      setData({ ...data, avatarFile: e.target.files![0] })
                    }
                    disabled={!editable}
                  />
                </div>

                {/* <div className="p-2 mt-8">
                  <p>Lưu ý:</p>
                  <div className="text-rose-600 italic">
                    <p>
                      Số điện thoại phải đủ 10 số.<sup>*</sup>
                    </p>
                    <p>
                      CCCD (Căn cước công dân) phải đủ 12 số. <sup>*</sup>{" "}
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* *** */}
          </div>
        </div>
      </form>
    </>
  );
};

export default ChildrenPutForm;
