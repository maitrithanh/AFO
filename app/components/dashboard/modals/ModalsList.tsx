"use client";
import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import toast from "react-hot-toast";
import Loading from "../../shared/Loading";
import { useTranslation } from "react-i18next";
import { IoSettingsOutline } from "react-icons/io5";
import { useGlobalContext } from "@/app/contexts/GlobalContext";

interface ModalsListProps {
  modalListOpen: boolean;
  expanded: boolean;
  borderTop?: boolean;
  setModalListOpen: any;
}

const ModalsList: React.FC<ModalsListProps> = ({
  modalListOpen,
  expanded,
  borderTop,
  setModalListOpen,
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const { refreshContactList } = useGlobalContext();

  const handleLogout = () => {
    if (pathName === "/") {
      location.reload();
    } else {
      router.push("/");
    }
    if (refreshContactList) refreshContactList();
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("child");
    <Loading />;
    toast.success("Đăng xuất thành công");
  };
  //Translate
  const { t } = useTranslation();
  return (
    <div
      className={`absolute w-48 h-fit rounded-lg bg-white border shadow-lg z-30
      -top-3
      ${
        borderTop
          ? expanded
            ? "-translate-y-14 translate-x-36"
            : "-translate-y-14 translate-x-1"
          : expanded
          ? "translate-y-16 right-0"
          : "translate-y-14 translate-x-10"
      }
    ${modalListOpen ? "visible" : "invisible"}
    `}
    >
      <ul
        className=""
        onClick={() => {
          setModalListOpen(false);
        }}
      >
        <li className="border-b p-2 px-4 hover:bg-gray-100 cursor-pointer">
          <button
            className="w-full flex items-center justify-left"
            onClick={() => router.push("/profile")}
          >
            <CgProfile size={20} />
            <span className="ml-2"> {t("profile")}</span>
          </button>
        </li>
        <li className="border-b p-2 px-4 hover:bg-gray-100 cursor-pointer">
          <button
            className="w-full flex items-center justify-left"
            onClick={() => router.push("/admin/settings")}
          >
            <IoSettingsOutline size={20} />
            <span className="ml-2"> {t("setting")}</span>
          </button>
        </li>
        <li className="p-2 px-4 hover:bg-gray-100 cursor-pointer">
          <button
            className="w-full flex items-center justify-left"
            onClick={() => handleLogout()}
          >
            <IoIosLogOut size={20} />
            <span className="ml-2"> {t("logout")}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ModalsList;
