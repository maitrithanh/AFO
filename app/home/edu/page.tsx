import Image from "next/image";
import React from "react";

const EduPage = () => {
  return (
    <div className="relative h-screen grid xl:grid-cols-2 grid-cols-1 bg-[url(/banner-homepage.webp)] bg-no-repeat bg-cover">
      <div className="md:mx-24 mx-8">
        <div className="h-full flex md:items-center items-start mt-20 xl:mt-0">
          <div>
            <p className="md:text-6xl text-4xl text-[#00224a] font-bold uppercase drop-shadow-xl">
              Giáo dục
            </p>

            <p className="italic text-xl text-justify">
              Là nơi sẽ ươm mầm và chắp cánh cho nhưng giấc mơ của bé với tình
              thương yêu vô bờ bến và phương pháp giáo dục tiên tiến nhất, giúp
              các bé phát triển đồng thời về mặt thể chất và tinh thần để tạo
              cho các bé nền tảng vững chắc nhất khi vào môi trường học tập tiểu
              học.
            </p>
          </div>
        </div>
      </div>
      <div className=" lg:bottom-32 right-2 bottom-14  flex justify-center items-center ">
        <Image
          src={"/banner/banner-edu.webp"}
          alt="banner"
          width={800}
          height={640}
          className="transition-all duration-5000"
        />
      </div>
    </div>
  );
};

export default EduPage;
