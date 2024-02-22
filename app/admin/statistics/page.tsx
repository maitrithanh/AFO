import React from "react";
import { MdOutlineShowChart } from "react-icons/md";

const Statistics = () => {
  return (
    <div className="">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="h-[132px] md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <p className="text-md text-gray-400">Total Page Views</p>
          <div className="flex">
            <p className="text-2xl font-bold">4,42,236</p>
            <div className="bg-[#1677FF] text-white flex items-center rounded-sm px-2 ml-2">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="rise"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M917 211.1l-199.2 24c-6.6.8-9.4 8.9-4.7 13.6l59.3 59.3-226 226-101.8-101.7c-6.3-6.3-16.4-6.2-22.6 0L100.3 754.1a8.03 8.03 0 000 11.3l45 45.2c3.1 3.1 8.2 3.1 11.3 0L433.3 534 535 635.7c6.3 6.2 16.4 6.2 22.6 0L829 364.5l59.3 59.3a8.01 8.01 0 0013.6-4.7l24-199.2c.7-5.1-3.7-9.5-8.9-8.8z"></path>
              </svg>
              <p className="ml-1">59.3%</p>
            </div>
          </div>
          <p className="pt-[18px]">
            You made an extra <span className="text-main">35,000</span> this
            year
          </p>
        </div>

        <div className="h-[132px] md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <p className="text-md text-gray-400">Total Page Views</p>
          <div className="flex">
            <p className="text-2xl font-bold">4,42,236</p>
            <div className="bg-[#1677FF] text-white flex items-center rounded-sm px-2 ml-2">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="rise"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M917 211.1l-199.2 24c-6.6.8-9.4 8.9-4.7 13.6l59.3 59.3-226 226-101.8-101.7c-6.3-6.3-16.4-6.2-22.6 0L100.3 754.1a8.03 8.03 0 000 11.3l45 45.2c3.1 3.1 8.2 3.1 11.3 0L433.3 534 535 635.7c6.3 6.2 16.4 6.2 22.6 0L829 364.5l59.3 59.3a8.01 8.01 0 0013.6-4.7l24-199.2c.7-5.1-3.7-9.5-8.9-8.8z"></path>
              </svg>
              <p className="ml-1">59.3%</p>
            </div>
          </div>
          <p className="pt-[18px]">
            You made an extra <span className="text-main">35,000</span> this
            year
          </p>
        </div>
        <div className="h-[132px] md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <p className="text-md text-gray-400">Total Page Views</p>
          <div className="flex">
            <p className="text-2xl font-bold">4,42,236</p>
            <div className="bg-[#FAAD14] text-white flex items-center rounded-sm px-2 ml-2">
              <p className=" rotate-5">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="fall"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M925.9 804l-24-199.2c-.8-6.6-8.9-9.4-13.6-4.7L829 659.5 557.7 388.3c-6.3-6.2-16.4-6.2-22.6 0L433.3 490 156.6 213.3a8.03 8.03 0 00-11.3 0l-45 45.2a8.03 8.03 0 000 11.3L422 591.7c6.2 6.3 16.4 6.3 22.6 0L546.4 490l226.1 226-59.3 59.3a8.01 8.01 0 004.7 13.6l199.2 24c5.1.7 9.5-3.7 8.8-8.9z"></path>
                </svg>
              </p>
              <p className="ml-1">59.3%</p>
            </div>
          </div>
          <p className="pt-[18px]">
            You made an extra <span className="text-main">35,000</span> this
            year
          </p>
        </div>
        <div className="h-[132px] md:w-4/12 w-12/12 border-[#e6ebf1] bg-white shadow-sm p-[18px] rounded-sm">
          <p className="text-md text-gray-400">Total Page Views</p>
          <div className="flex">
            <p className="text-2xl font-bold">4,42,236</p>
            <div className="bg-[#1677FF] text-white flex items-center rounded-sm px-2 ml-2">
              <MdOutlineShowChart />
              <p className="ml-1">59.3%</p>
            </div>
          </div>
          <p className="pt-[18px]">
            You made an extra <span className="text-main">35,000</span> this
            year
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
