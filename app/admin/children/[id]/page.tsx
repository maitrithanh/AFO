"use client";

import ChildrenPutForm from "@/app/components/admin/children/putForm";
import ParentPutForm from "@/app/components/admin/parent/parentPutForm";
import AddParentReq from "@/types/AddParentReq";
import DetailChildReq from "@/types/DetailChildReq";
import { callApiWithToken } from "@/utils/callApi";
import { toDMY } from "@/utils/dateTime";
import getFormData from "@/utils/getFormData";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DetailChildrenPage = ({ params }: any) => {
  const id = params.id;
  const { data: dataChildren } = useFetch<DetailChildReq>(
    "Child/getChild?id=" + id,
    null,
    id
  );

  const [child, setChild] = useState<DetailChildReq | null>(null);
  const [parent, setParent] = useState<AddParentReq | null>(null);
  const [editChild, setEditChild] = useState(false);
  const [editParent, setEditParent] = useState(false);

  useEffect(() => {
    setChild(dataChildren);
    const dataParent = dataChildren?.parent ?? null;
    console.log("parent", dataParent);
    setParent(dataParent);
  }, [dataChildren]);

  console.log(dataChildren);

  const onSubmit = () => {
    const onSuccess = () => {};

    if (editChild) {
      var _child: DetailChildReq = { ...child, address: child?.encodedAddress };

      let formData = getFormData(_child);
      callApiWithToken()
        .put("child/update/" + id, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Specify content type
          },
        })
        .then((res) => {
          toast.success("Cập nhật trẻ thành công");
          onSuccess();
        })
        .catch((err) => {
          toast.error("Cập nhật trẻ thất bại");
        });
    }

    if (editParent) {
      const data: AddParentReq = {
        ...parent,
        birthDay: toDMY(parent?.birthDay || ""),
        address: parent?.encodedAddress,
      };
      callApiWithToken()
        .put("parent/updateParent/" + parent?.id, data)
        .then((res) => {
          toast.success("Cập nhật người giám hộ thành công");
          onSuccess();
        })
        .catch((err) => {
          toast.error("Cập nhật người giám hộ thất bại");
        });
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between ">
        <h2 className="font-bold text-xl mb-3">Thông tin trẻ: </h2>
        <label className="inline-flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={editChild}
            onChange={() => {
              setEditChild((x) => !x);
            }}
          />
          <span className="text-sm font-medium  peer-checked:text-main text-gray-500">
            Chỉnh sửa
          </span>
          <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-main mx-3"></div>
        </label>
      </div>

      <div>
        {child && (
          <ChildrenPutForm
            editMode
            data={child}
            setData={(x) => setChild(x)}
            editable={editChild}
          />
        )}
      </div>

      <div className="flex justify-between mt-[20px]">
        <h2 className="font-bold text-xl mb-3">Thông tin người giám hộ: </h2>
        <label className="inline-flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={editParent}
            onChange={() => {
              setEditParent((x) => !x);
            }}
          />
          <span className="text-sm font-medium  peer-checked:text-main text-gray-500">
            Chỉnh sửa
          </span>
          <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-main mx-3"></div>
        </label>
      </div>
      <div className="bg-white">
        {parent && (
          <ParentPutForm
            data={parent}
            setData={(x) => setParent(x)}
            editable={editParent}
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          className={`text-white bg-main hover:bg-mainBlur focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
            !editChild && !editParent ? "hidden" : ""
          }`}
          onClick={onSubmit}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default DetailChildrenPage;
