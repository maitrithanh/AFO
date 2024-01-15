"use client";
import React, { useEffect, useState } from "react";
import { slides } from "@/data/slides";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoDotFill, GoDot } from "react-icons/go";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const preSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    setInterval(() => {
      nextSlide();
    }, 3000);
  });

  return (
    <div className="md:h-[600px] h-[200px] w-full mt-auto relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      ></div>
      <div className="md:hidden block group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <IoIosArrowBack
          onClick={() => {
            preSlide();
          }}
          size={30}
        />
      </div>
      <div className="md:hidden block group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <IoIosArrowForward
          onClick={() => {
            nextSlide();
          }}
          size={30}
        />
      </div>
      <div className="absolute flex justify-center items-center w-full py-2 bottom-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer text-main"
          >
            {slideIndex === currentIndex ? <GoDotFill /> : <GoDot />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
