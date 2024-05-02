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
import Swal from "sweetalert2";

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
          Swal.fire({
            title: t("toastUpdate"),
            icon: "success",
            confirmButtonText: "Đóng",
            confirmButtonColor: "#F8853E",
            showConfirmButton: false,
            timer: 1500,
          });
          onSuccess();
        })
        .catch((err) => {
          Swal.fire({
            title: err?.response?.data?.error || "Lỗi",
            icon: "error",
            confirmButtonText: "Đóng",
            confirmButtonColor: "#F8853E",
            // showConfirmButton: false,
            // timer: 1000,
          });
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
          Swal.fire({
            title: t("toastUpdate"),
            icon: "success",
            confirmButtonText: "Đóng",
            confirmButtonColor: "#F8853E",
            showConfirmButton: false,
            timer: 1000,
          });
          onSuccess();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "Lỗi");
        });
    }
  };

  return (
    <div className=" bg-white shadow-3xl  mx-auto">
      <div>
        <ChildrenPutForm
          data={dataChildren}
          setData={(x) => setDataChildren(x)}
          editable={true}
        />
      </div>

      <div className="flex items-center mt-2">
        <h5 className="text-2xl uppercase px-8">Thông tin người giám hộ</h5>
        <div className="mx-1 bg-white shadow-3xl flex items-center rounded-sm">
          <label className="inline-flex items-center cursor-pointer p-2">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={registerdParent}
              onChange={() => {
                setRegisterdParent((x) => !x);
              }}
            />
            <span className="text-sm font-medium mx-1 peer-checked:text-gray-500 border-main peer-checked:border-none border p-2 rounded-sm text-main">
              Chưa đăng ký
            </span>
            <span className="text-sm font-medium mx-1 text-gray-500 peer-checked:border-main peer-checked:border p-2 rounded-sm peer-checked:text-main">
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

      <div className="flex justify-center mt-10 p-4">
        <button
          className="text-white bg-main hover:bg-mainBlur focus:outline-none font-medium rounded-md text-lg w-full px-5 py-2.5 text-center "
          onClick={onSubmit}
        >
          Lưu hồ sơ
        </button>
      </div>
    </div>
  );
};

export default AddChildrenPage;
