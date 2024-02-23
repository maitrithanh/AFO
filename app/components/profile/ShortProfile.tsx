"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { getImageUrl } from "@/utils/image";
import { IoMdMore } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import ModalsList from "../dashboard/modals/ModalsList";
import useFetch from "@/utils/useFetch";
import DefaultImage from "../defaultImage";
import { baseURL } from "@/utils/callApi";
import UserData from "@/types/UserData";

interface ShortProfileProps {
  borderTop?: boolean;
  expanded?: boolean;
}

const ShortProfile: React.FC<ShortProfileProps> = ({
  borderTop,
  expanded = true,
}) => {
  const [modalListOpen, setModalListOpen] = useState(false);
  const dropdown = useRef<HTMLInputElement | null>(null);
  const { data: user, loading } = useFetch<UserData>("Auth/current");

  //close modal outside click
  useEffect(() => {
    if (!modalListOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        dropdown?.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setModalListOpen(false);
      }
    }
    window?.addEventListener("click", handleClick, { capture: true });
    return () => {
      window?.removeEventListener("click", handleClick, { capture: true });
    };
  }, [modalListOpen]);

  return (
    <div
      className={`relative transition-all  ${
        borderTop
          ? "p-3"
          : "border p-1 rounded-full w-[50px] h-[50px] sm:h-full sm:w-full bg-white duration-300 hover:scale-105 "
      } flex`}
    >
      <div
        ref={dropdown}
        className={`w-full flex justify-between items-center overflow-hidden transition-all`}
      >
        <div className="w-full flex items-center">
          <DefaultImage
            key={user?.avatar}
            img={getImageUrl(user?.avatar)}
            fallback="/avatar.webp"
            className={`w-10 h-10 rounded-full cursor-pointer ${
              borderTop ? "mr-2" : ""
            }`}
            width={100}
            height={100}
            onClick={() => {
              setModalListOpen((curr) => !curr);
            }}
          />

          <div
            className={`flex overflow-hidden transition-all justify-between ${
              expanded ? (borderTop ? "w-full" : "sm:w-full") : " w-0"
            }`}
          >
            <div
              className="leading-4 cursor-pointer"
              onClick={() => {
                setModalListOpen((curr) => !curr);
              }}
            >
              {borderTop ? (
                loading ? (
                  "Đang tải..."
                ) : (
                  <>
                    <h4 className="font-semibold ml-2">
                      {user?.fullName} admin
                    </h4>
                  </>
                )
              ) : (
                <h4 className="text-md font-normal mx-1 sm:visible invisible">
                  {user?.fullName}
                </h4>
              )}
            </div>

            {borderTop ? (
              <button
                title="btn"
                className="p-1.5 hover:opacity-50"
                onClick={() => {
                  setModalListOpen((curr) => !curr);
                }}
              >
                <IoMdMore size={24} />
              </button>
            ) : modalListOpen ? (
              <IoIosArrowDown />
            ) : (
              <IoIosArrowForward />
            )}
          </div>
        </div>

        <ModalsList
          modalListOpen={modalListOpen}
          expanded={expanded}
          borderTop={borderTop}
        />
      </div>
    </div>
  );
};

export default ShortProfile;
