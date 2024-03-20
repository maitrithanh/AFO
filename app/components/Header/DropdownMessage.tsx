"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "@/app/contexts/GlobalContext";
import DefaultImage from "../shared/defaultImage";
import ContactList from "@/app/components/contact/contactList";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { IoChatbox } from "react-icons/io5";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);

  const { contactList, selectChat } = useGlobalContext();
  const router = useRouter();
  const role = getCookie("role");

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  //notif
  useEffect(() => {
    var flag = contactList?.find((x) => x.newMessage);
    setNotifying(flag !== undefined);
  }, [contactList]);

  // close on click outside
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
    <>
      <div className="relative">
        <Link
          ref={trigger}
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative p-2 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#ffffff50] group shadow-sm"
        >
          <span
            className={`absolute -top-0.5 right-0 bg-rose-600 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? "hidden" : "inline"
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
          <span
            className={` ${
              role === "Admin" ? "text-[#6b7280]" : "text-white"
            } hover:text-main hover:scale-110 transition-all`}
          >
            <IoChatbox size={24} />
          </span>

          {/* <Image
            src={"/icons/chat.webp"}
            width={20}
            height={20}
            alt=""
            className="group-hover:scale-105 group-hover:rotate-6 transition-all"
          /> */}
        </Link>

        {/* <!-- Dropdown Start --> */}
      </div>
      <div
        className={`fixed w-screen h-screen right-0 top-0 opacity-0 z-50 transition-all duration-300 ${
          dropdownOpen === true
            ? "bg-[#18181875] translate-x-0 opacity-100"
            : "w-0 -translate-x-full"
        }`}
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className={`absolute bg-white md:w-[400px] md:right-0 top-0 inset-0 h-screen overflow-hidden z-50 pb-8 `}
        >
          <div className="w-full flex justify-between items-center py-1 hover:cursor-pointer border-b">
            <div className="px-4.5 py-2 flex justify-center">
              <h5 className="px-2 text-2xl flex justify-center items-center w-fit rounded-full text-cool">
                Tin nhắn
              </h5>
            </div>
            <div
              className="bg-white p-1 rounded-md text-rose-600 "
              onClick={() => {
                setDropdownOpen(false);
              }}
            >
              <IoClose size={28} />
            </div>
          </div>
          {/* <div className="px-4.5 py-2 flex justify-center">
            <h5 className="px-3 py-1 text-xl font-bold flex justify-center items-center bg-main w-fit rounded-full text-white text-cool">
              {t("message")}
            </h5>
          </div> */}

          <ContactList
            onSelect={(contact) => {
              if (selectChat) selectChat(contact);
              router.push(`/${role?.toLocaleLowerCase()}/contact`);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DropdownMessage;
