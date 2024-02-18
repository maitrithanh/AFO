import SelectWeek from "@/app/components/admin/menu/SelectWeek";
import React from "react";

const MenuOfWeekPage = () => {
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold  rounded px-4 py-2">
            + Thêm
          </button>
        </div>
        <SelectWeek />
      </div>
      <table className="table-auto w-full text-left ">
        <thead className=" rounded-lg text-[#575757]">
          <tr className="bg-[#FFD9BF] h-12 rounded-t-[12px]">
            <th className="border-r-[2px] rounded-tl-[12px] border-white p-2 md:w-[180px]">
              Thời gian
            </th>
            <th className="p-2">Thứ 2</th>
            <th className="p-2">Thứ 3</th>
            <th className="p-2">Thứ 4</th>
            <th className="p-2">Thứ 5</th>
            <th className="p-2 rounded-tr-[12px]">Thứ 6</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="">
            <td className="p-2 border">Ăn sáng</td>
            <td className="p-2 border">Mì Hải Sản, Sữa</td>
            <td className="p-2 border">Mì Hải Sản, Sữa</td>
            <td className="p-2 border">Mì Hải Sản, Sữa</td>
            <td className="p-2 border">Mì Hải Sản, Sữa</td>
            <td className="p-2 border">Mì Hải Sản, Sữa</td>
          </tr>
          <tr className="">
            <td className="p-2 border">Ăn Giữa Buổi</td>
            <td className="p-2 border">Yaourt</td>
            <td className="p-2 border">Yaourt</td>
            <td className="p-2 border">Yaourt</td>
            <td className="p-2 border">Yaourt</td>
            <td className="p-2 border">Yaourt</td>
          </tr>
          <tr className="">
            <td className="p-2 border">Ăn Trưa</td>
            <td className="p-2 border">
              Canh chua cá lốc bốc xương, cơm, cà ri gà , đậu cove, chuối cau
            </td>
            <td className="p-2 border">
              Canh chua cá lốc bốc xương, cơm, cà ri gà , đậu cove, chuối cau
            </td>
            <td className="p-2 border">
              Canh chua cá lốc bốc xương, cơm, cà ri gà , đậu cove, chuối cau
            </td>
            <td className="p-2 border">
              Canh chua cá lốc bốc xương, cơm, cà ri gà , đậu cove, chuối cau
            </td>
            <td className="p-2 border">
              Canh chua cá lốc bốc xương, cơm, cà ri gà , đậu cove, chuối cau
            </td>
          </tr>
          <tr className="">
            <td className="p-2 border">Ăn Xế + Uống Sữa</td>
            <td className="p-2 border">Bánh gấu nhân kem, Sữa</td>
            <td className="p-2 border">Bánh gấu nhân kem, Sữa</td>
            <td className="p-2 border">Bánh gấu nhân kem, Sữa</td>
            <td className="p-2 border">Bánh gấu nhân kem, Sữa</td>
            <td className="p-2 border">Bánh gấu nhân kem, Sữa</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MenuOfWeekPage;
