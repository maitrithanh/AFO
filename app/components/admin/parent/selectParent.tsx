"use client";

import ParentListRes from "@/types/ParentListRes";
import { checkNameInclude } from "@/utils/compare";
import useFetch from "@/utils/useFetch";
import { useMemo, useState } from "react";
import SearchBar from "../../shared/searchBar";

interface Props {
  selectId: string;
  setSelectId: (s: string) => void;
}

const SelectParent = ({ selectId, setSelectId }: Props) => {
  const [keyword, setKeyword] = useState("");

  const { data: dataParent } = useFetch<ParentListRes[]>("Parent/GetList");
  const searchParent = (c: ParentListRes): boolean => {
    const matchName: boolean = checkNameInclude(c.fullName || "", keyword);
    const matchPhone: boolean = (c.phoneNumber || "").includes(keyword);
    return matchName || matchPhone;
  };

  const searchHints = useMemo(() => {
    var names = dataParent?.map((x) => x.fullName || "") || [];
    var phones = dataParent?.map((x) => x.phoneNumber || "") || [];
    return [...names, ...phones];
  }, [dataParent]);

  const onSearch = (s: string) => {
    setKeyword(s);
  };

  return (
    <>
      <div className="flex w-full justify-center items-center my-5">
        <div className="w-[350px]">
          <SearchBar
            dataSource={searchHints}
            placeholder="Nhập tên hoặc số điện thoại..."
            onSearch={onSearch}
            autoSearch={true}
          />
        </div>
      </div>

      <div className="relative max-h-[380px] overflow-auto shadow-3xl sm:rounded-lg mb-5">
        {keyword && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th></th>
                <th scope="col" className="px-6 py-3">
                  Tên Phụ Huynh
                </th>
                <th scope="col" className="px-6 py-3">
                  Sđt
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày sinh
                </th>
                <th>Tên Trẻ</th>
              </tr>
            </thead>
            <tbody>
              {[...(dataParent || [])].filter(searchParent).map((x, i) => {
                return (
                  <tr
                    key={x.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="radio"
                        name="selectParent"
                        id={x.id}
                        title={x.id}
                        value={x.id}
                        checked={selectId === x.id}
                        onChange={(e) => setSelectId(e.target.value)}
                      />
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {x.fullName}
                    </th>
                    <td className="px-6 py-4">{x.phoneNumber}</td>
                    <td className="px-6 py-4">{x.birthDay}</td>
                    <td>
                      <pre>{x.children.map((x) => x.fullName).join(",\n")}</pre>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default SelectParent;
