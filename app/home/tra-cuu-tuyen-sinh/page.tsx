"use client";
import { searchEnroll } from "@/utils/handleAPI";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const TraCuuTuyenSinhPage = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState<any>([]);

  const handleSearch = () => {
    searchEnroll(search, setDataSearch);
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center w-full bg-[url(/banner-homepage.webp)] bg-no-repeat bg-cover">
      <div className="flex justify-center items-center w-full">
        <div className="w-full h-full mx-96">
          <h1 className="text-3xl font-bold w-full flex justify-center items-center p-4 text-main">
            Tra cứu tuyển sinh
          </h1>

          <div className="bg-white w-full flex p-4 rounded-xl gap-4 drop-shadow-xl">
            <input
              className="w-full bg-[#f5f6f9] p-4 rounded-lg border-none outline-none text-lg"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nhập số điện thoại để tra cứu"
            />
            <button
              onClick={() => handleSearch()}
              className="bg-main w-[200px] rounded-md font-bold text-xl text-white hover:bg-mainBlur"
            >
              Tra cứu
            </button>
          </div>
          {dataSearch?.map((item: any) => {
            return (
              <div
                key={item._id}
                className="my-6 bg-white p-4 rounded-lg shadow-3xl"
              >
                <div>
                  <p className="text-3xl font-semibold flex justify-between items-center">
                    Mã đăng ký: {item._id}
                    <span
                      className={`${
                        item.status ? "bg-green-500" : "bg-main"
                      } text-white px-2 rounded-full font-thin text-lg`}
                    >
                      {item.status ? "Đã liên hệ" : "Chưa liên hệ"}
                    </span>
                  </p>
                </div>
                <div className="text-xl">
                  <p>Số điện thoại: {item.phoneNumber}</p>
                  <p>Họ tên trẻ: {item.fullNameChild}</p>
                  <p>Khối lớp: {item.level}</p>
                </div>
              </div>
            );
          })}

          {dataSearch.length > 0 ? null : (
            <div className="flex justify-center items-center">
              <Image
                src={"/search3d.webp"}
                width={200}
                height={200}
                alt="Không có kết quả tìm kiếm"
              />
              <p className="text-xl font-thin">
                Nhập số điện thoại và nhấn tra cứu để tìm kiếm
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraCuuTuyenSinhPage;
