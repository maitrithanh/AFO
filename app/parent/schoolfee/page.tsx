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
import SchoolFeeHeader from "@/app/components/parent/schoolfee/SchoolFeeHeader";
import SchoolFee from "@/app/components/parent/schoolfee/SchoolFee";
import SchoolFeeFooter from "@/app/components/parent/schoolfee/SchoolFeeFooter";

const SchoolFeePage = () => {
  return (
    <div className="w-full h-[88vh] m-auto rounded-lg bg-white p-4 md:p-10">
      <SchoolFeeHeader />

      <SchoolFee />

      <div className="relative py-4 my-4 bg-white flex items-center w-full border-b">
        <div className="mr-2 text-green-400">
          <FaCheckCircle size={22} />
        </div>
        <div>
          <h3 className="text-lg">
            Học phí 12/2023: <strong>1.500.000</strong>
          </h3>
          <p className="text-sm">Hạn nộp: từ 01/12/2023</p>
        </div>
        <div className="absolute right-2 text-main">
          <AlertDialog>
            <AlertDialogTrigger> Chi tiết</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center">
                  Chi tiết học phí 12/2023
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
      <SchoolFeeFooter debt={"1.500.000"} />
    </div>
  );
};

export default SchoolFeePage;
