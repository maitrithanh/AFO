import React from "react";

const CalendarPage = () => {
  return (
    <div className="md:w-2/3 w-full m-auto">
      <div className="flex justify-between items-center w-full ">
        <div className="flex items-center">
          <select
            id="month"
            className="bg-gray-50 border cursor-pointer outline-none border-gray-300 my-2 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="thang1">Tháng 1</option>
            <option value="thang2">Tháng 2</option>
            <option value="thang3">Tháng 3</option>
            <option value="thang4">Tháng 4</option>
            <option value="thang5">Tháng 5</option>
            <option value="thang6">Tháng 6</option>
            <option value="thang7">Tháng 7</option>
            <option value="thang8">Tháng 8</option>
            <option value="thang9">Tháng 9</option>
            <option value="thang10">Tháng 10</option>
            <option value="thang11">Tháng 11</option>
            <option value="thang12">Tháng 12</option>
          </select>

          <select
            id="week"
            className="bg-gray-50 border cursor-pointer outline-none border-gray-300 mx-2 my-2 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="1">Tuần 1</option>
            <option value="2">Tuần 2</option>
            <option value="3">Tuần 3</option>
            <option value="4">Tuần 4</option>
          </select>
        </div>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default h-full">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-6 rounded-t-sm bg-main text-white">
              <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Thứ hai </span>
                <span className="block lg:hidden"> T2 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Thứ ba </span>
                <span className="block lg:hidden"> T3 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Thứ tư </span>
                <span className="block lg:hidden"> T4 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Thứ 5 </span>
                <span className="block lg:hidden"> T5 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Thứ 6 </span>
                <span className="block lg:hidden"> T6 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Thứ 7 </span>
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
