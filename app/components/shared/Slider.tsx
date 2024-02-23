"use client";
import React from "react";
import { slides } from "@/data/slides";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/legacy/image";

interface SliderProps {
  showThumbs?: boolean;
}

const Slider: React.FC<SliderProps> = ({ showThumbs = false }) => {
  return (
    <>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={showThumbs}
        interval={2000}
        dynamicHeight
        className="md:max-h-[600px] max-h-[200px]"
      >
        {slides.map((item: any) => {
          return (
            <div
              key={item.url}
              className="md:h-[600px] h-[200px] relative transition-all"
            >
              <img
                src={item.url}
                alt={item.url}
                className="md:max-h-[600px] max-h-[200px] relative"
              />
            </div>
          );
        })}
      </Carousel>
      {/* <Image
        src={item.url}
        layout="fill"
        alt={item.url}
        priority
        className="md:max-h-[600px] max-h-[200px] relative"
      /> */}
    </>
  );
};

export default Slider;
