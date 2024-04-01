"use client";

import { Input } from "@/components/ui/input";
import { checkNameInclude } from "@/utils/compare";
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface Props {
  dataSource: string[];
  onSearch: (s: string) => void;
  placeholder?: string;
  autoSearch?: boolean;
}

const SearchBar = ({
  dataSource,
  onSearch,
  placeholder,
  autoSearch,
}: Props) => {
  const [search, setSearch] = useState("");

  const hints = useMemo(() => {
    const hints: string[] = dataSource.filter((x) =>
      checkNameInclude(x, search)
    );

    var res = Array.from(new Set(hints)); //remove dup
    return res;
  }, [search, dataSource]);

  const timer = useRef<any>();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    var s = e.currentTarget.value;
    setSearch(s);
    if (!autoSearch) return;

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onSearch(s);
    }, 300);
  };

  const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || autoSearch) return;
    onSearch(search);
  };

  const onChooseHint = (s: string) => {
    setSearch(s);
    onSearch(s);
  };

  return (
    <div className="shadow-lg rounded-lg w-full relative group">
      <form
        className="flex items-center jc max-w-sm mx-auto w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder={placeholder}
            value={search}
            className={`peer ${
              hints.length > 0 ? "" : "text-red-500"
            } bg-white border focus-visible:outline-main border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            onChange={onChange}
            onKeyDown={onSearchKeyDown}
          />
        </div>
      </form>

      {/* <Input
        type="text"
        placeholder={placeholder}
        value={search}
        className={`peer ${hints.length > 0 ? "" : "text-red-500"}`}
        onChange={(e) => setSearch(e.currentTarget.value)}
        onKeyDown={onSearchKeyDown}
      /> */}
      <div className="absolute left-0 bottom-0 z-10 translate-y-[100%] w-full max-h-[150px] overflow-y-auto bg-white shadow-lg rounded-lg invisible peer-focus:visible group-hover:visible">
        {search &&
          !autoSearch &&
          hints.map((x) => (
            <div
              key={x}
              className="py-2 px-3 hover:bg-gray-200"
              onClick={() => onChooseHint(x)}
            >
              {x}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
