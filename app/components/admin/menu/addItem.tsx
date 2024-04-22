"use client";

import FoodRes from "@/types/FoodRes";
import removeVietnameseTones from "@/utils/removeTones";
import { useMemo, useState } from "react";

interface Props<T> {
  onAdd: (food: T) => void;
  dataSource: T[];
  getName: (x: T) => string;
  getKey: (x: T) => string;
  placeholder?: string;
  width?: string;
  visible?: boolean;
  hideBtn?: boolean;
  emptyMsg?: string;
  hightLightPlaceholder?: boolean;
  disable?: boolean;
}

function AddItem<T = FoodRes>({
  onAdd,
  dataSource,
  getName,
  getKey,
  placeholder,
  disable,
  width,
  visible,
  hideBtn,
  emptyMsg,
  hightLightPlaceholder,
}: Props<T>) {
  const [keyword, setKeyword] = useState("");

  if (!placeholder) placeholder = "Thêm món";
  if (!width) width = "100%";

  const hints = useMemo(() => {
    return dataSource.filter((x) =>
      removeVietnameseTones(getName(x))
        .toLowerCase()
        .includes(removeVietnameseTones(keyword).toLowerCase())
    );
  }, [dataSource, keyword]);

  const onSubmit = () => {
    var food: T = hints[0];
    if (!food) return;

    onChooseHint(food);
  };

  const onChooseHint = (food: T) => {
    onAdd(food);
    setKeyword("");
  };

  return (
    <div
      className={`${
        keyword == "" && !visible ? "invisible" : ""
      } group-hover:visible`}
    >
      <div className="flex relative group/search">
        <input
          type="text"
          name="food"
          placeholder={placeholder}
          className={`${hints?.length > 0 ? "" : "text-red-400"} ${
            hightLightPlaceholder ? "placeholder:text-black" : ""
          } w-full outline-none peer border border-slate-300 p-3 rounded-md flex-1 px-8`}
          onChange={(e) => setKeyword(e.currentTarget.value)}
          value={keyword}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
          disabled={disable}
        />
        <div
          style={{ width: width }}
          className={`absolute left-0 -bottom-1 translate-y-[100%] w-full rounded-md border-slate-200 shadow-2xl border bg-white max-h-[200px] overflow-auto invisible peer-focus:visible hover:visible z-40`}
        >
          {hints.map((x) => (
            <div
              key={getKey(x)}
              className="hover:bg-gray-100 rounded-md py-[5px] m-1 px-2 cursor-pointer"
              onClick={() => onChooseHint(x)}
            >
              {getName(x)}
            </div>
          ))}

          {emptyMsg && hints.length < 1 && (
            <div className="hover:bg-white py-[5px] px-1 cursor-pointer italic">
              {emptyMsg}
            </div>
          )}
        </div>

        {!hideBtn && (
          <button
            onClick={onSubmit}
            className={`${
              hints?.length > 0 ? "bg-blue-500" : "bg-gray-500"
            }  text-white font-bold py-1 px-2 rounded`}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default AddItem;
