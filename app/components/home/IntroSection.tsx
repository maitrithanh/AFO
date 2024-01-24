import Image from "next/image";
import React from "react";

const IntroSection = () => {
  return (
    <div className="relative my-2">
      <Image
        src={"/icons/cloud.webp"}
        width={200}
        height={100}
        alt="cloud"
        loading="lazy"
        className="absolute duration-500 hidden md:block"
      />
      <Image
        src={"/icons/cloud.webp"}
        width={200}
        height={100}
        alt="cloud"
        loading="lazy"
        className="absolute right-28 top-10 hidden md:block"
      />

      <div className="flex justify-center w-full py-8">
        <div>
          <div className="flex w-full items-center justify-center">
            <h1 className="text-5xl font-semibold text-cool-main">
              TIÊU CHÍ TẠI AFO
            </h1>
          </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-[1120px] mx-4 text-justify">
            <div>
              <div className="flex items-center">
                <Image
                  src="/fire.svg"
                  alt="fire"
                  width={30}
                  height={30}
                  loading="lazy"
                />
                <h1 className="text-xl font-bold ml-1">Tiến bộ nhanh chóng</h1>
              </div>
              <p className="text-justify text-lg">
                Các nghiên cứu đã chứng minh các khóa học của chúng tôi giảng dễ
                hiểu, hiệu quả rõ rệt.
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <Image
                  src="/check.svg"
                  alt="check"
                  width={30}
                  height={30}
                  loading="lazy"
                />
                <h1 className="text-xl font-bold ml-1">
                  Kết nối với nhiều bạn bè
                </h1>
              </div>
              <p className="text-justify text-lg">
                Khi học có cơ hội kết nối thêm nhiều bạn bè thêm nhiều niềm vui
                cho bé.
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <Image
                  src="/earth.svg"
                  alt="earth"
                  width={30}
                  height={30}
                  loading="lazy"
                />
                <h1 className="text-xl font-bold ml-1">Tiến bộ nhanh chóng</h1>
              </div>
              <p className="text-justify text-lg">
                Giáo viên của chúng tôi luôn là những giáo viên ưu tú có trình
                độ từ thạc sỹ trở lên.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
