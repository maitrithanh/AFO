"use client";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const NewsPage = () => {
  const { data: allNews } = useFetch(`/News/getNews`);
  const router = useRouter();

  return (
    <div className="h-full mt-14">
      <div className=" w-full flex justify-center pt-8">
        <h1 className="text-3xl font-bold uppercase text-main">Tin tức AFO</h1>
      </div>

      <div className="flex items-center w-full justify-center">
        <div className="w-2/3 p-4 grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {allNews?.map((newsItem: any) => {
            return (
              <div key={newsItem.id} className="shadow-3xl p-4 rounded-md">
                <img
                  src={getImageUrl(newsItem.image)}
                  alt={newsItem.title}
                  className="w-full h-[176px] rounded-sm"
                />
                <Link
                  href={`/home/news/${newsItem.id}`}
                  className="hover:cursor-pointer"
                >
                  <p className="text-xl leading-5	my-2 titleNews">
                    {newsItem.title}
                  </p>
                </Link>
                <p
                  className="italic leading-4 text-justify descriptNews"
                  dangerouslySetInnerHTML={{ __html: newsItem.content }}
                ></p>
                <button
                  className="mt-4 text-main"
                  onClick={() => {
                    router.push(`/home/news/${newsItem.id}`);
                  }}
                >
                  Đọc tiếp
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
