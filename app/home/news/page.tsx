import Image from "next/image";
import React from "react";

const NewsPage = () => {
  return (
    <div className="h-full mt-14">
      <div className=" w-full flex justify-center pt-8">
        <h1 className="text-3xl font-bold uppercase text-main">Tin tức AFO</h1>
      </div>
      <div className="flex items-center w-full justify-center">
        <div className="w-2/3 p-4 grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          <div className="shadow-3xl p-4 rounded-md">
            <Image
              src={"/news/HINH-4.webp"}
              alt=""
              width={1920}
              height={1080}
            />
            <p className="text-xl leading-5		my-2">
              Phương thức tuyển sinh HUFLIT năm 2024 (dự kiến)
            </p>
            <p className="italic leading-4	">
              Năm 2024, HUFLIT xét tuyển theo 04 phương thức
            </p>
            <button className="mt-4 text-main">Đọc tiếp</button>
          </div>

          <div className="shadow-3xl p-4 rounded-md">
            <Image
              src={"/news/HINH-4.webp"}
              alt=""
              width={1920}
              height={1080}
            />
            <p className="text-xl leading-5		my-2">
              Phương thức tuyển sinh HUFLIT năm 2024 (dự kiến)
            </p>
            <p className="italic leading-4	">
              Năm 2024, HUFLIT xét tuyển theo 04 phương thức
            </p>
            <button className="mt-4 text-main">Đọc tiếp</button>
          </div>

          <div className="shadow-3xl p-4 rounded-md">
            <Image
              src={"/news/HINH-4.webp"}
              alt=""
              width={1920}
              height={1080}
            />
            <p className="text-xl leading-5		my-2">
              Phương thức tuyển sinh HUFLIT năm 2024 (dự kiến)
            </p>
            <p className="italic leading-4	">
              Năm 2024, HUFLIT xét tuyển theo 04 phương thức
            </p>
            <button className="mt-4 text-main">Đọc tiếp</button>
          </div>

          <div className="shadow-3xl p-4 rounded-md">
            <Image
              src={"/news/HINH-4.webp"}
              alt=""
              width={1920}
              height={1080}
            />
            <p className="text-xl leading-5		my-2">
              Phương thức tuyển sinh HUFLIT năm 2024 (dự kiến)
            </p>
            <p className="italic leading-4	">
              Năm 2024, HUFLIT xét tuyển theo 04 phương thức
            </p>
            <button className="mt-4 text-main">Đọc tiếp</button>
          </div>

          <div className="shadow-3xl p-4 rounded-md">
            <Image
              src={"/news/HINH-4.webp"}
              alt=""
              width={1920}
              height={1080}
            />
            <p className="text-xl leading-5		my-2">
              Phương thức tuyển sinh HUFLIT năm 2024 (dự kiến)
            </p>
            <p className="italic leading-4	">
              Năm 2024, HUFLIT xét tuyển theo 04 phương thức
            </p>
            <button className="mt-4 text-main">Đọc tiếp</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
