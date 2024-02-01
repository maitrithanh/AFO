"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const SchoolFeeHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="pb-2 w-full">
        <p className="w-fit rounded-2xl text-2xl font-bold ">
          {t("infoTuition")}
        </p>
        <p>{t("subInfotuition")}</p>
      </div>
    </>
  );
};

export default SchoolFeeHeader;
