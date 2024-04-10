"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const SchoolFeeHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full p-4 pb-0 md:p-10 md:pb-0">
        <p className="w-fit rounded-2xl text-2xl font-bold ">
          {t("infoTuition")}
        </p>
        <p>{t("subInfotuition")}</p>
      </div>
    </>
  );
};

export default SchoolFeeHeader;
