import React from "react";

interface BackdropProps {
  children: React.ReactNode;
}

const BackDrop: React.FC<BackdropProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen fixed z-50 bg-[#0000007d]">
      {children}
    </div>
  );
};

export default BackDrop;
