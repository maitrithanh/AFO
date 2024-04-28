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
              {t("about")}
            </p>

            <p className="italic text-xl text-justify">
              {t("aboutDescription1")}
            </p>
            <p className="italic text-xl my-2 text-justify">
              {t("aboutDescription2")}
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
