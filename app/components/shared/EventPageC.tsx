"use client";
import React from "react";

import useFetch from "@/utils/useFetch";
import { getMonth, getDay } from "@/utils/formatDate/getMonth";
import { formatDate } from "@/utils/formatDate/formatDate";

const EventPageC = () => {
  const day = new Date();
  const toDay = day.getDay();
  const year = day.getFullYear();
  const month = day.getMonth() + 1;

  const { data: eventData } = useFetch(`Events/getList?year=${year}`);

  return (
    <div className="w-full h-[88vh] overflow-auto m-auto rounded-lg bg-white p-4 md:p-10">
      <div className="pb-2 w-full">
        <div className="md:flex justify-between items-center">
          <div>
            <p className="w-fit rounded-2xl text-2xl font-bold ">
              Thông tin sự kiện năm:
              <span className="text-main mx-2">{year}</span>
            </p>
            <p>Sự kiện có thay đổi sẽ được thông báo</p>
          </div>
          <div></div>
        </div>
      </div>

      <div className="">
        {eventData?.map((event: any) => {
          return (
            <div
              key={event?.id}
              className={`relative p-4 w-full shadow-lg my-4 rounded-lg ${
                new Date(formatDate(event?.startDate)) <= day &&
                new Date(formatDate(event?.endDate)) >= day
                  ? "bg-main text-white"
                  : "bg-white"
              }`}
            >
              <div className="flex md:flex-row flex-col text-lg items-center justify-between w-full">
                <div className="flex items-center md:flex-row flex-col">
                  <p
                    className={`font-bold ${
                      new Date(formatDate(event?.endDate)) < day
                        ? "line-through"
                        : ""
                    }`}
                  >
                    {event?.title}
                  </p>
                  <p
                    className={`text-sm font-normal ml-4 w-fit px-2 h-8 flex justify-center items-center
                    ${
                      new Date(formatDate(event?.endDate)) < day
                        ? "bg-gray-400"
                        : "bg-green-500"
                    }  text-white p-1 rounded-full`}
                  >
                    {" "}
                    {new Date(formatDate(event?.endDate)) < day ? (
                      "Đã diễn ra"
                    ) : (
                      <p>
                        Nghỉ
                        <span className="bg-rose-500 px-2 rounded-full mx-1">
                          {event?.countDay}
                        </span>
                        ngày trong tháng{" "}
                        {getMonth(event?.startDate) == getMonth(event?.endDate)
                          ? getMonth(event?.startDate)
                          : `${getMonth(event?.startDate)} và ${getMonth(
                              event?.endDate
                            )}`}
                      </p>
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-thin">
                    Thời gian: {event?.startDate} - {event?.endDate}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventPageC;
