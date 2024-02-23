"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "next-i18next";
import toast from "react-hot-toast";

const SettingPage = () => {
  const [sidebarBg, setSidebarBg] = useState(false);
  const [showSidebarBg, setShowSidebarBg] = useState(false);
  const { t } = useTranslation();

  const handleSetBg = () => {
    toast.success(t("toastUpdate"));
    if (localStorage.getItem("bgSidebar") === "false") {
      localStorage.setItem("bgSidebar", "true");
    } else {
      localStorage.setItem("bgSidebar", "false");
    }
    setSidebarBg((curr) => !curr);
    location.reload();
  };

  useEffect(() => {
    setShowSidebarBg(localStorage.getItem("bgSidebar") == "true");
  }, [sidebarBg]);

  return (
    <div className="md:mx-20">
      <p className="text-xl m-1">{t("setting")}</p>
      <div className="my-4">
        <div className="bg-white shadow-3xl p-6 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <p className="mr-2">Sidebar: </p>
            <div className="border bg-white w-[80px] h-[40px] rounded-md">
              {showSidebarBg ? (
                <Image
                  src={"/bg-big.webp"}
                  width={80}
                  height={40}
                  alt="Background"
                  className="rounded-md"
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <Switch
              className="bg-green-600"
              checked={showSidebarBg}
              onClick={() => {
                handleSetBg();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
