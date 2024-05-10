"use client";
import BackAction from "@/app/components/admin/BackAction";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const DetailNewsPage = (params: any) => {
  const { data: detailNews } = useFetch(
    `News/getNewsByID?id=${params.params.newsId}`
  );

  return (
    <div className="h-full mt-14">
      <div className="flex items-center w-full justify-center pt-8">
        <div className="w-full ">
          <div className="px-4">
            <BackAction />
          </div>

          <div>
            <div className="relative">
              <div className="absolute flex justify-center items-center w-full h-full bg-[#00000095]">
                <h1 className="text-4xl font-bold uppercase text-white">
                  {detailNews?.title}
                </h1>
              </div>
              <img
                src={getImageUrl(detailNews?.image)}
                alt={detailNews?.title}
                className="object-cover w-full h-40"
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="w-2/3">
                <p
                  className="text-lg my-4 text-justify"
                  dangerouslySetInnerHTML={{
                    __html: detailNews?.content,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailNewsPage;
