import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import toast from "react-hot-toast";
import Loading from "../../shared/Loading";
import { useTranslation } from "react-i18next";

interface ModalsListProps {
  modalListOpen: boolean;
  expanded: boolean;
  borderTop?: boolean;
}

const ModalsList: React.FC<ModalsListProps> = ({
  modalListOpen,
  expanded,
  borderTop,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("child");
    <Loading />;
    toast.success("Đăng xuất thành công");
    router.push("/");
  };
  //Translate
  const { t } = useTranslation();
  return (
    <div
      className={`absolute w-36 h-fit rounded-lg bg-white border shadow-lg z-30
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
      <ul className="p-2">
        <li className="border-b p-1 hover:bg-gray-100 cursor-pointer">
          <button
            className="w-full flex items-center justify-left"
            onClick={() => router.push("/profile")}
          >
            <CgProfile size={20} />
            <span className="ml-2"> {t("profile")}</span>
          </button>
        </li>
        <li className="p-1 hover:bg-gray-100 cursor-pointer">
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
