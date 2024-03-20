import Image from "next/image";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="relative w-full h-fit border-t items-center">
      {/* <div className=" bottom-0 w-full h-[80px] bg-white border-t flex justify-center items-center">
        <p className="text-xl">&copy;AFO</p>
      </div> */}
      <div className="flex justify-center items-center w-full">
        <div className="grid items-center justify-center lg:grid-cols-3 grid-cols-1 lg:gap-52 gap-4 py-4">
          <div className="flex items-center">
            <Image
              src={"/Logo.webp"}
              width={100}
              height={100}
              alt="footer left"
              className="object-cover"
              loading="lazy"
            />
            <div>
              <p className="font-bold text-xl">AFO</p>
              <p>WebApp chuyển đổi số trường mầm non</p>
            </div>
          </div>
          <div>
            <p className="flex items-center gap-1 text-xl">
              <FaLocationDot />
              Địa chỉ
            </p>
            <p>828 Sư Vạn Hạnh, Phường 13, Quận 10, TP. HCM</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-xl">
              <FaPhone />
              Liên hệ
            </p>
            <p>(028) 3863 2052 - (028) 3862 9232</p>
          </div>
        </div>
      </div>
      <div>
        <Image
          src={"/home/footer-bottom.webp"}
          width={1920}
          height={1080}
          alt="footer left"
          className="object-cover"
          loading="lazy"
        />
      </div>
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
