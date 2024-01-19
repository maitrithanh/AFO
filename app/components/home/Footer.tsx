import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="relative w-full h-[100px]">
      <div className="absolute bottom-0 w-full h-[80px] bg-[#9cd44c] flex justify-center items-center">
        <p className="text-xl text-white">&copy;AFO</p>
      </div>
      <div className="absolute left-0 bottom-0">
        <Image
          src={"/icons/footer-left.png"}
          width={150}
          height={150}
          alt="footer left"
          loading="lazy"
        />
      </div>
      <div className="absolute right-0 bottom-0">
        <Image
          loading="lazy"
          src={"/icons/footer-right.png"}
          width={150}
          height={150}
          alt="footer right"
        />
      </div>
    </div>
  );
};

export default Footer;
