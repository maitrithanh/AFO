"use client";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { Asap_Condensed } from "next/font/google";
import { IoIosArrowForward } from "react-icons/io";

const font_asap_condensed = Asap_Condensed({
  weight: "500", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

const NewsPage = () => {
  const { data: allNews } = useFetch(`/News/getNews`);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="min-h-full mt-14">
      <div className=" w-full flex justify-center pt-8">
        <h1 className="text-3xl font-bold uppercase text-main">
          {t("news")} AFO
        </h1>
      </div>

      <div className="flex items-center w-full justify-center">
        <div className="w-2/3 p-4 grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {allNews?.map((newsItem: any) => {
            return (
              <div key={newsItem.id} className="shadow-lg  rounded-b-2xl">
                <Image
                  src={getImageUrl(
                    newsItem.image ? newsItem.image : "/news/default-thumb.webp"
                  )}
                  alt={newsItem.title}
                  width={1920}
                  height={1080}
                  loading="lazy"
                  className="w-full h-[190px] rounded-t-2xl"
                />

                <div className="p-2">
                  <Link
                    href={`/home/news/${newsItem.id}`}
                    className="hover:cursor-pointer"
                  >
                    <p
                      className={`text-2xl leading-7 my-2 font-semibold titleNews  ${font_asap_condensed.className}`}
                    >
                      {newsItem.title}
                    </p>
                  </Link>
                  {/* <p
                  className="italic leading-4 text-justify descriptNews"
                  dangerouslySetInnerHTML={{ __html: newsItem.content }}
                ></p> */}
                  <button
                    className="mt-4 text-main"
                    onClick={() => {
                      router.push(`/home/news/${newsItem.id}`);
                    }}
                  >
                    <span className="flex items-center font-thin">
                      {t("readMore")}...
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
