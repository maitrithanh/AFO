"use client";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import useFetch from "@/utils/useFetch";
import { CiCircleMore } from "react-icons/ci";

const MenuTable = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: MenuData } = useFetch(`/Menu/List`);

  const getWeekName = (week: string = "") => {
    var arr: string[] = week.split("-W");
    return "Tuần " + arr[1] + " - " + arr[0];
  };
  return (
    <div className="pb-5">
      <div className="rounded-md">
        <div className="flex justify-between items-center">
          <div className="p-2">
            <p className="text-2xl ">Danh sách thực đơn</p>
          </div>
        </div>
        <div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-2"
            onClick={() => router.push("/admin/menu/add")}
          >
            + {t("addNew")}
          </button>
        </div>
        <div className="relative shadow-3xl sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]">
            <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tên thực đơn
                </th>
                <th scope="col" className="px-6 py-3">
                  Mô tả
                </th>
                <th scope="col" className="px-6 py-3">
                  Áp dụng
                </th>

                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {MenuData?.map((allMenu: any) => {
                return (
                  <tr
                    key={allMenu.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {allMenu.name}
                    </th>
                    <td className="px-6 py-4 md:max-w-[600px]">
                      {allMenu.desc}
                    </td>
                    <td className="px-6 py-4">
                      {getWeekName(allMenu.start)} đến{" "}
                      {getWeekName(allMenu.end)}
                    </td>

                    <td
                      className="md:px-6 md:py-4 hover hover:text-main"
                      onClick={() => router.push(`/admin/menu/${allMenu.id}`)}
                    >
                      <CiCircleMore size={24} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuTable;
