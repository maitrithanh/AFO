"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneVolume } from "react-icons/fa6";
import { SiAzuredataexplorer } from "react-icons/si";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="relative h-screen grid xl:grid-cols-2 grid-cols-1 bg-[url(/banner-homepage.webp)] bg-no-repeat bg-cover">
      <div className="md:mx-24 mx-8">
        <div className="h-full flex md:items-center items-start mt-20 xl:mt-0">
          <div>
            <p className="md:text-6xl text-4xl text-[#00224a] font-bold uppercase drop-shadow-xl">
              Giới thiệu
            </p>

            <p className="italic text-xl text-justify">
              Trường mầm non AFO là trường mẫu giáo theo chuẩn quốc tế, trường
              hiện tại có hai cơ sở được xây dựng vô cùng tâm huyết cùng với các
              chương trình giáo dục hiện đại vô cùng hiệu quả để tạo nên một môi
              trường giáo dục mầm non chất lượng.
            </p>
            <p className="italic text-xl my-2 text-justify">
              Giáo dục mầm non là một bậc học không ép buộc nhưng đóng vai trò
              vai trong trong những bước đầu đời để phát triển nhận thức của bé
              về tinh thần, nhận thức và thể chất của bé. Với sự kết hợp hài hòa
              giữa nét ưu việt giữa nền tảng chương trình khung của Bộ Giáo Dục
              Việt Nam và chương trình IEYC, với sự kết hợp ấy sẽ mang lại cho
              các bé những giờ học vui vẻ đầy ấp tiếng cười nhưng vẫn đi cùng
              với chất lượng tốt nhất. Trường mầm non AFO giúp tạo cho các bé
              nền tảng tốt nhất cho các bé bước vào môi trường học tập tiểu học
              được và đời sống sinh hoạt đời thường.
            </p>
          </div>
        </div>
      </div>
      <div className=" lg:bottom-32 right-2 bottom-14  flex justify-center items-center ">
        <Image
          src={"/banner/banner2.webp"}
          alt="banner"
          width={800}
          height={640}
          priority
          className="transition-all duration-5000"
        />
      </div>
    </div>
  );
};

export default AboutPage;
