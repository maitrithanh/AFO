"use client";
import Image from "next/image";
import React from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { SiAzuredataexplorer } from "react-icons/si";
import { IoIosMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-screen grid xl:grid-cols-2 grid-cols-1 bg-[url(/banner-homepage.webp)] bg-no-repeat bg-cover">
      <div className="md:mx-24 mx-8">
        <div className="h-full flex md:items-center items-start mt-20 xl:mt-0">
          <div>
            <p className="md:text-6xl text-4xl text-[#00224a] font-bold uppercase drop-shadow-xl">
              {t("contact")}
            </p>

            <div className="bottom-0 group my-2 bg-white p-4 rounded-md shadow-3xl">
              <div className="flex justify-start items-center text-xl  my-2">
                <span className="mx-2 group-hover:scale-125 transition-all duration-500 text-main">
                  <FaPhoneVolume size={24} />
                </span>
                (028) 3863 2052 - (028) 3862 9232
              </div>
              <div className="flex justify-start items-center text-xl my-2">
                <span className="mx-2 group-hover:scale-125 transition-all duration-500 text-main ">
                  <IoIosMail size={24} />
                </span>
                contact@afo.com
              </div>
              <div className="flex justify-start items-center text-xl my-2">
                <span className="mx-2 group-hover:scale-125 transition-all duration-500 text-main ">
                  <IoLocationSharp size={24} />
                </span>
                828 Sư Vạn Hạnh, Phường 13, Quận 10, TP. HCM
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" lg:bottom-32 right-2 bottom-14  flex justify-center items-center ">
        <Image
          src={"/banner/banner-contact.webp"}
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

export default ContactPage;
