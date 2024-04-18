"use client"; // dùng tạm //dùng luôn đi

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "@/utils/useFetch";
import ScheduleDetail, { ScheduleItem } from "@/types/ScheduleDetail";
import { getCookie } from "cookies-next";
import { time } from "console";
import ScheduleTable from "@/app/components/schedule/scheduleTable";
import moment from "moment";

const CalendarPage = () => {
  const { t } = useTranslation();

  const currWeek = moment().format("YYYY") + "-W" + moment().format("WW")
  const [weekStart, setWeekStart] = useState(currWeek);

  const id = getCookie("child");
  const { data } = useFetch<ScheduleDetail>(
    `Schedule/ScheduleOfChild/${id}?week=${weekStart}`,
    null,
    id
  );

  return (
    <div className=" w-full m-auto">

      {/* select week */}
      <div className="flex justify-between items-center w-full ">
        <div className="bg-white p-3 rounded-lg mb-3">
          <label htmlFor="" className="mr-2">
            Chọn tuần:
          </label>
          <input
            type="week"
            value={weekStart}
            className="bg-gray-100 p-2 focus:border-main focus:outline-main rounded-md"
            onChange={(e) => {
              setWeekStart(e.currentTarget.value);
            }}
            placeholder="Chọn tuần"
          />

          <i>
            {" (" +
              moment(weekStart, "YYYY-WWW").isoWeekday(1).format("DD/MM/YYYY") +
              "-" +
              moment(weekStart, "YYYY-WWW").isoWeekday(7).format("DD/MM/YYYY") +
              ")"}
          </i>
        </div>
      </div>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default h-full">
        {
          data &&
          <ScheduleTable dataSrc={data} isCurrWeek={weekStart == currWeek} />
        }
      </div>
    </div>
  );
};

export default CalendarPage;
