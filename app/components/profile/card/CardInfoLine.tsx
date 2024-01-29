import React from "react";

interface CardInfoLineProps {
  lineName: string;
  contentLine?: string;
}

const CardInfoLine: React.FC<CardInfoLineProps> = ({
  lineName,
  contentLine,
}) => {
  return (
    <div className="flex mt-1">
      <p className="sm:text-lg text-md font-medium md:w-[140px] w-[150px]">
        {lineName}
      </p>
      <p className="sm:text-lg text-md font-semibold ml-4 w-full text-justify">
        {contentLine || "__"}
      </p>
    </div>
  );
};

export default CardInfoLine;
