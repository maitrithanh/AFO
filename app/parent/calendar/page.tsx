"use client"; // dùng tạm
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const CalendarPage = () => {
  const { t } = useTranslation();
  return (
    <div className="md:w-2/3 w-full m-auto">
      <div className="flex justify-between items-center w-full ">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-white rounded-sm">
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder={t("month")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thang1">{t("month")} 1</SelectItem>
                <SelectItem value="thang2">{t("month")} 2</SelectItem>
                <SelectItem value="thang3">{t("month")} 3</SelectItem>
                <SelectItem value="thang4">{t("month")} 4</SelectItem>
                <SelectItem value="thang5">{t("month")} 5</SelectItem>
                <SelectItem value="thang6">{t("month")} 6</SelectItem>
                <SelectItem value="thang7">{t("month")} 7</SelectItem>
                <SelectItem value="thang8">{t("month")} 8</SelectItem>
                <SelectItem value="thang9">{t("month")} 9</SelectItem>
                <SelectItem value="thang10">{t("month")} 10</SelectItem>
                <SelectItem value="thang11">{t("month")} 11</SelectItem>
                <SelectItem value="thang12">{t("month")} 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white rounded-sm">
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder={t("week")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t("week")} 1</SelectItem>
                <SelectItem value="2">{t("week")} 2</SelectItem>
                <SelectItem value="3">{t("week")} 3</SelectItem>
                <SelectItem value="4">{t("week")} 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default h-full">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-6 rounded-t-sm bg-main text-white">
              <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> {t("monday")} </span>
                <span className="block lg:hidden"> T2 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block">{t("tuesday")} </span>
                <span className="block lg:hidden"> T3 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> {t("wednesday")} </span>
                <span className="block lg:hidden"> T4 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> {t("thursday")} </span>
                <span className="block lg:hidden"> T5 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> {t("friday")} </span>
                <span className="block lg:hidden"> T6 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> {t("saturday")} </span>
                <span className="block lg:hidden"> T7 </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Line 1 --> */}
            <tr className="grid grid-cols-6">
              <td className="col-span-6 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer ">
                  <div className="event bg-[#eff4fb] left-2 z-30 mb-1 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left group-hover:opacity-100 dark:bg-meta-4 w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Đón trẻ
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      7 giờ - 8 giờ
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            {/* <!-- Line 1 --> */}
            {/* <!-- Line 2 --> */}
            <tr className="grid grid-cols-6">
              <td className="col-span-6 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer ">
                  <div className="event bg-[#eff4fb] left-2 z-30 mb-1 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left group-hover:opacity-100 dark:bg-meta-4 md:visible  w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Ăn sáng
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      8 giờ - 8 giờ 45
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            {/* <!-- Line 2 --> */}
            {/* <!-- Line 3 --> */}
            <tr className="grid grid-cols-6">
              <td className="col-span-6 ease flex items-center relative h-24 ursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer">
                  <div className="event bg-[#eff4fb] left-2 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left group-hover:opacity-100 dark:bg-meta-4 md:visible  w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Thực hành
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      8 giờ 45 - 10 giờ 30
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            {/* <!-- Line 3 --> */}
            {/* <!-- Line 4 --> */}
            <tr className="grid grid-cols-24">
              <td className="col-span-6 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer ">
                  <div className="event bg-[#eff4fb] left-2 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left group-hover:opacity-100 dark:bg-meta-4 md:visible  w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Hoạt động thể chất / vận động
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      10 giờ 30 - 11 giờ
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            {/* <!-- Line 4 --> */}
            {/* <!-- Line 5 --> */}
            <tr className="grid grid-cols-24">
              <td className="col-span-6 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer ">
                  <div className="event bg-[#eff4fb] left-2 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left group-hover:opacity-100 dark:bg-meta-4 md:visible  w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Ăn trưa
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      11 giờ - 11 giờ 30
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            {/* <!-- Line 5 --> */}
            <tr className="grid grid-cols-6">
              <td className="col-span-6 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer ">
                  <div className="event bg-[#eff4fb] left-2 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left  dark:bg-meta-4 md:visible w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Ngủ trưa
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      11 giờ 30 - 13 giờ 45
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="grid grid-cols-6">
              <td className="col-span-6 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer ">
                  <div className="event bg-[#eff4fb] left-2 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left dark:bg-meta-4 md:visible w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Vận động nhẹ với âm nhạc
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      13 giờ 45 - 14 giờ
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="grid grid-cols-6">
              <td className="col-span-6 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer ">
                  <div className="event bg-[#eff4fb] left-2 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left dark:bg-meta-4 md:visible w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Ăn nhẹ chiều
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      14 giờ - 14 giờ 30
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="grid grid-cols-6">
              <td className="col-span-6 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer ">
                  <div className="event bg-[#eff4fb] left-2 z-30 mb-1 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left dark:bg-meta-4 md:visible w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Chương trình tiếng việt
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      14 giờ 30 - 15 giờ
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="grid grid-cols-6">
              <td className="col-span-6 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer">
                  <div className="event bg-[#eff4fb] left-2 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left dark:bg-meta-4 md:visible w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Âm nhạc, mỹ thuật, ngoại khoá, làm vườn
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      15 giờ - 16 giờ
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="grid grid-cols-6">
              <td className="col-span-6 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <div className="group w-full flex-grow cursor-pointer">
                  <div className="event bg-[#eff4fb] left-2 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left dark:bg-meta-4 md:visible w-full md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black dark:text-white">
                      Trả trẻ
                    </span>
                    <span className="time text-sm font-medium text-black dark:text-white">
                      16 giờ - 17 giờ
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarPage;
