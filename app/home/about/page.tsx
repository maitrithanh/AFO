import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full bg-contain bg-no-repeat flex justify-center">
        <Image
          className=""
          src={"/ultis/tab-content.webp"}
          alt=""
          width={644}
          height={1000}
        />
      </div>
    </div>
  );
};

export default AboutPage;
