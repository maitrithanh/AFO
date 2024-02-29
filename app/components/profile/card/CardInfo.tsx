import React from "react";

interface CardInfoProps {
  cardName: string;
  children: React.ReactNode;
  parent?: boolean;
}

const CardInfo: React.FC<CardInfoProps> = ({ cardName, children, parent }) => {
  return (
    <div
      className={`relative shadow-3xl border p-8 pt-4 my-4 rounded-xl ${
        parent ? "bg-[#fffc]" : "bg-white"
      }`}
    >
      <div className="text-main sm:text-2xl text-xl font-bold flex border-b mb-4">
        {cardName}
      </div>
      {children}
    </div>
  );
};

export default CardInfo;
