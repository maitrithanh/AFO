import DetailBus from "@/app/components/admin/bus/DetailBus";
import React from "react";

const DetailBusPage = (params: any) => {
  return (
    <>
      <DetailBus param={params.params.busID} />
    </>
  );
};

export default DetailBusPage;
