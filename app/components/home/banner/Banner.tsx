"use client";
import Image from "next/image";
import React from "react";
import { SiAzuredataexplorer } from "react-icons/si";
import { FaPhoneVolume } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from "next/link";

const Banner = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="relative h-screen grid xl:grid-cols-2 grid-cols-1 bg-[url(/banner-homepage.webp)] bg-no-repeat bg-cover">
      <div className="md:mx-24 mx-8">
        <div className="h-full flex md:items-center items-start mt-20 xl:mt-0">
          <div>
            <p className="md:text-6xl text-4xl text-[#00224a] font-bold uppercase drop-shadow-xl uppercase">
              {t("bannerTitle")}
            </p>
            <div className="bottom-0 group my-2 md:flex">
              <button className="duration-5000 bg-main m-2 p-4 rounded-full text-white flex items-center justify-center">
                <span className="mx-2 group-hover:scale-125 transition-all duration-500">
                  <FaPhoneVolume />
                </span>
                Hotline: 1900 8080
              </button>
              <button
                onClick={() => {
                  router.push("/home/enroll");
                }}
                className="transition-all duration-500  m-2 border-main hover:scale-105 border-[2px] p-4 rounded-full text-main font-bold uppercase flex items-center justify-center"
              >
                {t("enrollNow")}
                <span className="mx-2 transition-all duration-500">
                  <SiAzuredataexplorer />
                </span>
              </button>
            </div>
            <p className="italic">{t("bannerLogan")}</p>
          </div>
        </div>
        <div className="my-2"></div>
      </div>
      <div className=" lg:bottom-32 right-2 bottom-14 flex justify-center items-center">
        <div className="relative">
          <Image
            src={"/banner/an-preschool.webp"}
            alt="banner"
            width={800}
            height={640}
            className="transition-all duration-5000 "
          />
          <Image
            src={"/plane.gif"}
            alt="banner"
            width={200}
            height={640}
            className="transition-all duration-5000 absolute right-24 bottom-0 md:visible invisible"
          />
        </div>
      </div>
      <Link
        href={"#atAFO"}
        className="absolute flex justify-center items-center w-full bottom-8 text-main animate-pulse"
      >
        <FaLongArrowAltDown size={34} />
      </Link>
    </div>
  );
};

export default Banner;
