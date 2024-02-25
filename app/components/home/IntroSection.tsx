"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const IntroSection = () => {
  const { t } = useTranslation();
  return (
    <div className="my-2">
      <div className="relative flex justify-center w-full py-8 ">
        <Image
          src={"/icons/cloud.webp"}
          width={200}
          height={100}
          alt="cloud"
          loading="lazy"
          className="absolute duration-500 hidden md:block left-28 "
        />
        <Image
          src={"/icons/cloud.webp"}
          width={200}
          height={100}
          alt="cloud"
          loading="lazy"
          className="absolute right-28 top-10 hidden md:block"
        />
        <div className="bg-white">
          <div className="flex w-full items-center justify-center">
            <h1 className="text-5xl font-semibold text-cool-main uppercase">
              {t("atAFO")}
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
                <h1 className="text-xl font-bold ml-1">{t("rapidProgress")}</h1>
              </div>
              <p className="text-justify text-lg">{t("rapidProgressDes")}</p>
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
                  {t("connectWithManyFriends")}
                </h1>
              </div>
              <p className="text-justify text-lg">
                {t("connectWithManyFriendsDes")}
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
                <h1 className="text-xl font-bold ml-1">
                  {t("excellentTeacher")}
                </h1>
              </div>
              <p className="text-justify text-lg">{t("excellentTeacherDes")}</p>
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
          <h4 className="text-2xl text-white font-bold">
            {t("weeklyProgram")}
          </h4>
          <Image
            src={"/home/home_block1.webp"}
            alt=""
            width={340}
            height={192}
            priority
            className="rounded-md"
          />
          <p className="text-justify my-2 text-white">
            {t("weeklyProgramDes")}
          </p>
        </div>
        <div
          style={{
            background: "#2e68a0",
            clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
          }}
          className="p-[15px] pt-[30px] rounded-sm max-w-[370px]"
        >
          <h4 className="text-2xl text-white font-bold">{t("weeklyMenu")}</h4>
          <Image
            src={"/home/home_block2.webp"}
            alt=""
            width={340}
            height={192}
            priority
            className="rounded-md"
          />
          <p className="text-justify my-2 text-white">{t("weeklyMenuDes")}</p>
        </div>
        <div
          style={{
            background: "#5f2f99",
            clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
          }}
          className="p-[15px] pt-[30px] rounded-sm max-w-[370px] relative"
        >
          <h4 className="text-2xl text-white font-bold">{t("photoLibary")}</h4>
          <Image
            src={"/home/home_block3.webp"}
            alt=""
            width={340}
            height={192}
            priority
            className="rounded-md relative"
          />
          <p className="text-justify my-2 text-white">{t("photoLibaryDes")}</p>
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
          <p className="text-justify my-2 text-white">{t("videoClips")}</p>
        </div>
        <div
          style={{
            background: "#2e68a0",
            clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0% 100%)",
          }}
          className="p-[15px] md:ml-8 ml-0 pt-[30px] rounded-sm max-w-[370px]"
        >
          <h4 className="text-2xl text-white font-bold">
            {t("weeklyActivities")}
          </h4>
          <Image
            src={"/home/home_block6.webp"}
            alt=""
            width={340}
            height={192}
            className="rounded-md "
          />
          <p className="text-justify my-2 text-white">
            {t("weeklyActivitiesDes")}
          </p>
        </div>
        <div
          style={{
            background: "#ec1460",
            clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0% 100%)",
          }}
          className="p-[15px] md:ml-8 ml-0 pt-[30px] rounded-sm max-w-[370px]"
        >
          <h4 className="text-2xl text-white font-bold">{t("document")}</h4>
          <Image
            src={"/home/home_block5.webp"}
            alt=""
            width={340}
            height={192}
            priority
            className="rounded-md"
          />
          <p className="text-justify my-2 text-white">{t("documentSub")}</p>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
