"use client";

import Image from "next/image";
import { HTMLProps, useState } from "react";

interface Props extends HTMLProps<HTMLImageElement> {
  img: string;
  fallback: string;
  custom?: string;
}

const DefaultImage = (p: Props) => {
  const [src, setSrc] = useState(p.img || p.fallback);

  return (
    <>
      <Image
        className={`rounded-full ${p.custom ? p.custom : "w-[40px] h-[40px]"}`}
        alt=""
        src={src}
        onError={() => {
          setSrc(p.fallback);
        }}
        loading="lazy"
        height={1920}
        width={1080}
        style={{
          objectFit: "cover", // cover, contain, none
        }}
      />
    </>
  );
};

export default DefaultImage;
