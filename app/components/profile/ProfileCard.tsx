"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useFetch from "@/utils/useFetch";
import Button from "../Button";
import { FaFacebook, FaGoogle, FaPen } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { baseURL, callApiWithToken } from "@/utils/callApi";
import UserData from "@/types/UserData";
import { signIn, useSession } from "next-auth/react";
import ResponseData from "@/types/ResponseData";
import LoginRes from "@/types/LoginRes";
import Loading from "../Loading";
import DefaultImage from "../defaultImage";
import ChangePwDialog from "./changePwDialog";
import CardInfo from "./card/CardInfo";
import CardInfoLine from "./card/CardInfoLine";
import { getImageUrl } from "@/utils/image";
import { useRouter } from "next/navigation";
import { MdOutlineChangeCircle } from "react-icons/md";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Slider from "../Slider";

const ProfileCard = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const child = getCookie("child");
  const router = useRouter();

  const uploadAvatarRef = useRef<HTMLInputElement | null>(null);

  const { data: currentUser, loading: loadingUser } = useFetch<UserData>(
    "Auth/current",
    null,
    refresh
  );
  const { data: listChild } = useFetch("parent/childrenlist");
  const infoChild = listChild?.find((x: any) => x.id == child);
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
          setRefresh((x) => x + 1);
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
        setRefresh((x) => x + 1);
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

  //upload avtar
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var file: Blob = event.target.files![0];
    if (!file) return;
    const formData = new FormData();
    if (file) formData.append("file", file, undefined);

    setLoading(true);
    callApiWithToken()
      .put(
        "File/ChangeAvatar",
        { file },
        { headers: { "content-type": "multipart/form-data" } }
      )
      .then((res) => {
        toast.success("Đã cập nhật");
        //setRefresh((x) => x + 1);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onUpdateAvatarClick = () => {
    uploadAvatarRef.current?.click();
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="flex justify-center items-center h-full w-full ">
        <div className="relative h-full w-full bg-gradient-to-b sm:max-w-[1280px] sm:p-8 rounded-xl">
          {/* parent */}

          <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-4">
            <CardInfo cardName="Thông tin người giám hộ">
              <div className="absolute right-4 -top-10">
                <span className="relative group">
                  <DefaultImage
                    key={currentUser?.avatar}
                    img={getImageUrl(currentUser?.avatar)}
                    fallback="/avatar.webp"
                    className={`w-14 h-14 rounded-full cursor-pointer`}
                    custom="w-[80px] h-[80px]"
                  />
                  <div
                    title="Đổi ảnh"
                    className="h-full w-full justify-center items-center bg-black bg-opacity-50 rounded-full absolute top-0 left-0 hidden group-hover:flex"
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      title="no"
                      ref={uploadAvatarRef}
                    />
                    <FaPen
                      onClick={onUpdateAvatarClick}
                      className="cursor-pointer text-white"
                    />
                  </div>
                </span>
              </div>
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
                contentLine={currentUser?.gender}
              />
              <CardInfoLine
                lineName={"SĐT"}
                contentLine={currentUser?.phoneNumber}
              />
              <CardInfoLine
                lineName={"Số CCCD"}
                contentLine={currentUser?.idNumber}
              />
              <CardInfoLine
                lineName={"Nghề nghiệp"}
                contentLine={currentUser?.job}
              />

              <CardInfoLine
                lineName={"Địa chỉ"}
                contentLine={currentUser?.address}
              />

              <CardInfoLine
                lineName={"Ghi chú"}
                contentLine={currentUser?.note}
              />
            </CardInfo>
            {/* children */}
            <CardInfo cardName="Thông tin trẻ">
              <div className="absolute right-4 -top-10">
                <span className="relative group">
                  <DefaultImage
                    key={infoChild?.avatar}
                    img={getImageUrl(infoChild?.avatar)}
                    fallback="/avatar.webp"
                    className={`w-14 h-14 rounded-full cursor-pointer`}
                    custom="w-[80px] h-[80px]"
                  />
                  <div
                    title="Đổi ảnh"
                    className="h-full w-full justify-center items-center bg-black bg-opacity-50 rounded-full absolute top-0 left-0 hidden group-hover:flex"
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      title="no"
                      ref={uploadAvatarRef}
                    />
                    <FaPen
                      onClick={onUpdateAvatarClick}
                      className="cursor-pointer text-white"
                    />
                  </div>
                </span>
              </div>
              <CardInfoLine
                lineName={"Họ tên"}
                contentLine={infoChild?.fullName}
              />
              <CardInfoLine
                lineName={"Ngày sinh"}
                contentLine={infoChild?.birthDay}
              />
              <CardInfoLine
                lineName={"Giới tính"}
                contentLine={infoChild?.gender}
              />
              <CardInfoLine
                lineName={"Nhập học"}
                contentLine={infoChild?.joinDate}
              />
              <CardInfoLine
                lineName={"Quốc tịch"}
                contentLine={infoChild?.nation}
              />
              <CardInfoLine
                lineName={"Tình trạng"}
                contentLine={infoChild?.status ? "Đang học" : "Đã nghỉ"}
              />

              <CardInfoLine
                lineName={"Địa chỉ"}
                contentLine={infoChild?.address}
              />

              <CardInfoLine
                lineName={"Ghi chú"}
                contentLine={infoChild?.note}
              />
            </CardInfo>
          </div>

          <div>
            <CardInfo cardName="Album ảnh">
              <div className="absolute right-4 top-4">
                <Link
                  href={"#"}
                  className="text-main font-bold hover:opacity-80 hover:mr-2 transition-all"
                >
                  Xem thêm
                </Link>
              </div>
              <Slider showThumbs />
            </CardInfo>
          </div>

          <div className="shadow-lg border p-8 pt-4 my-4 rounded-xl bg-[#fffc]">
            <div className="text-main sm:text-2xl text-xl font-bold flex border-b mb-4">
              Tài khoản liên kết
            </div>
            <div className="block md:flex mt-1 gap-4">
              {currentUser?.googleName ? (
                <div className="w-full text-main border-main border-[2px] gap-2 p-2 rounded-md flex items-center justify-center mb-4 md:m-0">
                  <FaGoogle size={24} />
                  <p className="font-semibold">{currentUser.googleName}</p>
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
              {currentUser?.facebookName ? (
                <div className="w-full text-main border-main border-[2px] gap-2 p-2 rounded-md flex items-center justify-center mb-4 md:m-0">
                  <FaFacebook size={24} />
                  <p className="font-semibold">{currentUser.facebookName}</p>
                  <div
                    className="ml-auto text-2xl cursor-pointer hover:text-red-500 hover:bg-[#dcdbdb80] rounded-full p-1"
                    onClick={() => onUnlink("facebook")}
                  >
                    <IoClose />
                  </div>
                </div>
              ) : (
                <Button
                  label="Liên kết Facebook"
                  icon={FaFacebook}
                  outline
                  custom="bg-[#ffffff7d]"
                  onClick={() => {
                    ExternalLogin("facebook");
                  }}
                />
              )}
            </div>
          </div>

          {/* <Button label="Xem album" onClick={() => {}} custom="mt-4" /> */}
          <Button
            label="Đổi mật khẩu"
            onClick={() => {
              setOpenChangePassword(true);
            }}
            custom="mt-4"
          />
          {openChangePassword && (
            <ChangePwDialog
              onClose={() => {
                setOpenChangePassword(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
