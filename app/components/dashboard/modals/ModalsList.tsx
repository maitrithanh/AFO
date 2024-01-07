import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import toast from "react-hot-toast";
import Loading from "../../Loading";

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
    <Loading />;
    toast.success("Đăng xuất thành công");
    router.push("/login");
  };

  return (
    <div
      className={`absolute w-32 h-fit rounded-lg bg-white border shadow-lg
      ${
        borderTop
          ? expanded
            ? "-translate-y-14 translate-x-36"
            : "-translate-y-14 translate-x-1"
          : expanded
          ? "translate-y-14 -translate-x-20"
          : "translate-y-14 translate-x-10"
      }
    ${modalListOpen ? "visible" : "invisible"}
    `}
    >
      <ul>
        <li className="border-b p-1 hover:bg-gray-100 cursor-pointer">
          <button className="flex items-center justify-center">
            <CgProfile size={20} />
            <span className="ml-2"> Hồ sơ</span>
          </button>
        </li>
        <li className="p-1 hover:bg-gray-100 cursor-pointer">
          <button
            className="flex items-center justify-center"
            onClick={() => handleLogout()}
          >
            <IoIosLogOut size={20} />
            <span className="ml-2"> Đăng xuất</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ModalsList;
