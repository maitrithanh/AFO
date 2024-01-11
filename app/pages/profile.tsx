"use client"

import { useEffect } from 'react'
import UserData from '@/types/UserData';
import useFetch from '@/utils/useFetch';
import Button from '../components/Button';
import { FaFacebook, FaGoogle, FaRectangleXmark } from 'react-icons/fa6';
import { signIn, signOut, useSession } from 'next-auth/react'
import { callApiWithToken } from '@/utils/callApi';
import ResponseData from '@/types/ResponseData';
import LoginRes from '@/types/LoginRes';
import toast from "react-hot-toast";
import Loading from '../components/Loading';
import DefaultImage from '../components/defaultImage';

const ProfilePage = () => {
    const { data: user } = useFetch<UserData>('Auth/current');

    const { data: Session } = useSession();
    useEffect(() => {
        if (Session?.token || Session?.access_token) {
            var path, token: string;
            if (Session.token) {
                path = 'Auth/LinkGoogle/';
                token = Session.token;
            } else {
                path = 'Auth/LinkFacebook/';
                token = Session.access_token;
            }

            callApiWithToken()
                .post<ResponseData<LoginRes>>(path, {token})
                .then(async (response) => {
                    toast.success("Liên kết thành công");
                })
                .catch((error) => {
                    toast.error("Có lỗi xảy ra");
                    
                }).finally(() => { 
                    signOut();
                })
        }
    }, [Session])

    const onUnlink = (s: string) => { 
        if (!window.confirm('Hủy liên kết với tài khoản ' + s)) return;

        callApiWithToken().get(`Auth/Unlink${s}`)
            .then(res => { 
                toast.success("Hủy liên kết thành công");
            })
            .catch(err => { 
                toast.error("Có lỗi xảy ra");
            })
    }

    return <div>
        {
            !user ? <Loading /> :
            <div className="bg-gray-100 px-20 py-4">

                <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">

                    <div className="flex rounded-t-lg bg-[#dc662b] sm:px-2 w-full">
                        <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3 bg-white">
                                <DefaultImage img={user.avatar} fallback='/avatar.jpg' />
                        </div>

                        <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
                            <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
                                {user?.fullName}
                            </p>
                            <p className="text-heading">#{user?.id}</p>
                        </div>

                    </div>


                    <div className="p-5">

                        <div className="flex flex-col sm:flex-row sm:mt-10">

                            <div className="flex flex-col sm:w-1/3">

                                <div className="py-3 sm:order-none order-3">
                                    <h2 className="text-lg font-poppins font-bold text-top-color text-[#dc662b]">Thông tin cơ bản</h2>
                                    <div className="border-2 w-20 border-top-color my-3"></div>

                                    <div>
                                        <div className="flex items-center my-1">
                                            <span className="font-bold">CCCD: </span>
                                            <div className="ml-2 truncate"> {user?.numberID}</div>
                                        </div>
                                        <div className="flex items-center my-1">
                                            <span className="font-bold">Giới tính: </span>
                                            <div className="ml-2 truncate"> {user?.gender}</div>
                                        </div>
                                        <div className="flex items-center my-1">
                                            <span className="font-bold">Ngày sinh: </span>
                                            <div className="ml-2 truncate"> {user?.birthDay}</div>
                                        </div>
                                        <div className="flex items-center my-1">
                                            <span className="font-bold">Quốc tịch: </span>
                                            <div className="ml-2 truncate"> {user?.nation}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-col sm:w-1/3">

                                <div className="py-3 sm:order-none order-3">
                                    <h2 className="text-lg font-poppins font-bold text-top-color text-[#dc662b]">Thông tin liên hệ</h2>
                                    <div className="border-2 w-20 border-top-color my-3"></div>

                                    <div>
                                        <div className="flex items-center my-1">
                                            <span className="font-bold">Địa chỉ: </span>
                                            <div className="ml-2 truncate"> {user?.address}</div>
                                        </div>
                                        <div className="flex items-center my-1">
                                            <span className="font-bold">Email: </span>
                                            <div className="ml-2 truncate"> {user?.email}</div>
                                        </div>
                                        <div className="flex items-center my-1">
                                            <span className="font-bold">Số điện thoại: </span>
                                            <div className="ml-2 truncate"> </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-col sm:w-1/3">

                                <div className="py-3 sm:order-none order-3">
                                    <h2 className="text-lg font-poppins font-bold text-top-color text-[#dc662b]">Hồ sơ</h2>
                                    <div className="border-2 w-20 border-top-color my-3"></div>

                                    <div>
                                        <div className="flex items-center my-1">
                                            <span className="font-bold">Level: </span>
                                            <div className="ml-2 truncate"> {user?.level}</div>
                                        </div>
                                        <div className="flex items-center my-1">
                                            <span className="font-bold">Ngày gia nhập: </span>
                                            <div className="ml-2 truncate"> {user?.joinDate}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:mt-5">
                            <div className="flex flex-col">

                                <div className="py-3 sm:order-none order-3">
                                    <h2 className="text-lg font-poppins font-bold text-top-color text-[#dc662b]">Liên kết tài khoản</h2>
                                    <div className="border-2 w-20 border-top-color my-3"></div>

                                    <div className='flex'>
                                        <div className="flex items-center my-1 mr-20">
                                            <span className="font-bold mr-5">Facebook: </span>
                                                {user?.facebookName ?
                                                    <>
                                                        {user.facebookName}
                                                        <div onClick={() => onUnlink('facebook')} className='ml-5 text-2xl cursor-pointer hover:text-red-500'>
                                                            <FaRectangleXmark />
                                                        </div>
                                                    </> :
                                                    <>
                                                        <Button
                                                            label={"Liên kết với Facebook"}
                                                            outline
                                                            custom="mr-2"
                                                            icon={FaFacebook}
                                                            onClick={() => signIn('facebook')}
                                                        />
                                                    </>
                                                }
                                        </div>
                                        <div className="flex items-center my-1 align-center">
                                            <span className="font-bold mr-5">Google: </span>
                                            {user?.loginGoogle ?
                                                <>
                                                    {user.loginGoogle}
                                                    <div className='ml-5 text-2xl cursor-pointer hover:text-red-500'
                                                        onClick={() => onUnlink('google')} >
                                                            
                                                        <FaRectangleXmark />
                                                    </div>
                                                </> :
                                                <>
                                                    <Button
                                                        label={"Liên kết với Google"}
                                                        outline
                                                        custom="mr-2"
                                                        icon={FaGoogle}
                                                        onClick={() => signIn('google')}
                                                    />
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}
 
export default ProfilePage;