"use client";

import DetailMenuRes, { DetailMenuItem } from "@/types/DetailMenuRes";
import MealRes from "@/types/MealRes";
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import moment from "moment";

const MenuPage = () => {
  const [week, setWeek] = useState(
    moment().format("YYYY") + "-W" + moment().format("WW")
  );

  const { data: dataMenu, loading } = useFetch<DetailMenuRes>(
    "Menu/MenuOfWeek/" + week,
    null,
    week
  );
  const { data: dataMeal } = useFetch<MealRes[]>("Menu/ListMeal");

  const days = ["T2", "T3", "T4", "T5", "T6", "T7"];
  const mealTime = [10, 14, 24]; //tg kết thúc các bữa ăn (giả định)

  const getListFood = (day: number, meal: number): DetailMenuItem[] => {
    return (
      dataMenu?.items.filter((x) => x.day === day && x.idMeal === meal) || []
    );
  };

  const getWeekName = (week: string = "") => {
    var arr: string[] = week.split("-W");
    return "Tuần " + arr[1] + " - " + arr[0];
  };

  const isCurrentMeal = (day?: number, idMeal?: number): boolean => {
    if (day != undefined && moment().isoWeekday() - 1 !== day) return false;
    if (idMeal != undefined) {
      var i = dataMeal?.findIndex((x) => x.id === idMeal);
      if (i == undefined || i < 0 || i > mealTime.length) return false;

      var time = moment().hour();
      var j = mealTime.findIndex((x) => time < x);
      if (i !== j) return false;
    }

    return true;
  };

  return (
    <div className="bg-white w-full m-auto md:px-10 px-4 py-10 rounded-xl">
      <div className="flex justify-between items-center w-full">
        {dataMenu && (
          <div>
            <h2 className="text-2xl">{dataMenu?.menu.name}</h2>
            <i>
              Áp dụng từ: {getWeekName(dataMenu?.menu.start)} đến{" "}
              {getWeekName(dataMenu?.menu.end)}
            </i>
          </div>
        )}
        <div>
          <label htmlFor="" className="mr-2">
            Tuần:
          </label>
          <input
            type="week"
            value={week}
            className="bg-gray-100 p-2 focus:border-main focus:outline-main"
            onChange={(e) => {
              setWeek(e.currentTarget.value);
            }}
            placeholder="Chọn tuần"
          />
          <i>
            {" (" +
              moment(week, "YYYY-WWW").isoWeekday(1).format("DD/MM/YYYY") +
              "-" +
              moment(week, "YYYY-WWW").isoWeekday(7).format("DD/MM/YYYY") +
              ")"}
          </i>
        </div>
      </div>

      {loading ? (
        <div>
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div>
          <table className="w-full text-gray-500 dark:text-gray-400 text-center text-md mt-3 ">
            <thead className="text-xs text-gray-700 uppercase bg-[#FFD9BF] dark:bg-gray-700 dark:text-gray-400">
              <tr className="">
                <th className="rounded-tl-[12px]"></th>
                {days.map((x, i) => (
                  <th
                    className={`${
                      isCurrentMeal(i) ? `bg-[#FFC694]` : ""
                    } md:px-6 py-3 text-lg font-thin relative last:rounded-tr-[12px]`}
                    key={x}
                  >
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataMeal?.map((x) => (
                <tr
                  key={x.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 md:border"
                >
                  <th
                    className={`${
                      isCurrentMeal(undefined, x.id) ? `bg-[#FFC694]` : ""
                    } md:px-6 py-4 relative w-[10px]`}
                  >
                    <p className="font-thin md:text-[18px] -rotate-90 w-[10px]">
                      {x.name}
                    </p>
                  </th>

                  {days.map((y, i) => (
                    <td
                      key={`${x.id}-${i}`}
                      className={`${
                        isCurrentMeal(i, x.id) ? `text-[#FFC694] font-bold` : ""
                      } md:px-6 pt-2 min-h-[200px] border md:p-2`}
                    >
                      {getListFood(i, x.id).map((z, j) => (
                        <div key={`${x.id}-${i}-${j}`} className="flex md:p-1">
                          <span>{z.nameFood}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
