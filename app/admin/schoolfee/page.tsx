import React from "react";

const SchoolFee = () => {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Lớp
              </th>
              <th scope="col" className="px-6 py-3">
                Năm học
              </th>
              <th scope="col" className="px-6 py-3">
                Ngôn ngữ
              </th>
              <th scope="col" className="px-6 py-3">
                Học Phí
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                A1
              </th>
              <td className="px-6 py-4">2024-2025</td>
              <td className="px-6 py-4">Song Ngữ (Anh - Việt)</td>
              <td className="px-6 py-4">199.000.000 đ</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                A2
              </th>
              <td className="px-6 py-4">2024-2025</td>
              <td className="px-6 py-4">Anh</td>
              <td className="px-6 py-4">99.000.000 đ</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                A3
              </th>
              <td className="px-6 py-4">2024-2025</td>
              <td className="px-6 py-4">Pháp</td>
              <td className="px-6 py-4">99.000.000 đ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolFee;
