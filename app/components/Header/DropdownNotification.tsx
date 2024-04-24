"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { getCookie } from "cookies-next";
import useFetch from "@/utils/useFetch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [phoneNumberCurrentUser, setPhoneNumberCurrentUser] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [idNotiDetail, setIdNotiDetail] = useState("");
  const [refresh, setRefresh] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const role = getCookie("role");
  const router = useRouter();

  const handleRefresh = () => {
    setRefresh(true);
    if (refresh) {
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  };

  //xử lý đọc detail thông báo
  const handleReadDetail = (id: string) => {
    setOpenDialog(true);
    setIdNotiDetail(id);
    handleRefresh();
  };
  //fetch data
  const { data: userCurrentInfo } = useFetch(`Auth/current`);

  useEffect(() => {
    if (userCurrentInfo) {
      if (role == "Admin") {
        setPhoneNumberCurrentUser("admin");
      } else setPhoneNumberCurrentUser(userCurrentInfo?.phoneNumber);
    }
  }, [userCurrentInfo, role]);
  //noti data
  const { data: notiData } = useFetch(
    `Notification/getNotiByPhoneNumber?phoneNumber=${phoneNumberCurrentUser}`,
    refresh
  );
  const { data: detailNoti } = useFetch(
    `Notification/getDetailNotification?id=${idNotiDetail}`
  );

  const ringNoti = notiData?.filter((x: any) => x.viewed == false);

  useEffect(() => {
    if (ringNoti?.length > 0) {
      setNotifying(true);
    }
  }, [ringNoti]);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const { t } = useTranslation();
  return (
    <div>
      <div className="relative">
        <AlertDialog
          onOpenChange={() => {
            setOpenDialog((curr) => !curr);
          }}
          open={openDialog}
        >
          <AlertDialogContent className="p-0 m-0 border-none">
            <AlertDialogHeader>
              <AlertDialogTitle className="border-b">
                <p className="text-2xl leading-2 text-white bg-main text-justify p-4 rounded-es-none rounded-ee-none rounded-md">
                  {detailNoti?.title}
                </p>
                {/* <span className="text-sm italic font-thin text-gray-600 leading-[1px]">
                  {detailNoti?.sendTime}
                </span> */}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-black text-xl text-justify px-4 leading-2 max-h-96 overflow-auto">
                {detailNoti?.content}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="px-4 pb-4">
              <AlertDialogCancel className="bg-rose-600 hover:bg-rose-900 text-white hover:text-white">
                Đóng
              </AlertDialogCancel>
              {role == "Admin" && detailNoti?.title.includes("xin nghỉ") ? (
                <AlertDialogAction
                  className="bg-orange-600 hover:bg-orange-900"
                  onClick={() => {
                    router.push("/admin/burnout");
                  }}
                >
                  Danh sách xin nghỉ
                </AlertDialogAction>
              ) : null}
              {role == "Admin" && detailNoti?.title.includes("chuyển lớp") ? (
                <AlertDialogAction
                  className="bg-orange-600 hover:bg-orange-900"
                  onClick={() => {
                    router.push("/admin/change-class");
                  }}
                >
                  Danh sách xin chuyển lớp
                </AlertDialogAction>
              ) : null}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div>
          <Link
            ref={trigger}
            onClick={() => {
              setNotifying(false);
              setDropdownOpen(!dropdownOpen);
            }}
            href="#"
            className="p-2 flex h-8.5 w-8.5 items-center justify-center rounded-full group bg-[#ffffff50] hover:text-primary shadow-sm"
          >
            <span
              className={`absolute top-0 right-0 bg-main z-1 h-2 w-2 rounded-full bg-meta-1 ${
                notifying === false ? "hidden" : "inline"
              }`}
            >
              <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
            </span>
            <span
              className={` ${
                role == "Admin" ? "text-[#6b7280]" : "text-white"
              } hover:text-main hover:scale-110 transition-all`}
            >
              <IoNotifications size={24} />
            </span>
          </Link>
        </div>
        <div
          className={`absolute shadow-3xl border p-4 bg-white md:-translate-x-80 cursor-pointer -translate-x-64 z-50 md:w-[400px] w-[350px] rounded-md ${
            dropdownOpen === true
              ? "bg-[#18181875] opacity-100"
              : "w-0 -translate-x-full hidden"
          }`}
        >
          <div className="flex justify-between ">
            <p className="text-xl pb-2">Thông báo</p>
            <span
              className="text-rose-700 cursor-pointer"
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <IoClose size={30} />
            </span>
          </div>
          {notiData?.length <= 0 ? (
            <div className="w-full flex justify-center items-center p-8">
              Không có thông báo
            </div>
          ) : null}
          <ul className="flex flex-col overflow-y-auto max-h-[600px]">
            {notiData
              ?.map((notiData: any) => {
                return (
                  <li
                    key={notiData.id}
                    className="hover:bg-gray-100 border-b"
                    onClick={() => {
                      handleReadDetail(notiData.id);
                    }}
                  >
                    <div className=" text-lg relative flex justify-between items-center mx-4 text-left p-2  my-1 rounded-lg gap-1 py-2 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 ">
                      <div>
                        <div>
                          <p className="font-semibold text-black ">
                            {notiData.title}
                          </p>
                          <span className="font-thin text-sm">
                            {notiData.content}
                          </span>
                        </div>
                        {/* <p className="text-sm">{notiData.content}</p> */}

                        <p className="text-xs italic text-gray-500">
                          {notiData.sendTime}
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        {notiData.viewed ? (
                          <span className={` right-0 inline text-sm`}>
                            Đã xem
                          </span>
                        ) : (
                          <span
                            className={` right-0 bg-main z-1 h-3 w-3 rounded-full bg-meta-1 ${
                              notifying === false ? "block" : "inline"
                            }`}
                          >
                            <span className=" -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })
              .reverse()}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownNotification;
