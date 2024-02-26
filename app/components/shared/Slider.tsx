"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { getImageUrl } from "@/utils/image";

interface SliderProps {
  showThumbs?: boolean;
  data: any;
}

const Slider: React.FC<SliderProps> = ({ showThumbs = false, data }) => {
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
        {data?.map((item: any, index: any) => {
          return (
            <div
              key={item?.index}
              className="md:h-[600px] h-[200px] relative transition-all"
            >
              <img
                src={getImageUrl(item?.url)}
                alt={item?.url}
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
