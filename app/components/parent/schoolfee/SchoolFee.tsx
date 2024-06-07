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
import PaymentModel, { getPaymentStatusStyle } from "@/types/payment";
import { FaCheckCircle } from "react-icons/fa";

const SchoolFeeItem = ({ data }: { data: PaymentModel }) => {
  const { t } = useTranslation();

  const getAmount = () => {
    var diff = data.total - data.paid;
    if (diff > 0) return diff.toLocaleString("en");
    if (diff == 0) return "Đã đóng đủ";

    return "Đóng dư " + (-diff).toLocaleString("en");
  };

  return (
    <>
      <div className="h-[80px]">
        <div className="relative py-4 my-4 flex items-center w-full text-lg">
          {data.statusCode == "3" || data.statusCode == "0" ? (
            <div
              className={`mr-2 text-${getPaymentStatusStyle(data.statusCode)}`}
            >
              <MdOutlineRadioButtonUnchecked size={22} />
            </div>
          ) : (
            <div
              className={`mr-2 text-${getPaymentStatusStyle(data.statusCode)}`}
            >
              <FaCheckCircle size={22} />
            </div>
          )}

          <div>
            <h3 className="text-xl">
              {data.content}:{" "}
              <strong
                className={`text-${getPaymentStatusStyle(data.statusCode)}`}
              >
                {getAmount()}
              </strong>
              {data.paidTime && (
                <span
                  className={`text-${getPaymentStatusStyle(
                    data.statusCode
                  )} italic ml-1`}
                >
                  (ngày {data.paidTime})
                </span>
              )}
            </h3>
            <p className="text-lg">
              {t("tuitionDeadline")}: {t("from")} {data.startTime} {t("to")}{" "}
              {data.endTime}
            </p>
          </div>
          <div className="absolute right-2 text-main">
            <AlertDialog>
              <AlertDialogTrigger>{t("detail")}</AlertDialogTrigger>
              <AlertDialogContent className="max-h-[90vh] overflow-auto">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center">
                    {data.content}

                    <p
                      className={`bg-${getPaymentStatusStyle(
                        data.statusCode
                      )} text-sm font-normal ml-4 text-white p-1 rounded-full`}
                    >
                      {data.status}
                    </p>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div>
                      <div className="flex justify-between text-lg text-black">
                        <p className="mr-2">{t("studyFee")}:</p>
                        <p className="font-bold">
                          {data.total.toLocaleString("en")} đ
                        </p>
                      </div>
                      <div className="flex justify-between text-lg text-black">
                        <p className="mr-2">{t("discount")}:</p>
                        <p className="font-bold">0 đ</p>
                      </div>
                      <div className="flex justify-between text-lg text-black pt-2 border-t">
                        <p className="mr-2">{t("totalSchoolFee")}:</p>
                        <p className="font-bold text-main">
                          {data.total.toLocaleString("en")} đ
                        </p>
                      </div>

                      <div className="flex justify-between text-lg text-black pt-2 border-t">
                        <p className="mr-2">Đã đóng:</p>
                        <p className="font-bold">
                          {data.paid.toLocaleString("en")} đ
                        </p>
                      </div>

                      {data.paidTime && (
                        <div className="flex justify-between text-lg text-black pt-2 border-t">
                          <p className="mr-2">Ngày đóng:</p>
                          <p>{data.paidTime}</p>
                        </div>
                      )}

                      {(data.statusCode == "3" || data.statusCode == "0") && (
                        <div>
                          <p className="font-bold text-xl text-center my-3">
                            Thanh toán qua mã QR
                          </p>
                          <img src={data.qrUrl} alt="" />
                        </div>
                      )}

                      {/* <div>
                        <p className="font-bold text-xl text-center my-3">Hoặc chuyển khoản qua ngân hàng</p>
                        <p>Số tài khoản</p>
                        <p>Số tiền</p>
                        <p>Nội dung</p>
                      </div> */}
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>{t("close")}</AlertDialogCancel>
                  {/* <AlertDialogAction className="bg-main hover:bg-orange-600">
                    {t("pay")}
                  </AlertDialogAction> */}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolFeeItem;
