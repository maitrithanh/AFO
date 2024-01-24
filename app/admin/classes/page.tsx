"use client";
import Loading from "@/app/components/Loading";
import useFetch from "@/utils/useFetch";
import Link from "next/link";
import React from "react";

const ClassesPage = () => {
  const { data: allClass, loading } = useFetch("ClassRoom");
  return (
    <>
      {loading && <Loading />}
      {/* <div className="w-full bg-main text-white flex justify-center items-center my-4">
        <p className="text-xl font-bold p-1">LỚP MẦM</p>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-1 w-full gap-4">
        {allClass?.map((data: any) => {
          if (data.name.includes("Lớp Mầm")) {
            return (
              <div key={data.classID}>
                <Link href={`/admin/classes/${data.classID}`}>
                  <div className="shadow p-2 rounded-lg  h-full">
                    <div>
                      <div className="flex">
                        <p className="font-semibold w-[80px]">Lớp: </p>
                        <p className="ml-1">{data.name}</p>
                      </div>

                      <div className="flex">
                        <p className="font-semibold w-[80px]">Mã lớp: </p>
                        <p className="ml-1">{data.classID}</p>
                      </div>

                      <div className="flex">
                        <p className="font-semibold w-[80px]">Giáo viên:</p>
                        <p className="ml-1">
                          {data.teacher ? data.teacher : "Null"}
                        </p>
                      </div>

                      <div className="flex">
                        <p className="font-semibold w-[80px]">Học sinh:</p>
                        <p className="ml-1">
                          {data.student ? data.student : "Null"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
        })}
      </div> */}

      {allClass ? (
        <div className="grid md:grid-cols-4 grid-cols-1 w-full gap-4 ">
          {allClass?.map((data: any) => {
            return (
              <div
                key={data.classID}
                style={{
                  backgroundImage: `url(${"/bg-noti.webp"})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className="rounded-lg h-36 w-full flex items-center justify-center"
              >
                <Link href={`/admin/classes/${data.classID}`}>
                  <div className="p-2 rounded-lg h-full">
                    <div>
                      <div className="flex">
                        <p
                          className={`ml-1 text-2xl font-extrabold text-cool text-white uppercase p-4 rounded-full 
                        ${data.name.includes("Mầm") && "bg-[#0685897d]"}
                        ${data.name.includes("Chồi") && "bg-[#fa02027d]"}
                        ${data.name.includes("Lá") && "bg-[#ff8a057d]"}`}
                        >
                          {data.name} - {data.classID}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        "Không có lớp nào!"
      )}
    </>
  );
};

export default ClassesPage;
