"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetch from "@/utils/useFetch";
import Button from "../Button";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { callApiWithToken } from "@/utils/callApi";
import UserData from "@/types/UserData";
import { signIn, useSession } from "next-auth/react";
import ResponseData from "@/types/ResponseData";
import LoginRes from "@/types/LoginRes";
import Loading from "../Loading";
import CardInfo from "./card/CardInfo";
import CardInfoLine from "./card/CardInfoLine";

const ProfileCard = () => {
  const { data: currentUser } = useFetch("Auth/current");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { data: user, loading: loadingUser } = useFetch<UserData>(
    "Auth/current",
    null,
    refresh
  );
  const { data: Session } = useSession();

  useEffect(() => {
    setLoading(loadingUser);
  }, [loadingUser]);

  //external login redirect
  useEffect(() => {
    var external = sessionStorage.getItem("external");

    if (external) {
      var path, token: string;
      if (external === "google") {
        path = "Auth/LinkGoogle/";
        token = Session?.token;
      } else if (external == "facebook") {
        path = "Auth/LinkFacebook/";
        token = Session?.access_token;
      } else return;

      if (!token) return;

      setLoading(true);
      callApiWithToken()
        .post<ResponseData<LoginRes>>(path, { token })
        .then(async (response) => {
          toast.success("Liên kết thành công");
          setRefresh((x) => !x);
        })
        .catch((error) => {
          toast.error("Có lỗi xảy ra");
        })
        .finally(() => {
          setLoading(false);
          sessionStorage.removeItem("external");
        });
    }
  }, [Session]);

  const onUnlink = (s: string) => {
    if (!window.confirm("Hủy liên kết với tài khoản " + s)) return;

    setLoading(true);
    callApiWithToken()
      .get(`Auth/Unlink${s}`)
      .then((res) => {
        toast.success("Hủy liên kết thành công");
        setRefresh((x) => !x);
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      })
      .finally(() => setLoading(false));
  };

  const ExternalLogin = (s: string) => {
    setLoading(true);
    signIn(s);
    sessionStorage.setItem("external", s);
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="flex justify-center items-center h-full w-full ">
        <div className="relative h-full w-full bg-gradient-to-b sm:max-w-[840px] sm:p-8 rounded-xl">
          <div className="flex items-center mx-2">
            <Image
              src={`/avatar.jpg`}
              alt="123"
              className={`w-16 h-16 rounded-full cursor-pointer border border-[#d7d0d065]`}
              width={100}
              height={100}
              onClick={() => {}}
            />
            <div className="ml-4">
              <p className="font-bold text-2xl">
                {currentUser?.fullName} - #{currentUser?.numberID}
              </p>
              <p className="text-main">{currentUser?.level}</p>
            </div>
          </div>

          <CardInfo cardName="Thông tin cá nhân">
            <CardInfoLine
              lineName={"Họ tên"}
              contentLine={currentUser?.fullName}
            />
            <CardInfoLine
              lineName={"Ngày sinh"}
              contentLine={currentUser?.birthDay}
            />
            <CardInfoLine
              lineName={"Giới tính"}
              contentLine={currentUser?.gender == 1 ? "Nam" : "Nữ"}
            />
            {currentUser?.classes ? (
              <CardInfoLine
                lineName={"Lớp học"}
                contentLine={currentUser?.classes}
              />
            ) : (
              ""
            )}

            <CardInfoLine
              lineName={"Quốc tịch"}
              contentLine={currentUser?.nation}
            />

            <CardInfoLine
              lineName={"Địa chỉ"}
              contentLine={currentUser?.address}
            />
          </CardInfo>
          {currentUser?.representativeInfos.length !== 0 ? (
            <CardInfo cardName="Thông tin phụ huynh">
              {currentUser?.representativeInfos?.map((data: any) => {
                return (
                  <>
                    <div key={data.id}>
                      <div>
                        <p className="text-lg font-semibold mt-4">
                          Thông tin {data?.relationship}:
                        </p>
                        <CardInfoLine
                          lineName={"Họ tên"}
                          contentLine={data?.fullName}
                        />
                        <CardInfoLine
                          lineName={"SĐT"}
                          contentLine={data?.phoneNumber}
                        />
                        <CardInfoLine
                          lineName={"Địa chỉ"}
                          contentLine={data?.address}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </CardInfo>
          ) : (
            ""
          )}

          <div className="shadow-lg border p-8 pt-4 my-4 rounded-xl bg-white">
            <div className="text-main sm:text-2xl text-xl font-bold flex border-b mb-4">
              Tài khoản liên kết
            </div>
            <div className="block md:flex mt-1 gap-4">
              {user?.loginGoogle ? (
                <div className="w-full text-main border-main border-[2px] gap-2 p-2 rounded-md flex items-center justify-center mb-4 md:m-0">
                  <FaGoogle size={24} />
                  <p className="font-semibold">{user.loginGoogle}</p>
                  <div
                    className="ml-auto text-2xl cursor-pointer hover:text-red-500 hover:bg-[#dcdbdb80] rounded-full p-1"
                    onClick={() => onUnlink("google")}
                  >
                    <IoClose />
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    label={"Liên kết Google"}
                    outline
                    custom="mr-2 mb-4 md:m-0"
                    icon={FaGoogle}
                    onClick={() => ExternalLogin("google")}
                  />
                </>
              )}
              <Button
                label="Liên kết Facebook"
                icon={FaFacebook}
                outline
                onClick={() => {}}
              />
            </div>
          </div>

          <Button label="Xem album" onClick={() => {}} custom="mt-4" />
          <Button label="Đổi mật khẩu" onClick={() => {}} custom="mt-4" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
