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
        className="absolute animate-bounce duration-500 hidden md:block"
      />
      <Image
        src={"/icons/cloud.webp"}
        width={200}
        height={100}
        alt="cloud"
        loading="lazy"
        className="absolute right-28 top-10 animate-bounce hidden md:block"
      />
      {/* <div className="h-fit w-full flex items-center justify-center p-8">
        <div className="grid md:grid-cols-6 grid-cols-1 gap-2 max-w-[1120px]">
          <div className=" flex justify-center items-center md:col-span-2">
            <Image src="/Logo.jpg" alt="" width={200} height={200} />
          </div>
          <div className="md:col-span-4">
            <h1 className="text-3xl font-bold text-main text-cool">
              TỔNG QUAN
            </h1>
            <p className="mt-2 text-justify text-lg">
              Hãy cùng trải nghiệm các khóa học tại TDKT Online. Với chính sách
              tận dụng được sự phát triển của các ứng dụng Online, nguồn học
              liệu từ giáo sư các trường Đại học hàng đầu thế giới, được giảng
              dạy và dẫn dắt bởi những chuyên gia, luôn cập nhập đầy đủ các khóa
              học từ trung học cơ sở đến Đại Học.
            </p>
          </div>
        </div>
      </div>

      <div className="h-fit w-full flex items-center justify-center p-8 bg-main">
        <div className="grid md:grid-cols-8 grid-cols-1 gap-2 max-w-[1120px]">
          <div className="md:col-span-5 text-white">
            <div>
              <h1 className="text-3xl font-bold text-cool">CHỨNG CHỈ</h1>
              <p className="mt-2 text-justify text-lg">
                Hãy cùng trải nghiệm các khóa học tại TDKT Online. Với chính
                sách tận dụng được sự phát triển của các ứng dụng Online, nguồn
                học liệu từ giáo sư các trường Đại học hàng đầu thế giới, được
                giảng dạy và dẫn dắt bởi những chuyên gia, luôn cập nhập đầy đủ
                các khóa học từ trung học cơ sở đến Đại Học.
              </p>
            </div>
            <div className="mt-8">
              <h1 className="text-3xl font-bold text-cool">MỤC TIÊU</h1>
              <p className="mt-2 text-justify text-lg">
                Mục tiêu dạy học là trạng thái phát triển nhân cách được dự kiến
                trước của học viên sau một quá trình đào tạo, dựa trên yêu cầu
                phát triển của đất nước, của thị trường lao động. Trạng thái
                phát triển nhân cách được thể hiện ở phẩm chất và năng lực của
                người được đào tạo.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center md:col-span-3 pl-4">
            <Image src="/target.png" alt="" width={500} height={500} />
          </div>
        </div>
      </div> */}

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
