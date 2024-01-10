"use client";
import useFetch from "@/utils/useFetch";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: currentUser, loading } = useFetch("Auth/current");

  useEffect(() => {
    const loadingPage = () => {
      setIsLoading(true);
      if (loading === false) {
        setIsLoading(false);
      }
    };
    loadingPage();
  }, [loading]);

  return (
    <div>
      {isLoading ? <Loading /> : <div>Họ tên: {currentUser?.fullName}</div>}
      <div className="h-[5000px]">123</div>
    </div>
  );
};

export default Dashboard;
