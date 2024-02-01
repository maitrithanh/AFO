"use client";
import React from "react";
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
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { useTranslation } from "react-i18next";

const SchoolFee = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="h-[80px]">
        <div className="relative py-4 my-4 bg-white flex items-center w-full border-b">
          <div className="mr-2 text-rose-500">
            <MdOutlineRadioButtonUnchecked size={22} />
          </div>
          <div>
            <h3 className="text-lg">
              {t("tuition")} 02/2024: <strong>1.500.000</strong>
            </h3>
            <p className="text-sm">
              {t("tuitionDeadline")}: {t("from")} 01/02/2024 {t("to")}{" "}
              15/02/2024
            </p>
          </div>
          <div className="absolute right-2 text-main">
            <AlertDialog>
              <AlertDialogTrigger>{t("detail")}</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center">
                    {t("detailTuition")} 02/2024
                    <p className="text-sm font-normal ml-4 bg-rose-500 text-white p-1 rounded-full">
                      {t("unpaid")}
                    </p>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div>
                      <div className="flex justify-between text-lg text-black">
                        <p className="mr-2">{t("studyFee")}:</p>
                        <p className="font-bold">1.000.000</p>
                      </div>
                      <div className="flex justify-between text-lg text-black">
                        <p className="mr-2">{t("mealFee")}:</p>
                        <p className="font-bold">500.000</p>
                      </div>
                      <div className="flex justify-between text-lg text-black">
                        <p className="mr-2">{t("discount")}:</p>
                        <p className="font-bold">0</p>
                      </div>
                      <div className="flex justify-between text-lg text-black pt-2 border-t">
                        <p className="mr-2">{t("totalSchoolFee")}:</p>
                        <p className="font-bold text-main">1.500.000</p>
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("close")}</AlertDialogCancel>
                  <AlertDialogAction className="bg-main hover:bg-orange-600">
                    {t("pay")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolFee;
