import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { useState } from "react"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeftIcon className="h-4 w-4" />
    <span>Trở lại</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Kế tiếp</span>
    <ChevronRightIcon className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const MyPagination = (p: { page: number, setPage: React.Dispatch<React.SetStateAction<number>>, PageCount: number }) => { 
  const { page, setPage, PageCount } = p;

  const MaxLeft = 3, MaxMid = 5, MaxRight = 3;
  const RightStart = PageCount - MaxRight + 1;
  const MidStart = React.useMemo(() => { //start of mid range
    var s = page - Math.ceil(MaxMid / 2) + 1 //relative to curr page
    s = Math.min(s, RightStart - 2 - MaxMid + 1) //endLimit - rightStart - 2 => startLimit = endLimit - (max -1)
    s = Math.max(s, MaxLeft + 2) // start from Max left + gap + 1
    return s
  }, [page, PageCount])
  const MidEnd = React.useMemo(() => {
    return MidStart + MaxMid - 1
  }, [MidStart])

  const Pages = (p: { x: number, y: number }) => {
    var { x, y } = p;
    const arr = [];
    if (x <= PageCount) for (let i = x; i <= Math.min(PageCount, y); i++) {
      arr.push(i);    
    }

    return <PaginationItem>
      {arr.map(p => <PaginationLink isActive={p == page}
        onClick={() => setPage(p)}>
        {p}
      </PaginationLink>)}
    </PaginationItem>
  }

  return <div className="p-4 flex">
    <Pagination>
      <PaginationContent>
        {/* previous */}
        <PaginationItem className={`${page > 1 ? '' : 'invisible'}`}>
          <PaginationPrevious onClick={() => setPage(x => x - 1)} />
        </PaginationItem>

        {/* left */}
        <Pages x={1} y={MaxLeft} />
        {/* gap */}
        {
          page <= MaxLeft + 1 + Math.ceil(MaxMid / 2) ? //left + gap + 1/2 mid
            <Pages x={MaxLeft + 1} y={MaxLeft + 1} />
            :
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
        }

        {/* middle */}
        <Pages x={MidStart} y={MidEnd} />

        {/* gap */}
        { // 14 15 16 ... 18
          (page >= RightStart - 1 - Math.floor(MaxMid / 2) - 1) || (PageCount <= MidEnd + 1 + MaxRight) ?
            <Pages x={MidEnd + 1} y={MidEnd + 1} />
            :
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
        }
        {/* right */}
        <Pages x={Math.max(RightStart, MidEnd + 2)} y={PageCount} />

        {/* next */}
        <PaginationItem className={`${page < PageCount ? '' : 'invisible'}`}>
          <PaginationNext onClick={() => setPage(x => x + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
}

export default MyPagination;

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
