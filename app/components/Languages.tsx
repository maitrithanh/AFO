"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import i18n from "@/utils/i18n";

const Languages = () => {
  const [lang, setLang] = useState("");

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    setLang(value);
    localStorage.setItem("language", value);
  };

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
    setLang(localStorage.getItem("language") || "VN");
    i18n.changeLanguage(localStorage.getItem("language") || "VN");
  }, [lang]);

  const renderSwitch = () => {
    switch (lang) {
      case "VN":
        return (
          <div className="flex justify-center items-center">
            <Image
              className="mr-2"
              src={"/icons/vn.webp"}
              width={24}
              height={24}
              alt="Viet Nam"
            />
            Tiếng Việt
          </div>
        );
      case "EN":
        return (
          <div className="flex justify-center items-center">
            <Image
              className="mr-2"
              src={"/icons/us.webp"}
              width={24}
              height={24}
              alt="United State"
            />
            English
          </div>
        );
      default:
        return <SelectValue placeholder="Languages..." defaultValue={"VN"} />;
    }
  };

  return (
    <div className="mx-2 truncate ">
      <Select
        onValueChange={(value) => {
          changeLanguage(value);
        }}
      >
        <SelectTrigger className="md:w-[140px] w-[80px]">
          {renderSwitch()}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="VN">
            <div className="flex justify-center items-center">
              <Image
                className="mr-2"
                src={"/icons/vn.webp"}
                width={24}
                height={24}
                alt="Viet Nam"
              />
              Tiếng Việt
            </div>
          </SelectItem>
          <SelectItem value="EN">
            <div className="flex justify-center items-center">
              <Image
                className="mr-2"
                src={"/icons/us.webp"}
                width={24}
                height={24}
                alt="United State"
              />
              English
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Languages;
