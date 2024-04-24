"use client";

import MyPagination from "@/components/ui/pagination";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import SearchBar from "./searchBar";
import { checkNameInclude } from "@/utils/compare";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { t } from "i18next";
import { toYMD } from "@/utils/dateTime";
import { Asap_Condensed } from "next/font/google";
import { baseURL } from "@/utils/callApi";
import { FaDownload, FaFileExcel } from "react-icons/fa6";
import SelectAddress from "./selectAddress";

const font_asap_condensed = Asap_Condensed({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

//default values
//icon của action
const DefaultActionIcon = (
  <Image
    title="Chi tiết"
    src={"/icons/detail.webp"}
    alt="Detail"
    width={26}
    height={26}
    priority
    className="hover:scale-110 transition-all min-w-[26px] min-h-[26px]"
  />
);
//số dòng mỗi trang
const DefaultRowPerPage = 20;

export interface TableTemplateAction<T = any> {
  icon?: JSX.Element;
  //trả đường link theo object
  //vd: (x) => `/admin/listparent/${x.id}`
  getLink?: (obj: T) => string;
  //hoặc là sự kiện
  onClick?: (obj: T) => void;
}

interface IObject {
  [id: string]: any;
}

export interface TableTemplateColumn<T = any> {
  width?: any;
  //tên cột
  title: string;
  //callback để lấy thuộc tính từ object, trả về string hoặc element
  //vd: (x) => x.fullName
  getData: (obj: T) => string | JSX.Element | undefined;
}

export interface TableTemplateSort<T = any> {
  compare: (a: T, b: T) => number;
  title: string;
}

export interface FilterOptions<T = any> {
  value: string;
  filter: (obj: T) => boolean;
}

export interface TableTemplateFilter<T = any> {
  name: string;
  options: FilterOptions[];
  autoFilter?: (obj: T) => string;
}

export interface TableTemplateRange<T = any> {
  name: string;
  filter: (obj: T, from: string, to: string) => boolean;
}

//T khỏi truyền cũng được
interface Props<T extends IObject> {
  width?: any;
  //tên trang
  title: string;
  //list data từ api
  dataSource: T[];
  //ds các cột
  columns: TableTemplateColumn<T>[];

  //các actions ở cột cuối
  actions?: TableTemplateAction<T>[];
  //ds các cột có thể tìm kiếm
  searchColumns?: TableTemplateColumn<T>[];
  searchPlaceHolder?: string;
  //ds sắp xếp, >= 2 mới hiện dropdown
  //có thể truyền 1 cái làm thứ tự mặc định
  sortOptions?: TableTemplateSort[];
  addButton?: {
    button?: JSX.Element;
    link?: string;
    onClick?: () => void;
  };
  //url download excel
  exportExcel?: string;
  //getAddress
  searchAddress?: (obj: T) => string;

  //dropdown filter
  filters?: TableTemplateFilter[];
  //date range
  dateRange?: TableTemplateRange;
  //extra
  extraElementsToolBar?: JSX.Element;
  getKey?: (obj: T) => string;

  //options
  hideIndex?: boolean;
  hidePaging?: boolean;
  rowPerPage?: number;
}

function TableTemplate<T extends IObject = any>({
  width,
  title,
  dataSource,
  columns,
  actions,
  addButton,
  searchColumns,
  searchPlaceHolder,
  sortOptions,
  filters,
  dateRange,
  extraElementsToolBar,
  hideIndex,
  hidePaging,
  rowPerPage,
  getKey,
  exportExcel,
  searchAddress,
}: Props<T>) {
  //init
  if (!rowPerPage) rowPerPage = DefaultRowPerPage;
  if (!getKey) getKey = (obj) => obj["id"];

  //auto filter
  useEffect(() => {
    filters?.forEach((x) => {
      if (x.autoFilter) {
        var opts = Array.from(new Set(dataSource.map((y) => x.autoFilter!(y))));

        x.options = opts.map((y) => {
          var opt: FilterOptions = {
            value: y,
            filter: (obj) => x.autoFilter!(obj) == y,
          };
          return opt;
        });

        //all
        if (opts.length > 1) {
          var opt: FilterOptions = {
            value: "Tất cả",
            filter: () => true,
          };
          x.options = [opt, ...x.options];
        }
      }
    });
  }, [dataSource]);

  //filter for searching
  const filter = (obj: T): boolean => {
    if (searchColumns?.length) {
      for (var i = 0; i < searchColumns.length; i++) {
        var col = searchColumns[i];

        var data = col.getData(obj);
        if (typeof data == "string") {
          console.log(
            col.getData(obj) as string,
            keyword,
            checkNameInclude(col.getData(obj) as string, keyword)
          ); //
          if (checkNameInclude(col.getData(obj) as string, keyword))
            return true;
        }
      }
    }

    return false;
  };

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(""); //searching
  const [sort, setSort] = useState(0);
  const [filterOpt, setFilterOpt] = useState<number[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setPage(1);
  }, [keyword, sort]);

  useEffect(() => {
    var arr: number[] = [];
    filters?.forEach((x) => arr.push(0));
    setFilterOpt(arr);
  }, [filters]);

  const filteredData = useMemo(() => {
    var list = [...dataSource];
    if (searchColumns?.length && keyword) list = list.filter(filter);

    if (filters?.length) {
      for (var i = 0; i < filters.length; i++) {
        var filterOptions = filters[i];
        var option = filterOptions.options[filterOpt[i]];
        if (option?.filter) list = list.filter(option.filter);
      }
    }

    if (dateRange) {
      if (list && list[0])
        console.log(
          toYMD(list[0].startDate),
          list[0].endDate,
          fromDate,
          toDate
        ); //
      list = list.filter((x) => dateRange.filter(x, fromDate, toDate));
    }

    if (searchAddress) {
      console.log("addr", address.split("&")); //
      list = list.filter((x) => {
        if (!address.replace("&", "").length) return true;

        //get address info from current item
        var currAddr = searchAddress(x);
        var arr = currAddr.split("&");
        if (arr.length < 4) return false;
        const [st, ward, dist, city] = arr;

        //address info from search inputs
        arr = address.split("&");
        //compare city
        if (arr.length > 3 && arr[3] && city != arr[3]) return false;
        //compare district
        if (arr.length > 2 && arr[2] && dist != arr[2]) return false;
        //compare ward
        if (arr.length > 1 && arr[1] && ward != arr[1]) return false;

        return true;
      });
    }

    if (sortOptions?.length && sortOptions?.length > sort) {
      var comp = sortOptions[sort].compare;
      list = [...list].sort(comp);
    }

    return list;
  }, [
    dataSource,
    searchColumns,
    keyword,
    sort,
    filterOpt,
    filters,
    fromDate,
    toDate,
    address,
    searchAddress,
  ]);

  const PageCount = useMemo(() => {
    return Math.ceil(filteredData.length / rowPerPage!);
  }, [filteredData]);

  const searchHints = useMemo(() => {
    var hints: string[] = [];
    if (!searchColumns?.length) return [];

    searchColumns.forEach((col) => {
      dataSource.forEach((dataSrc) => {
        var data = col.getData(dataSrc);
        if (typeof data == "string") hints.push(data as string);
      });
    });

    return hints;
  }, [dataSource]);

  const onSearch = (s: string) => {
    setKeyword(s);
  };

  const DefaultAddBtn = (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={() => {
        if (addButton?.onClick) addButton.onClick();
      }}
    >
      + {t("addNew")}
    </button>
  );

  const onChangeFromDate = (e: ChangeEvent<HTMLInputElement>) => {
    var val = e.target.value;
    setFromDate(val);
    if (val > toDate) setToDate(val);
  };

  const onChangeToDate = (e: ChangeEvent<HTMLInputElement>) => {
    var val = e.target.value;
    setToDate(val);
    if (val < fromDate) setFromDate(val);
  };

  return (
    <>
      <div className="">
        <h2
          className={`text-2xl font-bold mb-2 ${font_asap_condensed.className}`}
        >
          {title}
        </h2>
      </div>

      <div className="bg-white shadow-3xl rounded-md">
        <div className="md:flex md:justify-between items-center mb-2 py-3 mx-2">
          <div className="flex items-center flex-wrap gap-4 pl-4">
            {/* search */}
            {searchColumns?.length && (
              <div className="flex items-center">
                <div className="w-[300px] bg-white">
                  <SearchBar
                    dataSource={searchHints}
                    placeholder={searchPlaceHolder}
                    onSearch={onSearch}
                    autoSearch={true}
                  />
                </div>
              </div>
            )}

            {/* more tools */}
            {extraElementsToolBar && <div>{extraElementsToolBar}</div>}

            {/* filters */}
            {filters?.map((filterOptions, i) => (
              <div
                key={i}
                className="border flex justify-center items-center shadow-sm rounded-sm"
              >
                <Select
                  onValueChange={(value: any) => {
                    var arr = [...filterOpt];
                    arr[i] = value;
                    setFilterOpt(arr);
                  }}
                >
                  <SelectTrigger className="min-w-[200px] text-lg">
                    <p className="mr-2 text-gray-600">{filterOptions.name}:</p>
                    <SelectValue
                      placeholder={filterOptions.options[0]?.value}
                      defaultValue={"0"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.options.map((x, j) => (
                      <SelectItem key={x.value} value={j + ""}>
                        {x.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            {/* sorts */}
            {sortOptions?.length && (
              <div className="bg-white border shadow-sm rounded-sm">
                <Select
                  onValueChange={(value: any) => {
                    setSort(value);
                  }}
                >
                  <SelectTrigger className="min-w-[200px] text-lg">
                    <p className="mr-2 text-gray-600">Sắp xếp:</p>
                    <SelectValue
                      placeholder={sortOptions[0].title}
                      defaultValue={"0"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((x, i) => (
                      <SelectItem key={x.title} value={i + ""}>
                        {x.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* date range */}
            {dateRange && (
              <div className="bg-gray-100 shadow-sm rounded-lg whitespace-nowrap px-3 py-2">
                <span className="mr-2">{dateRange.name}</span>
                <input
                  type="date"
                  title="Từ ngày"
                  value={fromDate}
                  className="bg-gray-100"
                  onChange={onChangeFromDate}
                />
                <span className="mx-2">—</span>
                <input
                  type="date"
                  title="Đến ngày"
                  value={toDate}
                  className="bg-gray-100"
                  onChange={onChangeToDate}
                />
              </div>
            )}

            {/* export excel button */}
            {exportExcel && (
              <a
                href={baseURL + "File/" + exportExcel}
                target="_blank"
                className="flex py-2 px-3 border-solid border border-gray-300 text-gray-600 rounded-lg gap-2 hover:text-green-700 hover:border-green-700"
              >
                <FaFileExcel />
                <button className="">Xuất file Excel</button>
                <FaDownload />
              </a>
            )}

            {/* search address */}
            {searchAddress && (
              <div className="w-[500px]">
                <SelectAddress
                  setAddress={(addr) => setAddress(addr)}
                  address={address}
                  hideStreet
                />
              </div>
            )}
          </div>

          {/* add button */}
          {addButton && (
            <div className="flex-1 flex justify-end px-4 md:m-0 my-2">
              <Link href={addButton.link ?? ""} className="whitespace-nowrap">
                {addButton.button || DefaultAddBtn}
              </Link>
            </div>
          )}
        </div>

        <div className="relative shadow-3xl sm:rounded-lg ">
          {filteredData?.length > 0 && (
            <div className="italic px-6 py-1">
              Hiển thị dòng {(page - 1) * rowPerPage! + 1} -{" "}
              {Math.min(page * rowPerPage!, filteredData.length)} trên{" "}
              {filteredData.length} dòng
            </div>
          )}
          <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]">
            <thead className="text-md w-full flex text-white uppercase bg-main text-md font-normal dark:bg-gray-700">
              <tr className="lg:table lg:table-fixed w-full">
                {!hideIndex && <th className="px-6 py-3 p-3 w-14">STT</th>}

                {columns.map((x) => (
                  <th
                    key={x.title}
                    scope="col"
                    className={`p-3 ${`w-[${x.width}px]`}`}
                  >
                    {x.title}
                  </th>
                ))}

                {actions?.length && (
                  <th className="w-24 p-3">
                    {/* actions */}{" "}
                    <span className="flex justify-center items-center">
                      Thao tác
                    </span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className=" md:block overflow-auto max-h-[570px] rounded-lg">
              {filteredData
                .slice((page - 1) * rowPerPage!, page * rowPerPage!)
                .map((row, i) => (
                  <tr
                    key={getKey!(row) ?? i}
                    className="odd:bg-white lg:table lg:table-fixed w-full odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="pl-6 py-4 w-14 p-3">
                      {i + 1 + (page - 1) * rowPerPage!}
                    </td>

                    {columns.map((col, j) => (
                      <td
                        key={i + "-" + j}
                        scope="row"
                        className={`max-w-[200px] p-3 font-medium text-gray-900 dark:text-white ${`w-[${col.width}px]`}`}
                      >
                        {col.getData(row)}
                      </td>
                    ))}
                    {actions?.length && (
                      <td className=" w-24 p-3">
                        <div className="flex justify-center items-center">
                          {actions?.map((act, i) => (
                            <Link
                              key={i}
                              href={act.getLink ? act.getLink(row) : ""}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                              onClick={
                                act.onClick
                                  ? () => {
                                      act.onClick!(row);
                                    }
                                  : () => {}
                              }
                            >
                              {act.icon ?? DefaultActionIcon}
                            </Link>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {!hidePaging && (
        <MyPagination page={page} setPage={setPage} PageCount={PageCount} />
      )}
    </>
  );
}

export default TableTemplate;
