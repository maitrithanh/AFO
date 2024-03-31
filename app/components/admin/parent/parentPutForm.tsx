"use client";

import AddParentReq from "@/types/AddParentReq";
import { toYMD } from "@/utils/dateTime";
import { ChangeEvent } from "react";

interface Props {
  data?: AddParentReq;
  setData: (data: AddParentReq) => void;
  editable: boolean;
}

const ParentPutForm = ({ data, setData, editable }: Props) => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  return (
    <>
      <form>
        <div className="flex justify-center items-center">
          <div className="w-full rounded-md px-8">
            <div className="flex gap-4">
              <div className="w-full">
                <div className="flex items-center gap-4">
                  <div className="w-full my-2">
                    <label htmlFor="FullName" className="text-lg">
                      Họ tên người giám hộ
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
                          id="Gender-male"
                          type="radio"
                          radioGroup="gender-parent"
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
                          id="Gender-female"
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
                </div>

                <div className="flex gap-4">
                  <div className="w-full my-2">
                    <label htmlFor="national" className="text-lg">
                      Số điện thoại
                      <span className={`text-rose-600 `}>*</span>
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="PhoneNumber"
                      className={`border p-3 block rounded-md w-full focus-visible:border-main focus-visible:outline-none border-slate-300`}
                      placeholder="Số điện thoại"
                      required
                      onChange={onInputChange}
                      value={data?.phoneNumber}
                      disabled={!editable}
                    />
                  </div>
                  <div className="w-full my-2">
                    <label htmlFor="national" className="text-lg">
                      Căn cước công dân
                      <span className={`text-rose-600 `}>*</span>
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      id="IDNumber"
                      className={`border p-3 block rounded-md w-full focus-visible:border-main focus-visible:outline-none border-slate-300`}
                      placeholder="Số căn cước công dân"
                      required
                      onChange={onInputChange}
                      value={data?.idNumber}
                      disabled={!editable}
                    />
                  </div>
                  <div className="w-full my-2">
                    <label htmlFor="national" className="text-lg">
                      Nghề nghiệp
                      <span className={`text-rose-600 `}>*</span>
                    </label>
                    <input
                      type="text"
                      name="job"
                      id="Job"
                      className={`border p-3 block rounded-md w-full focus-visible:border-main focus-visible:outline-none border-slate-300`}
                      placeholder="Nghề nghiệp"
                      required
                      onChange={onInputChange}
                      value={data?.job}
                      disabled={!editable}
                    />
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
                <div className="p-2 mt-8">
                  <p>Lưu ý:</p>
                  <div className="text-rose-600 italic">
                    <p>
                      Số điện thoại phải đủ 10 số.<sup>*</sup>
                    </p>
                    <p>
                      CCCD (Căn cước công dân) phải đủ 12 số. <sup>*</sup>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* *** */}
          </div>
        </div>
      </form>
    </>
  );
};

export default ParentPutForm;
