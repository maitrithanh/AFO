import Image from "next/image";
import React from "react";

const IntroSection = () => {
  return (
    <div className="my-2">
      <div className="relative flex justify-center w-full py-8">
        <Image
          src={"/icons/cloud.webp"}
          width={200}
          height={100}
          alt="cloud"
          loading="lazy"
          className="absolute duration-500 hidden md:block left-28"
        />
        <Image
          src={"/icons/cloud.webp"}
          width={200}
          height={100}
          alt="cloud"
          loading="lazy"
          className="absolute right-28 top-10 hidden md:block"
        />
        <div>
          <div className="flex w-full items-center justify-center">
            <h1 className="text-5xl font-semibold text-cool-main">TẠI AFO</h1>
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
                Các bé sẽ được trải nghiệm các hoạt động thực tế và việc học mỗi
                ngày.
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
                Khi học vui chơi với nhiều bạn bè thêm nhiều niềm vui cho bé.
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
                <h1 className="text-xl font-bold ml-1">Giáo viên ưu tú</h1>
              </div>
              <p className="text-justify text-lg">
                Giáo viên của chúng tôi luôn là những giáo viên ưu tú có trình
                độ từ thạc sỹ trở lên.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 container gap-4 justify-center">
        <div
          style={{
            background: "#ec1460",
            clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
          }}
          className="p-[15px] pt-[30px] rounded-sm max-w-[370px]"
        >
          <h4 className="text-2xl text-white font-bold">Chương trình tuần</h4>
          <Image
            src={"/home/home_block1.webp"}
            alt=""
            width={340}
            height={192}
            priority
            className="rounded-md"
          />
          <p className="text-justify my-2 text-white">
            Chương trình học được thiết kế phù hợp cho từng lứa tuổi, trẻ được
            học trong môi trường khuyến khích sự sáng tạo,chú trọng chăm sóc,
            phát triển từng cá nhân và những khả năng khác biệt của các em.
          </p>
        </div>
        <div
          style={{
            background: "#2e68a0",
            clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
          }}
          className="p-[15px] pt-[30px] rounded-sm max-w-[370px]"
        >
          <h4 className="text-2xl text-white font-bold">Thực đơn tuần</h4>
          <Image
            src={"/home/home_block2.webp"}
            alt=""
            width={340}
            height={192}
            priority
            className="rounded-md"
          />
          <p className="text-justify my-2 text-white">
            Thực đơn được sự kiểm tra và phê duyệt của bác sĩ dinh dưỡng. Thức
            ăn được chế biến tại trường để bảo đảm dinh dưỡng, vệ sinh và khẩu
            phần ăn được thiết kế theo nhu cầu các cá nhân trẻ.
          </p>
        </div>
        <div
          style={{
            background: "#5f2f99",
            clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
          }}
          className="p-[15px] pt-[30px] rounded-sm max-w-[370px] relative"
        >
          <h4 className="text-2xl text-white font-bold">Thư viện ảnh</h4>
          <Image
            src={"/home/home_block3.webp"}
            alt=""
            width={340}
            height={192}
            priority
            className="rounded-md relative"
          />
          <p className="text-justify my-2 text-white">
            Những hình ảnh hoạt động của Trường Mầm non Vĩnh Thạnh, những góc
            hình ngộ nghĩnh dễ thương của các bé trong các hoạt động tại trường,
            ghi dấu lại những kỷ niệm tại ngôi trường thân yêu.
          </p>
        </div>
      </div>
      {/* section 2 */}
      <div className="grid md:grid-cols-3 grid-cols-1 container gap-4 justify-center my-4">
        <div
          style={{
            background: "#5f2f99",
            clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0% 100%)",
          }}
          className="p-[15px] md:ml-8 ml-0 pt-[30px] rounded-sm max-w-[370px]"
        >
          <h4 className="text-2xl text-white font-bold">Video Clip</h4>
          <Image
            src={"/home/home_block4.webp"}
            alt=""
            width={340}
            height={192}
            className="rounded-md"
          />
          <p className="text-justify my-2 text-white">
            Những đoạn clip quay hoạt động của Trường Mầm non Vĩnh Thạnh, những
            góc hình ngộ nghĩnh dễ thương của các bé trong các hoạt động tại
            trường, ghi dấu lại những kỷ niệm tại ngôi trường thân yêu.
          </p>
        </div>
        <div
          style={{
            background: "#2e68a0",
            clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0% 100%)",
          }}
          className="p-[15px] md:ml-8 ml-0 pt-[30px] rounded-sm max-w-[370px]"
        >
          <h4 className="text-2xl text-white font-bold">Hoạt động tuần</h4>
          <Image
            src={"/home/home_block6.webp"}
            alt=""
            width={340}
            height={192}
            className="rounded-md "
          />
          <p className="text-justify my-2 text-white">
            Hoạt động được thiết kế phù hợp cho từng lứa tuổi, trẻ được hoạt
            động trong môi trường khuyến khích sự sáng tạo,chú trọng chăm sóc,
            phát triển từng cá nhân và những khả năng khác biệt của các em.
          </p>
        </div>
        <div
          style={{
            background: "#ec1460",
            clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0% 100%)",
          }}
          className="p-[15px] md:ml-8 ml-0 pt-[30px] rounded-sm max-w-[370px]"
        >
          <h4 className="text-2xl text-white font-bold">Tài liệu</h4>
          <Image
            src={"/home/home_block5.webp"}
            alt=""
            width={340}
            height={192}
            priority
            className="rounded-md"
          />
          <p className="text-justify my-2 text-white">
            Tài liệu học tập của Trường Mầm non Vĩnh Thạnh, những bài tập vẽ của
            các bé trong các giờ học trên lớp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
