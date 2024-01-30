import Link from "next/link";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SchoolFeePage = () => {
  return (
    <div className="md:w-2/3 w-full m-auto rounded-lg bg-white p-4 md:p-10">
      <div className="pb-2 w-full">
        <p className="w-fit rounded-2xl text-2xl font-bold ">
          Thông tin học phí
        </p>
        <p>Học phí sẽ được cập nhật liên tục mỗi tháng</p>
      </div>
      {/* <div className="text-xl rounded-xl w-full flex justify-between bg-white items-center ">
        <p className="w-fit p-2 rounded-2xl text-2xl">Thông tin học phí</p>
        <p className="w-fit p-2 rounded-2xl">
          Còn nợ: <strong>3.000.000 VNĐ</strong>
        </p>
      </div> */}
      <div className="h-[80px]">
        <div className="relative py-4 my-4 bg-white flex items-center w-full border-b">
          <div className="mr-2 text-rose-500">
            <MdOutlineRadioButtonUnchecked size={22} />
          </div>
          <div>
            <h3 className="text-lg">
              Học phí tháng 02/2024: <strong>1.500.000</strong>
            </h3>
            <p className="text-sm">Hạn nộp: từ 01/02/2024</p>
          </div>
          <div className="absolute right-2 text-main">
            <AlertDialog>
              <AlertDialogTrigger> Chi tiết</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center">
                    Chi tiết học phí tháng 02/2024
                    <p className="text-sm font-normal ml-4 bg-rose-500 text-white p-1 rounded-full">
                      Chưa thanh toán
                    </p>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div>
                      <div className="flex justify-between text-lg text-black">
                        <p className="mr-2">Phí học:</p>
                        <p className="font-bold">1.000.000</p>
                      </div>
                      <div className="flex justify-between text-lg text-black">
                        <p className="mr-2">Phí ăn uống:</p>
                        <p className="font-bold">500.000</p>
                      </div>
                      <div className="flex justify-between text-lg text-black">
                        <p className="mr-2">Miễn giảm:</p>
                        <p className="font-bold">0</p>
                      </div>
                      <div className="flex justify-between text-lg text-black pt-2 border-t">
                        <p className="mr-2">Tổng học phí:</p>
                        <p className="font-bold text-main">1.500.000</p>
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Thoát</AlertDialogCancel>
                  <AlertDialogAction className="bg-main hover:bg-orange-600">
                    Thanh toán
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="relative py-4  my-4 bg-white flex items-center w-full border-b">
        <div className="mr-2 text-rose-500">
          <MdOutlineRadioButtonUnchecked size={22} />
        </div>
        <div>
          <h3 className="text-lg">
            Học phí tháng 01/2024: <strong>1.500.000</strong>
          </h3>
          <p className="text-sm">Hạn nộp: từ 01/01/2024</p>
        </div>
        <div className="absolute right-2 text-main">
          <AlertDialog>
            <AlertDialogTrigger> Chi tiết</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center">
                  Chi tiết học phí tháng 01/2024
                  <p className="text-sm font-normal ml-4 bg-rose-500 text-white p-1 rounded-full">
                    Chưa thanh toán
                  </p>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div>
                    <div className="flex justify-between text-lg text-black">
                      <p className="mr-2">Phí học:</p>
                      <p className="font-bold">1.000.000</p>
                    </div>
                    <div className="flex justify-between text-lg text-black">
                      <p className="mr-2">Phí ăn uống:</p>
                      <p className="font-bold">500.000</p>
                    </div>
                    <div className="flex justify-between text-lg text-black">
                      <p className="mr-2">Miễn giảm:</p>
                      <p className="font-bold">0</p>
                    </div>
                    <div className="flex justify-between text-lg text-black pt-2 border-t">
                      <p className="mr-2">Tổng học phí:</p>
                      <p className="font-bold text-main">1.500.000</p>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Thoát</AlertDialogCancel>
                <AlertDialogAction className="bg-main hover:bg-orange-600">
                  Thanh toán
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="relative py-4 my-4 bg-white flex items-center w-full border-b">
        <div className="mr-2 text-green-400">
          <FaCheckCircle size={22} />
        </div>
        <div>
          <h3 className="text-lg">
            Học phí tháng 12/2023: <strong>1.500.000</strong>
          </h3>
          <p className="text-sm">Hạn nộp: từ 01/12/2023</p>
        </div>
        <div className="absolute right-2 text-main">
          <AlertDialog>
            <AlertDialogTrigger> Chi tiết</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center">
                  Chi tiết học phí tháng 12/2023
                  <p className="text-sm font-normal ml-4 bg-green-500 text-white p-1 rounded-full">
                    Đã thanh toán
                  </p>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div>
                    <div className="flex justify-between text-lg text-black">
                      <p className="mr-2">Phí học:</p>
                      <p className="font-bold">1.000.000</p>
                    </div>
                    <div className="flex justify-between text-lg text-black">
                      <p className="mr-2">Phí ăn uống:</p>
                      <p className="font-bold">500.000</p>
                    </div>
                    <div className="flex justify-between text-lg text-black">
                      <p className="mr-2">Miễn giảm:</p>
                      <p className="font-bold">0</p>
                    </div>
                    <div className="flex justify-between text-lg text-black pt-2 border-t">
                      <p className="mr-2">Tổng học phí:</p>
                      <p className="font-bold text-main">1.500.000</p>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Thoát</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="text-xl flex w-full justify-end">
        Còn nợ: <strong className="text-main ml-2"> 3.000.000</strong>
      </div>
    </div>
  );
};

export default SchoolFeePage;
