import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="relative w-full h-[100px]">
      <div className="absolute bottom-0 w-full h-[80px] bg-[#9cd44c] flex justify-center items-center">
        <p className="text-xl text-white">&copy;AFO</p>
      </div>
      <div className="absolute md:left-0 -left-8 bottom-0 md:w-full w-28">
        <Image
          src={"/icons/footer-left.webp"}
          width={150}
          height={150}
          alt="footer left"
          loading="lazy"
        />
      </div>
      <div className="absolute md:right-0 -right-10 bottom-0">
        <Image
          loading="lazy"
          src={"/icons/footer-right.webp"}
          width={150}
          height={150}
          className="object-cover"
          alt="footer right"
        />
      </div>
    </div>
  );
};

export default Footer;
