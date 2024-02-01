"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const SchoolFeeFooter = ({ debt }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="text-xl flex w-full justify-end">
        {t("stillInDebt")}:<strong className="text-main ml-2"> {debt}</strong>
      </div>
    </>
  );
};

export default SchoolFeeFooter;
