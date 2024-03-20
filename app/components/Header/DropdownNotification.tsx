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

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [phoneNumberCurrentUser, setPhoneNumberCurrentUser] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [idNotiDetail, setIdNotiDetail] = useState("");
  const [refresh, setRefresh] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const role = getCookie("role");

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
      setPhoneNumberCurrentUser(userCurrentInfo?.phoneNumber);
    }
  }, [userCurrentInfo]);
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
      </div>
      <div
        className={`fixed w-screen h-screen right-0 opacity-0 top-0 z-50 transition-all duration-300 ${
          dropdownOpen === true
            ? "bg-[#18181875] opacity-100"
            : "w-0 -translate-x-full"
        }`}
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className={`bg-white absolute md:w-[400px] transition-all duration-500 md:right-0 top-0 inset-0 left-0 h-screen z-50 hover:cursor-pointer overflow-hidden `}
        >
          <div className="w-full flex justify-between items-center py-1 border-b">
            <div className="px-4.5 py-2 flex justify-center">
              <h5 className="px-2 text-2xl flex justify-center items-center w-fit rounded-full text-cool">
                {t("notification")}
              </h5>
            </div>
            <div
              className="bg-white p-1 rounded-md text-rose-600"
              onClick={() => {
                setDropdownOpen(false);
              }}
            >
              <IoClose size={28} />
            </div>
          </div>

          <ul className="flex flex-col overflow-y-auto h-[90%]">
            {notiData?.map((notiData: any) => {
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
                      <p className="font-semibold text-gray-500 ">
                        {notiData.title}
                      </p>
                      {/* <p className="text-sm">{notiData.content}</p> */}

                      <p className="text-xs italic text-gray-500">
                        {notiData.sendTime}
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      {notiData.viewed ? null : (
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
            })}
          </ul>
          <div className="w-full justify-center items-center p-8">
            {!notiData ? "Không có thông báo" : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownNotification;
