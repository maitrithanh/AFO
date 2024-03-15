"use client";

import { HTMLProps, useState } from "react";

interface Props extends HTMLProps<HTMLImageElement> {
  img: string;
  fallback: string;
  custom?: string;
}

const DefaultImage = (p: Props) => {
  const [src, setSrc] = useState(p.img || p.fallback);

  return (
    <img
      {...p}
      src={src}
      onError={() => {
        setSrc(p.fallback);
      }}
      className={`rounded-full ${p.custom ? p.custom : "w-[40px] h-[40px]"}`}
    />
  );
};

export default DefaultImage;
