"use client";

import ChildrenPutForm from "@/app/components/admin/children/putForm";
import ParentPutForm from "@/app/components/admin/parent/parentPutForm";
import SelectParent from "@/app/components/admin/parent/selectParent";
import AddParentReq from "@/types/AddParentReq";
import DetailChildReq from "@/types/DetailChildReq";
import { callApiWithToken } from "@/utils/callApi";
import { t } from "i18next";
import { useState } from "react";
import toast from "react-hot-toast";

const AddChildrenPage = () => {
  const initChild = {
    fullName: "",
    birthDay: "",
    nation: "Việt Nam",
    gender: 0,
    address: "",
    note: "",
    avatarFile: null,
    avatar: "",
  };

  const initParent = {
    fullName: "",
    phoneNumber: "",
    gender: 0,
    address: "",
    birthDay: "",
    idNumber: "",
    job: "",
    note: "",
  };

  const [dataChildren, setDataChildren] = useState<DetailChildReq>(initChild);
  const [dataParent, setDataParent] = useState<AddParentReq>(initParent);
  const [registerdParent, setRegisterdParent] = useState(false);
  const [selectParent, setSelectParent] = useState("");

  const onSubmit = () => {
    let formData = new FormData();

    var pre = registerdParent ? "" : "child.";

    //append child
    for (const [propName, propValue] of Object.entries(dataChildren)) {
      const fullKey = `${pre}${propName}`;
      formData.append(fullKey, propValue);
    }

    const onSuccess = () => {
      setDataChildren(initChild);
      setDataParent(initParent);
      setRegisterdParent(false);
    };

    if (!registerdParent) {
      //append parent
      for (const [propName, propValue] of Object.entries(dataParent)) {
        const fullKey = `${"parent"}.${propName}`;
        formData.append(fullKey, propValue);
      }

      callApiWithToken()
        .post("child/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Specify content type
          },
        })
        .then((res) => {
          toast.success(t("toastUpdate"));
          onSuccess();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "Lỗi");
        });
    } else {
      if (!selectParent) {
        toast.error("Chưa chọn phụ huynh");
        return;
      }

      callApiWithToken()
        .post("child/addToParent/" + selectParent, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Specify content type
          },
        })
        .then((res) => {
          toast.success(t("toastUpdate"));
          onSuccess();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "Lỗi");
        });
    }
  };

  return (
    <div className="w-[60%] mx-auto">
      <h2 className="font-bold text-xl mb-3">Thông tin trẻ</h2>
      <div>
        <ChildrenPutForm
          data={dataChildren}
          setData={(x) => setDataChildren(x)}
          editable={true}
        />
      </div>

      <div className="flex justify-between mt-[20px]">
        <h2 className="font-bold text-xl mb-3">Thông tin người giám hộ</h2>
        
        <div>
          <div className="font-bold mb-2">Trạng thái người giám hộ</div>
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={registerdParent}
              onChange={() => {
                setRegisterdParent((x) => !x);
              }}
            />
            <span className="text-sm font-medium  peer-checked:text-gray-500 text-green-600">
              Mới
            </span>
            <div className="relative w-11 h-6 bg-green-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 mx-3"></div>
            <span className="text-sm font-medium text-gray-500 peer-checked:text-blue-600">
              Đã đăng ký
            </span>
          </label>
        </div>
      </div>
      {registerdParent ? (
        <div>
          <SelectParent
            selectId={selectParent}
            setSelectId={(x) => setSelectParent(x)}
          />
        </div>
      ) : (
        <div>
          <ParentPutForm
            data={dataParent}
            setData={(x) => setDataParent(x)}
            editable={true}
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onSubmit}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default AddChildrenPage;
