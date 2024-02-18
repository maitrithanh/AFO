import DetailMenu from "@/app/components/admin/menu/DetailMenu";
import React from "react";

const ClassPage = ({ params }: any) => {
  return (
    <>
      <DetailMenu id={params.menuID} />
    </>
  );
};

export default ClassPage;
