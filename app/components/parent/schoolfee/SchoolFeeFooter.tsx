"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const SchoolFeeFooter = ({ debt }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="text-xl flex w-full justify-end p-4 pt-0 md:p-10 md:pt-0">
        {t("stillInDebt")}:<strong className="text-main ml-2"> {debt}đ</strong>
      </div>
    </>
  );
};

export default SchoolFeeFooter;
