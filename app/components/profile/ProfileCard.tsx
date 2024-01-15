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

const ProfileCard = () => {
  const { data: currentUser } = useFetch("Auth/current");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const uploadAvatarRef = useRef<HTMLInputElement | null>(null);

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
    var file: Blob = event.target.files![0]
    if (!file) return;
    const formData = new FormData();
    if (file) formData.append('file', file, undefined);

    setLoading(true);
    callApiWithToken().put('File/ChangeAvatar',
      { file },
      { headers: { 'content-type': 'multipart/form-data' } })
      .then((res) => { 
        toast.success('Đã cập nhật');
        setRefresh(x => x + 1);
      }).catch((err) => { 
        toast.error(err.response.data.error)
      }).finally(() => { 
        setLoading(false);
      })
  };
  const onUpdateAvatarClick = () => { 
    uploadAvatarRef.current?.click();
  }

  return (
    <div>
      {loading && <Loading />}
      <div className="flex justify-center items-center h-full w-full ">
        <div className="relative h-full w-full bg-gradient-to-b sm:max-w-[840px] sm:p-8 rounded-xl">
          <div className="flex items-center mx-2">
            {loading ? (
              <div className="flex">
                <div className="bg-slate-200 flex border-b h-[64px] w-[64px] rounded-full animate-pulse"></div>
                <div className="ml-4">
                  <div className="bg-slate-200 flex border-b mb-4 h-[30px] w-[100px] rounded-lg animate-pulse"></div>
                  <div className="bg-slate-200 flex border-b h-[10px] w-[100px] rounded-lg animate-pulse"></div>
                </div>
              </div>
            ) : (
              <>
                {/* <Image
                  src={`/$`}
                  alt="123"
                  className={`w-16 h-16 rounded-full cursor-pointer border border-[#d7d0d065]`}
                  width={100}
                  height={100}
                  onClick={() => {}}
                  /> */}
                  <span className="relative group">
                    <DefaultImage img={baseURL + 'File/GetFile/' + currentUser?.avatar + '?r='+refresh} fallback="/avatar.jpg"
                      className={`w-16 h-16 rounded-full cursor-pointer border border-[#d7d0d065]`}
                      width={100}
                      height={100}
                    />
                    <div title="Đổi ảnh" className="h-full w-full justify-center items-center bg-black bg-opacity-50 rounded-full absolute top-0 left-0 hidden group-hover:flex">
                      <input type="file" onChange={handleFileChange} className="hidden" title="no" ref={uploadAvatarRef}/>
                      <FaPen onClick={onUpdateAvatarClick} className='cursor-pointer text-white'/>
                    </div>
                  </span>
                <div className="ml-4">
                  <p className="font-bold text-2xl">
                    {currentUser?.fullName} - #{currentUser?.id}
                  </p>
                  <p className="text-main">{currentUser?.level}</p>
                </div>
              </>
            )}
          </div>

          {loading ? (
            <div className="shadow-lg border p-8 pt-4 my-4 rounded-xl bg-white animate-pulse">
              <div className="bg-slate-200 flex border-b mb-4 h-[30px] rounded-lg"></div>
              <div className="flex mt-1">
                <p className="bg-slate-200 h-[20px] rounded-lg w-[120px]"></p>
                <p className="bg-slate-200 h-[20px] rounded-lg w-full ml-4"></p>
              </div>
              <div className="flex mt-4">
                <p className="bg-slate-200 h-[20px] rounded-lg w-[120px]"></p>
                <p className="bg-slate-200 h-[20px] rounded-lg w-full ml-4 "></p>
              </div>
            </div>
          ) : (
            <div className="shadow-lg border p-8 pt-4 my-4 rounded-xl bg-white">
              <div className="text-main sm:text-2xl text-xl font-bold flex border-b mb-4">
                Thông tin cá nhân
              </div>
              <div className="flex mt-1">
                <p className="sm:text-lg text-md font-medium w-[120px]">
                  Họ tên
                </p>
                <p className="sm:text-lg text-md font-semibold ml-4 ">
                  {currentUser?.fullName}
                </p>
              </div>
              <div className="flex mt-2">
                <p className="sm:text-lg text-md font-medium w-[120px]">
                  Ngày sinh
                </p>
                <p className="sm:text-lg text-md font-semibold ml-4 ">
                  {currentUser?.birthDay}
                </p>
              </div>
              <div className="flex mt-2">
                <p className="sm:text-lg text-md font-medium w-[120px]">
                  Giới tính
                </p>
                <p className="sm:text-lg text-md font-semibold ml-4 ">
                  {currentUser?.gender == 1 ? "Nam" : "Nữ"}
                </p>
              </div>

              <div className="flex mt-2">
                <p className="sm:text-lg text-md font-medium w-[120px]">
                  Quốc tịch
                </p>
                <p className="sm:text-lg text-md font-semibold ml-4 ">
                  {currentUser?.nation}
                </p>
              </div>

              <div className="flex mt-2">
                <p className="sm:text-lg text-md font-medium w-[120px]">
                  Địa chỉ
                </p>
                <p className="sm:text-lg text-md font-semibold ml-4 ">
                  {currentUser?.address}
                </p>
              </div>
            </div>
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

          {/* <Button label="Xem album" onClick={() => {}} custom="mt-4" /> */}
          <Button label="Đổi mật khẩu" onClick={() => { setOpenChangePassword(true) }} custom="mt-4" />
          {openChangePassword &&
            <ChangePwDialog onClose={() => { setOpenChangePassword(false) }} />
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
