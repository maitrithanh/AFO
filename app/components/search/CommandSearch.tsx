import React from "react";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const CommandSearch = () => {
  return (
    <div>
      <CommandInput placeholder="Nhập từ khoá tìm kiếm..." />
      <CommandList>
        <CommandEmpty>Không có gợi ý.</CommandEmpty>
        <CommandGroup heading="Gợi ý">
          <CommandItem>Lịch học</CommandItem>
          <CommandItem>Sức khoẻ</CommandItem>
          <CommandItem>Học phi</CommandItem>
        </CommandGroup>
      </CommandList>
    </div>
  );
};

export default CommandSearch;
