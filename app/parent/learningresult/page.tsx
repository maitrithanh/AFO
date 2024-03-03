import React from "react";
import { CiCircleMore } from "react-icons/ci";

const LearningResult = () => {
  return (
    <div className="h-[600px] bg-white md:w-3/4 m-auto rounded-xl">
      <div className="relative overflow-x-auto  bg-white pt-2 sm:rounded-lg">
        <div className="p-4">
          <p className="text-3xl flex justify-center items-center pb-4 border-b mb-4">
            Kết quả học tập tháng 03/2024
          </p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl">Họ tên: Nguyễn Văn A</p>
              <p className="text-xl">Lớp: Mầm 1</p>
            </div>
            <table className="border">
              <thead>
                <tr className="text-center border">
                  <td className="border p-2">Có phép</td>
                  <td className="border p-2">Không phép</td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border p-1">29</td>
                  <td className="border p-1">1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px] ">
              <thead className="text-md text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-3">
                    Ngày
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Đánh giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Điểm
                  </th>

                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">01/03/2024</td>
                  <td className="px-6 py-4">Tích cực</td>
                  <td className="px-6 py-4">10 Điểm</td>
                  <td className="md:px-6 md:py-4 hover hover:text-main">
                    <CiCircleMore size={24} />
                  </td>
                </tr>
                <tr className="odd:bg-white text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">02/03/2024</td>
                  <td className="px-6 py-4">Tích cực</td>
                  <td className="px-6 py-4">10 Điểm</td>
                  <td className="md:px-6 md:py-4 hover hover:text-main">
                    <CiCircleMore size={24} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-between mt-4">
            <div></div>
            <div>
              <p className="text-xl">Giáo viên đánh giá: Lê Hồng Hà</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningResult;
