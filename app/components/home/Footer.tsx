import Image from "next/image";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { Asap_Condensed } from "next/font/google";
import Link from "next/link";

const font_asap_condensed = Asap_Condensed({
  weight: "600", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <div className="relative w-full h-fit py-14 border-t items-center bg-[#e0e6eb80]">
      {/* <div className=" bottom-0 w-full h-[80px] bg-white border-t flex justify-center items-center">
        <p className="text-xl">&copy;AFO</p>
      </div> */}
      <div className="flex justify-center items-center w-full">
        <div className=" w-2/3 grid  justify-center lg:grid-cols-3 grid-cols-1 lg:gap-52 gap-4 py-4">
          <div className="">
            <div className="flex items-center gap-2">
              <Image
                src={"/Logo.webp"}
                width={50}
                height={50}
                alt="footer left"
                className="object-cover"
                loading="lazy"
              />
              <p
                className={`font-bold text-2xl ${font_asap_condensed.className}`}
              >
                AFO
              </p>
            </div>
            <div>
              <p>WebApp chuyển đổi số trường mầm non</p>
              <p className="text-[#33344199]">
                Copyright © 2024 - All rights reserved
              </p>
            </div>
          </div>
          <div>
            <p
              className={`flex items-center gap-1 text-xl ${font_asap_condensed.className} text-[#2f303c]`}
            >
              Liên kết
            </p>
            <div>
              <div>
                <Link
                  className="hover:text-main hover:scale-105"
                  href={"/home/about"}
                >
                  Giới thiệu
                </Link>
              </div>
              <div>
                <Link
                  className="hover:text-main hover:scale-105"
                  href={"/home/edu"}
                >
                  Giáo dục
                </Link>
              </div>
              <div>
                <Link
                  className="hover:text-main hover:scale-105"
                  href={"/home/contact"}
                >
                  Liên hệ
                </Link>
              </div>
              <div>
                <Link
                  className="hover:text-main hover:scale-105"
                  href={"/home/news"}
                >
                  Tin tức
                </Link>
              </div>
            </div>
          </div>
          <div>
            <p
              className={`flex items-center gap-1 text-xl ${font_asap_condensed.className} text-[#2f303c]`}
            >
              Liên hệ
            </p>
            <p>(028) 3863 2052 - (028) 3862 9232</p>
            <p>828 Sư Vạn Hạnh, Phường 13, Quận 10, TP. HCM</p>
          </div>
        </div>
      </div>
      {/* <div>
        <Image
          src={"/home/footer-bottom.webp"}
          width={1920}
          height={1080}
          alt="footer left"
          className="object-cover"
          loading="lazy"
        />
      </div> */}
      {/* <div className="absolute md:left-0 -left-8 bottom-0 md:w-full w-28">
        <Image
          src={"/icons/footer-left.webp"}
          width={150}
          height={150}
          alt="footer left"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute right-0 bottom-0">
        <Image
          loading="lazy"
          src={"/icons/footer-right.webp"}
          width={150}
          height={150}
          className="object-cover"
          alt="footer right"
        />
      </div> */}
    </div>
  );
};

export default Footer;
