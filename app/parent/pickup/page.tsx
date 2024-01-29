"use client";
import DefaultImage from "@/app/components/defaultImage";
import AddPickUpDialog from "@/app/components/table/AddPickUpDialog";
import useFetch from "@/utils/useFetch";
import Image from "next/image";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const PickupPage = () => {
  const { data: pickup } = useFetch("Parent/PickupList");
  const [openAddPickUp, setAddPickUp] = useState(false);

  const handleDeletePickUp = (id: any) => {
    console.log(id);
  };

  return (
    <div>
      <div
        className="absolute bg-white w-fit p-2 rounded-full bottom-4 right-6 cursor-pointer hover:opacity-80 z-30 shadow-lg"
        onClick={() => {
          setAddPickUp(true);
        }}
      >
        <Image src={"/icons/add-user.webp"} width={34} height={34} alt="" />
      </div>
      {openAddPickUp ? (
        <AddPickUpDialog
          onClose={() => {
            setAddPickUp(false);
          }}
        />
      ) : null}

      <div className="relative overflow-x-auto rounded-md md:mx-[200px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                Họ tên
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Địa chỉ
              </th>
              <th scope="col" className="px-6 py-3">
                Ghi chú
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3 flex justify-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {pickup?.map((item: any) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <DefaultImage img={item?.avatar} fallback="/avatar.webp" />
                  </th>
                  <td className="px-6 py-4">{item?.fullName}</td>
                  <td className="px-6 py-4">{item?.phoneNumber}</td>
                  <td className="px-6 py-4">{item?.address}</td>
                  <td className="px-6 py-4">{item?.note}</td>
                  {item?.status ? (
                    <td className="px-6 py-4 text-green-500">Hoạt động </td>
                  ) : (
                    "Không hoạt động"
                  )}
                  <td className="px-6 py-4 flex justify-center">
                    <button className="text-yellow-500 hover:bg-[#d2d1d17d] p-1 rounded-full">
                      Sửa
                    </button>
                    <button
                      className="text-rose-600 hover:bg-[#d2d1d17d] p-1 rounded-full"
                      onClick={() => {
                        handleDeletePickUp(item?.id);
                      }}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PickupPage;
