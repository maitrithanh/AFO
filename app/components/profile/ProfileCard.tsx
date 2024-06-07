"use client";
import React, { useState, useEffect, useRef } from "react";
import useFetch from "@/utils/useFetch";
import Button from "../shared/Button";
import { FaFacebook, FaGoogle, FaPen } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { callApiWithToken } from "@/utils/callApi";
import UserData from "@/types/UserData";
import { signIn, useSession } from "next-auth/react";
import ResponseData from "@/types/ResponseData";
import LoginRes from "@/types/LoginRes";
import Loading from "../shared/Loading";
import DefaultImage from "../shared/defaultImage";
import ChangePwDialog from "./changePwDialog";
import CardInfo from "./card/CardInfo";
import CardInfoLine from "./card/CardInfoLine";
import { getImageUrl } from "@/utils/image";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Slider from "../shared/Slider";
import { useTranslation } from "react-i18next";
import { MdChangeCircle } from "react-icons/md";

interface ProfileCardProps {
  parent?: boolean;
  justView?: boolean;
  idChild?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  parent,
  justView,
  idChild,
}) => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const child = justView ? idChild : getCookie("child");
  const role = getCookie("role");

  const uploadAvatarRef = useRef<HTMLInputElement | null>(null);

  const { data: currentUserTeacher, loading: loadingUser } = useFetch<UserData>(
    "Auth/current",
    null,
    refresh
  );

  const { data: infoChild } = useFetch(`Child/getChild?id=${child}`);
  const currentUser = parent ? infoChild?.parent : currentUserTeacher;
  const { data: Session } = useSession();

  // useEffect(() => {
  //   setLoading(loadingUser);
  // }, [loadingUser]);

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
        toast.success(t("unlinkSuccess"));
        setRefresh((x) => x + 1);
      })
      .catch((err) => {
        toast.error(t("somethingWentWrong"));
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

  //upload avtar child
  const handleFileChangeChild = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    var file: Blob = event.target.files![0];
    if (!file) return;
    const formData = new FormData();
    if (file) formData.append("file", file, undefined);

    setLoading(true);
    callApiWithToken()
      .put(
        "File/ChangeChildAvatar?Id=" + child,
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
  console.log(currentUser);

  //Translate
  const { t } = useTranslation();

  return (
    <div className="overflow-auto">
      <div className="flex justify-center items-center h-full w-full ">
        <div className="relative h-full w-full bg-gradient-to-b sm:max-w-[1280px] sm:p-8 rounded-xl">
          {/* parent */}
          <div
            className={`grid ${
              parent ? "md:grid-cols-2" : ""
            } grid-cols-1 md:gap-4`}
          >
            <CardInfo
              cardName={parent ? t("infoParent") : "Thông tin"}
              parent={parent}
            >
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
                lineName={t("fullName")}
                contentLine={currentUser?.fullName}
              />
              <CardInfoLine
                lineName={t("dateOfBirth")}
                contentLine={currentUser?.birthDay}
              />
              <CardInfoLine
                lineName={t("gender")}
                contentLine={currentUser?.gender === 1 ? "Nam" : "Nữ"}
              />
              <CardInfoLine
                lineName={t("phoneNumber")}
                contentLine={currentUser?.phoneNumber}
              />
              <CardInfoLine
                lineName={t("idNumber")}
                contentLine={currentUser?.idNumber}
              />

              {parent ? (
                <CardInfoLine
                  lineName={t("job")}
                  contentLine={currentUser?.job}
                />
              ) : (
                <>
                  <CardInfoLine
                    lineName={"Lớp phụ trách"}
                    contentLine={currentUser?.className}
                  />
                  <CardInfoLine
                    lineName={"Trình độ"}
                    contentLine={currentUser?.education}
                  />
                </>
              )}

              <CardInfoLine
                lineName={t("address")}
                contentLine={currentUser?.address}
              />

              <CardInfoLine
                lineName={t("note")}
                contentLine={currentUser?.note}
              />
            </CardInfo>
            {/* children */}
            {parent ? (
              <>
                <CardInfo cardName={t("infoChild")}>
                  {justView ? (
                    ""
                  ) : (
                    <div className="absolute right-6 ">
                      <Link href={"/choose-user"}>
                        <p className="text-main flex items-center">
                          <span className="m-1">
                            <MdChangeCircle size={20} />
                          </span>
                          {t("changeProfile")}
                        </p>
                      </Link>
                    </div>
                  )}
                  <div className="absolute right-4 -top-10">
                    <span className="relative group">
                      <DefaultImage
                        key={infoChild?.avatar}
                        img={getImageUrl(infoChild?.avatar)}
                        fallback="/avatar.webp"
                        className={`w-14 h-14 rounded-full cursor-pointer`}
                        custom="w-[80px] h-[80px]"
                      />
                      {parent ? (
                        ""
                      ) : (
                        <div
                          title="Đổi ảnh"
                          className="h-full w-full justify-center items-center bg-black bg-opacity-50 rounded-full absolute top-0 left-0 hidden group-hover:flex"
                        >
                          <input
                            type="file"
                            onChange={handleFileChangeChild}
                            className="hidden"
                            title="no"
                            ref={uploadAvatarRef}
                          />
                          <FaPen
                            onClick={onUpdateAvatarClick}
                            className="cursor-pointer text-white"
                          />
                        </div>
                      )}
                    </span>
                  </div>
                  <CardInfoLine
                    lineName={t("fullName")}
                    contentLine={infoChild?.fullName}
                  />
                  <CardInfoLine
                    lineName={t("dateOfBirth")}
                    contentLine={infoChild?.birthDay}
                  />
                  <CardInfoLine
                    lineName={t("gender")}
                    contentLine={infoChild?.gender == 1 ? "Nam" : "Nữ"}
                  />
                  <CardInfoLine
                    lineName={t("joinDate")}
                    contentLine={infoChild?.joinDate}
                  />
                  <CardInfoLine
                    lineName={t("nationality")}
                    contentLine={infoChild?.nation}
                  />
                  {/* <CardInfoLine
                    lineName={t("Lớp học")}
                    contentLine={infoChild?.classRoom}
                  /> */}
                  <CardInfoLine
                    lineName={t("status")}
                    contentLine={infoChild?.status ? "Đang học" : "Đã nghỉ"}
                  />

                  <CardInfoLine
                    lineName={'Lớp'}
                    contentLine={infoChild?.classRoom?.className ?? 'Chưa có lớp'}
                  />

                  <CardInfoLine
                    lineName={t("address")}
                    contentLine={infoChild?.address}
                  />

                  <CardInfoLine
                    lineName={t("note")}
                    contentLine={infoChild?.note}
                  />
                </CardInfo>
              </>
            ) : (
              ""
            )}
          </div>

          {parent ? (
            <div>
              <CardInfo cardName={t("albumImages")}>
                <div className="absolute right-4 top-4">
                  <Link
                    href={`/${role?.toLowerCase()}/albums`}
                    className="text-main font-bold hover:opacity-80 hover:mr-2 transition-all"
                  >
                    {t("more")}
                  </Link>
                </div>
                <Slider showThumbs data={infoChild?.pictures?.split(",")} />
              </CardInfo>
            </div>
          ) : null}

          {
            justView ? (
              ""
            ) : (
              <div className="shadow-lg border p-8 pt-4 my-4 rounded-xl bg-[#fffc]">
                <div className="text-main sm:text-2xl text-xl font-bold flex border-b mb-4">
                  {t("link") + " " + t("account")}
                </div>
                <div className="block md:flex mt-1 gap-4">
                    {currentUserTeacher?.googleName ? (
                      <div className="w-full bg-white text-main border-main border-[2px] gap-2 p-2 rounded-md flex items-center mb-4 md:m-0">
                        <div className="flex-1 flex justify-center">
                          <FaGoogle size={24} />
                          <p className="font-semibold ml-2">{currentUserTeacher.googleName}</p>
                        </div>
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
                        label={t("link") + " Google "}
                        outline
                        custom="mr-2 mb-4 md:m-0"
                        icon={FaGoogle}
                        onClick={() => ExternalLogin("google")}
                      />
                    </>
                  )}
                    {currentUserTeacher?.facebookName ? (
                    <div className="w-full bg-white text-main border-main border-[2px] gap-2 p-2 rounded-md flex items-center justify-center mb-4 md:m-0">
                      <div className="flex-1 flex justify-center">
                          <FaFacebook size={24} />
                          <p className="font-semibold ml-2">{currentUserTeacher.facebookName}</p>
                        </div>
                      <div
                        className="ml-auto text-2xl cursor-pointer hover:text-red-500 hover:bg-[#dcdbdb80] rounded-full p-1"
                        onClick={() => onUnlink("facebook")}
                      >
                        <IoClose />
                      </div>
                    </div>
                  ) : (
                    <Button
                      label={t("link") + " Facebook"}
                      icon={FaFacebook}
                      outline
                      custom="bg-[#ffffff7d]"
                      onClick={() => {
                        ExternalLogin("facebook");
                      }}
                    />
                  )}
                </div>
                <Button
                  label={t("changePass")}
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
            )

            /* <Button label="Xem album" onClick={() => {}} custom="mt-4" /> */
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
