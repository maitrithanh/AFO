import DetailClasses from "@/app/components/admin/classes/DetailClasses";
import React from "react";

const ClassPage = ({ params }: any) => {
  return (
    <>
      <DetailClasses id={params.classID} />
    </>
  );
};

export default ClassPage;
