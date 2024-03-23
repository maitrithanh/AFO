"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { CommandDialog } from "@/components/ui/command";
import CommandSearch from "../../search/CommandSearch";

const FunctionMenu = () => {
  const router = useRouter();
  const role = getCookie("role")?.toLowerCase();
  const pathName = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    openCommandSearch();
  }, []);

  const openCommandSearch = () => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((curr) => !curr);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  };

  const backAction = () => {
    if (pathName === `/${role}`) {
      return;
    }
    history.back();
  };
  return (
    <div className="mx-2 hover:cursor-pointer  p-1 flex justify-between w-full">
      {/* <div
        className="flex items-center hover:scale-110 transition-all rounded-full p-2 mx-1"
        onClick={() => {
          backAction();
        }}
      >
        <Image src="/icons/back.webp" alt="" width={30} height={30} />
      </div> */}

      <div
        className="hover:scale-110 transition-all rounded-full p-2 mx-1 bg-[#ffffff50] rounded-full"
        onClick={() => {
          router.push(`/${role}`);
        }}
      >
        <Image src="/icons/menuFunction.webp" alt="" width={28} height={28} />
      </div>

      {/* <div
        className="hover:scale-110 transition-all rounded-full p-2 mx-1"
        onClick={() => {
          setOpen((open) => !open);
        }}
      >
        <Image
          src="/icons/search.webp"
          className=""
          alt=""
          width={26}
          height={26}
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandSearch />
      </CommandDialog> */}
    </div>
  );
};

export default FunctionMenu;
