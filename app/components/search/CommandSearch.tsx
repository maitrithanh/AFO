"use client";
import React from "react";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTranslation } from "react-i18next";

const CommandSearch = () => {
  const { t } = useTranslation();
  return (
    <div>
      <CommandInput placeholder={t("keyword" + "...")} />
      <CommandList>
        <CommandEmpty>{t("thereAreNoSuggestions")}</CommandEmpty>
        <CommandGroup heading={t("suggestions")}>
          <CommandItem>Lịch học</CommandItem>
          <CommandItem>Sức khoẻ</CommandItem>
          <CommandItem>Học phi</CommandItem>
        </CommandGroup>
      </CommandList>
    </div>
  );
};

export default CommandSearch;
