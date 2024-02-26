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
import useFetch from "@/utils/useFetch";
import ScheduleDetail, { ScheduleItem } from "@/types/ScheduleDetail";
import { getCookie } from "cookies-next";

const CalendarPage = () => {
  const { t } = useTranslation();
  const days = ["T2", "T3", "T4", "T5", "T6", "T7"]

  const id = getCookie('child');
  const { data } = useFetch<ScheduleDetail>('Schedule/ScheduleOfChild/' + id, null, id)

  const getTimeSpans = () => {
    var timeSpans = data?.items
      .sort((a, b) => a.begin > b.begin ? 1 : -1)
      .map(x => x.begin + ' - ' + x.end) || [];
    var unique = Array.from(new Set(timeSpans));
    return unique;
  }

  const ScheduleItemEl = ({day, time}: {day: number, time: string}) => { 
    var arr = time.split(' - ');
    if (arr.length < 2) return <></>;

    var begin = arr[0];
    var end = arr[1];

    //items of same times
    var itemsOfTime = data?.items.filter(x => x.begin === begin && x.end === end) || [];
    if (itemsOfTime.length < 0) return <></>

    //matched items
    var items = itemsOfTime.filter(x => x.day == day);
    if (!items || items.length < 1) return <></>
    var item = items[0];

    //expand row
    var colSpan = 1;
    var dupItems = itemsOfTime.filter(x => x.activity == item.activity)
    if (dupItems.length > 1) { 
      if (dupItems.indexOf(item) > 0) return <></>
      colSpan = dupItems.length;
    }

    return <td key={time + day} className={`col-span-${colSpan} ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
      <div className="group w-full flex-grow cursor-pointer ">
        <div className="event bg-[#eff4fb] left-2 z-30 mb-1 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left group-hover:opacity-100 dark:bg-meta-4 w-full md:opacity-100">
          <span className="event-name text-sm font-semibold text-black dark:text-white text-center">
            {item.activity}
          </span>
          {/* <span className="time text-sm font-medium text-black dark:text-white">
            {day} - {colSpan}
          </span> */}
        </div>
      </div>
    </td>
  }

  return (
    <div className="md:w-3/4 w-full m-auto">
      T-T
      <div className="flex justify-between items-center w-full ">
        <div className="flex items-center gap-2 mb-2">

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
            <tr className="grid grid-cols-7 rounded-t-sm bg-main text-white">
              <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Thời gian </span>
                <span className="block lg:hidden">  </span>
              </th>

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
            {data?.items && getTimeSpans().map(time => <>
              <tr className="grid grid-cols-7" key={time}>
                <th key={time} className="col-span-1 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                  <div className="group w-full flex-grow cursor-pointer ">
                    <div className="event bg-[#eff4fb] left-2 z-30 mb-1 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left group-hover:opacity-100 dark:bg-meta-4 w-full md:opacity-100">
                      <span className="event-name text-sm font-semibold text-black dark:text-white">
                        {time}
                      </span>
                    </div>
                  </div>
                </th>

                {days.map((dayName, day) => <>
                  <ScheduleItemEl day={day} time={time} />
                  {/* <td key={time + day} className={`col-span-1 ease flex items-center relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                    <div className="group w-full flex-grow cursor-pointer ">
                      <div className="event bg-[#eff4fb] left-2 z-30 mb-1 flex flex-col rounded-sm border-l-[3px] border-main bg-gray px-3 py-1 text-left group-hover:opacity-100 dark:bg-meta-4 w-full md:opacity-100">
                        <span className="event-name text-sm font-semibold text-black dark:text-white">
                          {getItem(day, time)}
                        </span>
                        <span className="time text-sm font-medium text-black dark:text-white">
                          {time}
                        </span>
                      </div>
                    </div>
                  </td> */}
                </>)}
              </tr>              
            </>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarPage;
