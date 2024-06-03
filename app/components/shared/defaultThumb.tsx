"use client";

import Image from "next/image";
import { HTMLProps, useState } from "react";

interface Props extends HTMLProps<HTMLImageElement> {
  img: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
  custom?: string;
}

const DefaultThumb = (p: Props) => {
  const [src, setSrc] = useState(p.img || p.fallback);

  return (
    <>
      <Image
        className={`${p.custom ? p.custom : "object-cover rounded-sm"}`}
        alt={p.alt}
        src={src}
        onError={() => {
          setSrc(p.fallback);
        }}
        loading="lazy"
        width={p.width}
        height={p.height}
        style={{
          objectFit: "cover", // cover, contain, none
        }}
      />
    </>
  );
};

export default DefaultThumb;
