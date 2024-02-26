"use client";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { RiFullscreenExitLine } from "react-icons/ri";

const AlbumsPage = () => {
  const child = getCookie("child");
  const { data: listChild } = useFetch("parent/childrenlist");
  const [indexIMG, setIndexImg] = useState(0);
  const [showIMG, setShowImg] = useState(false);

  const infoChild = listChild?.find((x: any) => x.id == child);

  return (
    <>
      {showIMG ? (
        <div
          className="fixed w-full h-full top-0 left-0  z-50 bg-[#000000a9] flex items-center justify-center px-4"
          onClick={() => {
            setShowImg(false);
          }}
        >
          <div className="relative">
            <img
              src={getImageUrl(infoChild?.pictures?.split(",")[indexIMG])}
              className="w-[400px] h-fit"
            />
            <div className="text-white absolute top-2 right-2">
              <RiFullscreenExitLine size={24} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="md:px-10">
        <div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-4 grid-cols-3 gap-2 items-center justify-center">
          {infoChild?.pictures?.split(",")?.map((item: any, index: any) => {
            return (
              <img
                key={index}
                src={getImageUrl(item)}
                alt={index}
                onClick={() => {
                  setIndexImg(index);
                  setShowImg(true);
                }}
                className="md:max-w-[200px] max-w-[120px] hover"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AlbumsPage;
