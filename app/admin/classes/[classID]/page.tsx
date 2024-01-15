"use client";

import Loading from "@/app/components/Loading";
import useFetch from "@/utils/useFetch";
import React from "react";

const ClassPage = ({ params }: any) => {
  const { data: classData, loading } = useFetch(`ClassRoom/${params.classID}`);

  return (
    <>
      {loading && <Loading />}
      <div>{classData?.name}</div>
    </>
  );
};

export default ClassPage;
