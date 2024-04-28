"use client";
import React from "react";
import { menu } from "@/data/menu";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import moment from "moment";

const Dashboard = () => {
  const { t } = useTranslation();
  const router = useRouter();

  function getGreetingTime(m: any) {
    var g = null; //return g
    var s = null;
    if (!m || !m.isValid()) {
      return;
    } //if we can't find a valid or filled moment, we return.

    var split_afternoon = 12; //24hr time to split the afternoon
    var split_evening = 17; //24hr time to split the evening
    var currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = t("afternoon");
      s = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M75.7899 35.3981C75.7899 46.773 66.5184 55.9941 55.0814 55.9941C43.6445 55.9941 34.373 46.773 34.373 35.3981C34.373 24.0233 43.6445 14.8022 55.0814 14.8022C66.5184 14.8022 75.7899 24.0233 75.7899 35.3981Z"
            fill="url(#paint0_linear_6284_235685)"
          />
          <path
            d="M64.1745 49.6514C64.3568 48.6176 64.4518 47.5541 64.4518 46.4687C64.4518 36.3143 56.1352 28.0825 45.8761 28.0825C38.2494 28.0825 31.6961 32.6319 28.8353 39.1386C26.5177 37.1581 23.5104 35.9623 20.224 35.9623C12.8961 35.9623 6.95563 41.9075 6.95563 49.2412C6.95563 49.6496 6.97405 50.0536 7.01011 50.4526C3.48551 52.1614 1.05859 55.7469 1.05859 59.8935C1.05859 65.696 5.81094 70.3999 11.6732 70.3999H61.7981C67.6605 70.3999 72.4128 65.696 72.4128 59.8935C72.4128 54.8996 68.8927 50.7195 64.1745 49.6514Z"
            fill="url(#paint1_linear_6284_235685)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_6284_235685"
              x1="51.9359"
              y1="46.6086"
              x2="68.8347"
              y2="16.8086"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF9900" />
              <stop offset="1" stop-color="#FFEE94" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_6284_235685"
              x1="5.59702"
              y1="66.6215"
              x2="77.5311"
              y2="12.7758"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0.58" />
            </linearGradient>
          </defs>
        </svg>
      );
    } else if (currentHour >= split_evening) {
      g = t("evening");
      s = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <g clip-path="url(#clip0_6284_235695)">
            <path
              d="M49.7221 16.0273C43.4794 24.5031 42.397 36.0703 47.9038 45.6085C53.4107 55.1467 63.9695 59.9928 74.431 58.8245C72.2066 61.8446 69.327 64.4723 65.8569 66.4758C52.6482 74.1018 35.8855 69.7965 28.4163 56.8596C20.9472 43.9227 25.6 27.2531 38.8087 19.6271C42.2789 17.6236 45.9943 16.4436 49.7221 16.0273Z"
              fill="url(#paint0_linear_6284_235695)"
            />
            <path
              d="M40.878 62.6174C40.9921 61.9765 41.0515 61.3172 41.0515 60.6443C41.0515 54.3492 35.8481 49.2461 29.4294 49.2461C24.6576 49.2461 20.5575 52.0664 18.7676 56.1001C17.3176 54.8723 15.436 54.131 13.3798 54.131C8.79495 54.131 5.07823 57.8166 5.07823 62.3631C5.07823 62.6162 5.08976 62.8667 5.11232 63.1141C2.90711 64.1734 1.38867 66.3962 1.38867 68.9668C1.38867 72.564 4.36204 75.48 8.02989 75.48H39.3912C43.0591 75.48 46.0324 72.564 46.0324 68.9668C46.0324 65.8709 43.8301 63.2795 40.878 62.6174Z"
              fill="url(#paint1_linear_6284_235695)"
            />
            <path
              d="M52.8822 4.23018C50.4623 5.3048 49.5178 6.21294 48.6521 8.46036C47.9626 6.28236 47.1148 5.31088 44.4219 4.23018C47.1921 3.32761 47.9439 2.28278 48.6521 0C49.5222 2.10392 50.0596 3.25216 52.8822 4.23018Z"
              fill="url(#paint2_linear_6284_235695)"
            />
            <path
              d="M25.267 23.5603C22.847 24.6349 21.9025 25.5431 21.0368 27.7905C20.3474 25.6125 19.4996 24.641 16.8066 23.5603C19.5769 22.6577 20.3287 21.6129 21.0368 19.3301C21.907 21.434 22.4444 22.5823 25.267 23.5603Z"
              fill="url(#paint3_linear_6284_235695)"
            />
            <path
              d="M67.1499 41.9704C64.73 43.045 63.7854 43.9531 62.9197 46.2006C62.2303 44.0226 61.3825 43.0511 58.6895 41.9704C61.4598 41.0678 62.2116 40.023 62.9197 37.7402C63.7899 39.8441 64.3273 40.9924 67.1499 41.9704Z"
              fill="url(#paint4_linear_6284_235695)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_6284_235695"
              x1="51.0814"
              y1="11.5323"
              x2="41.171"
              y2="71.5402"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFEE94" />
              <stop offset="1" stop-color="#FF9900" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_6284_235695"
              x1="4.2282"
              y1="73.1377"
              x2="48.9367"
              y2="39.3623"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0.58" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_6284_235695"
              x1="47.4283"
              y1="8.85676"
              x2="51.4098"
              y2="1.38133"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF9900" />
              <stop offset="1" stop-color="#FFEE94" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_6284_235695"
              x1="19.813"
              y1="28.1869"
              x2="23.7945"
              y2="20.7115"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF9900" />
              <stop offset="1" stop-color="#FFEE94" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_6284_235695"
              x1="61.696"
              y1="46.597"
              x2="65.6774"
              y2="39.1215"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF9900" />
              <stop offset="1" stop-color="#FFEE94" />
            </linearGradient>
            <clipPath id="clip0_6284_235695">
              <rect width="80" height="80" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    } else {
      g = t("morning");
      s = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M65.1961 41.5205C65.1961 56.6447 53.0501 68.9052 38.0673 68.9052C23.0845 68.9052 10.9385 56.6447 10.9385 41.5205C10.9385 26.3963 23.0845 14.1357 38.0673 14.1357C53.0501 14.1357 65.1961 26.3963 65.1961 41.5205Z"
            fill="url(#paint0_linear_6284_235690)"
          />
          <path
            d="M39.1599 62.459C39.0671 61.9338 39.0187 61.3936 39.0187 60.8421C39.0187 55.6834 43.2545 51.5015 48.4797 51.5015C52.3642 51.5015 55.7019 53.8127 57.159 57.1183C58.3394 56.1121 59.8711 55.5046 61.5449 55.5046C65.2772 55.5046 68.3028 58.5249 68.3028 62.2506C68.3028 62.4581 68.2934 62.6634 68.2751 62.8661C70.0702 63.7342 71.3063 65.5557 71.3063 67.6623C71.3063 70.6101 68.8858 72.9998 65.9 72.9998H40.3702C37.3844 72.9998 34.9639 70.6101 34.9639 67.6623C34.9639 65.1253 36.7568 63.0016 39.1599 62.459Z"
            fill="url(#paint1_linear_6284_235690)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_6284_235690"
              x1="33.9465"
              y1="56.4261"
              x2="56.5855"
              y2="17.0918"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF9900" />
              <stop offset="1" stop-color="#FFEE94" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_6284_235690"
              x1="68.9948"
              y1="71.0803"
              x2="32.4242"
              y2="43.6358"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0.58" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    return { g, s };
  }

  return (
    <div className="bg-white shadow-3xl rounded-md ">
      <div className="py-8 w-full flex items-center justify-center text-3xl font-thin ">
        <span className="bg-gradient-to-r from-[#c6e1e4] p-2 rounded-full">
          {getGreetingTime(moment())?.s}
        </span>
        <div className="">
          {getGreetingTime(moment())?.g}
          <p className="text-sm w-full justify-center items-center text-center text-gray-500 italic">
            AFO - Preschool App
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="pb-16 px-4 grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-6 h-full">
          {menu.map((item: any) => {
            return (
              <div
                onClick={() =>
                  router.push(
                    `${item.child ? item.child[0].pathname : item.pathname}`
                  )
                }
                key={item.name}
                style={{ backgroundColor: item.color }}
                className={`relative hover:scale-105 cursor-pointer border-2 border-gray-100 hover:border-orange-200 shadow-3xl transition-all max-w-[200px] max-h-[#200px] rounded-xl`}
              >
                <Image
                  src={`/bg-card.webp`}
                  className="p-2 invisible"
                  alt=""
                  width={200}
                  height={200}
                />
                <div className="absolute top-0 w-full h-full">
                  <div className="flex justify-center items-center h-full">
                    <Image
                      src={`/icons/${item.img}`}
                      className="p-2 mt-4 md:w-[100px] w-[55px]"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="absolute flex md:top-6 top-4 w-full justify-center h-full md:text-lg text-sm font-thin">
                    {t(item.text)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
