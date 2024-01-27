"use client"

import DefaultImage from "@/app/components/defaultImage";
import PickUpListRes from "@/types/PickUpListRes";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import PutPickupDialog from "./putDialog";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";

const PickUpPage = () => { 
    const [openDialog, SetOpenDialog] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [currData, setCurrData] = useState<PickUpListRes | null>(null) // data of selected pickup

    const { data: pickups } = useFetch<PickUpListRes[]>('parent/pickuplist', null, refresh);

    const OnEdit = (x: PickUpListRes) => { 
        setCurrData(x)
        SetOpenDialog('edt')
    }

    const OnAdd = () => {
        SetOpenDialog('add')
    }

    const OnDelete = (x: PickUpListRes) => {
        if (!confirm(`Xác nhận xóa ${x.fullName} khỏi danh sách đón hộ?`)) return;
        callApiWithToken()
            .delete('parent/deletepickup/' + x.id)
            .then(() => {
                toast.success('Đã xóa');
                setRefresh(x => !x);
            }).catch(() => {
                toast.error('Có lỗi xảy ra');
            })
    }

    const onToggleStatus = (id: number) => { 
        callApiWithToken()
            .get('parent/togglepickup/' + id)
            .then(() => {
                setRefresh(x => !x);
            }).catch(() => {
                toast.error('Có lỗi xảy ra');
            })
    }

    //TODO:
    //Dialog edit 
    //toggle status
    //delete button

    return <div className="bg-white w-2/3 m-auto px-10 pt-10 rounded-xl">
        <h2 className="text-2xl font-bold">Danh sách người đón hộ</h2>
        <p>Những người được cấp quyền đưa đón trẻ thay cho người giám hộ</p>

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5" onClick={OnAdd}>
            + Thêm mới
        </button>

        <ul role="list" className="divide-y divide-gray">
            {
                pickups && pickups.map(x => <>
                    <li className="flex gap-x-6 py-5 group" key={x.id}>
                        <div className="w-5/12 flex min-w-0 gap-x-4">
                            <DefaultImage
                                key={x?.avatar}
                                img={getImageUrl(x?.avatar)}
                                fallback="/avatar.webp"
                                className={`h-24 w-24 flex-none rounded-full bg-gray-50`}
                            />
                            {/* <img className="h-24 w-24 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                            <div className="min-w-0 flex-auto flex flex-col justify-evenly">
                                <p className="text-xl font-semibold leading-6 text-gray-900">{x.fullName}</p>
                                <p className="mt-1 truncate text-l leading-5 text-gray-500">sđt: {x.phoneNumber}</p>
                            </div>
                        </div>

                        <div className="w-5/12 hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-evenly">
                            <p className="text-xl leading-6 text-gray-900">đ/c: {x.address}</p>
                            <div className="mt-1 flex items-center gap-x-1.5">
                                {
                                    x.status ?
                                    <>
                                        <div className="cursor-pointer flex-none rounded-full bg-emerald-500/20 p-1" title="Hủy bỏ" onClick={() => onToggleStatus(x.id)}>
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                        </div>
                                        <p className="text-l leading-5 text-gray-500">Được đón hộ</p>       
                                    </>
                                    :
                                    <>
                                        <div className="cursor-pointer flex-none rounded-full bg-red-500/20 p-1" title="Cho phép" onClick={() => onToggleStatus(x.id)}>
                                            <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                                        </div>
                                            <p className="text-l leading-5 text-gray-500"><del>Được đón hộ</del></p>
                                    </>
                                }
                            </div>
                        </div>

                        <div className="invisible group-hover:visible flex flex-col justify-evenly">
                            <div className="rounded-full p-2 text-blue-600 border-blue-600 border-solid border-2 cursor-pointer" onClick={() => OnEdit(x)}>
                                <FaPen />
                            </div>

                            <div className="rounded-full p-2 text-red-600 border-red-600 border-solid border-2 cursor-pointer" onClick={() => OnDelete(x)}>
                                <FaDeleteLeft />
                            </div>
                        </div>
                    </li>
                </>)
            }
            
        </ul>

        {/* put dialog */}
        {openDialog && <PutPickupDialog onClose={() => { SetOpenDialog("") }} onSuccess={() => { setRefresh(x => !x) }} mode={openDialog} defaultData={currData} /> }
    </div>
}

export default PickUpPage