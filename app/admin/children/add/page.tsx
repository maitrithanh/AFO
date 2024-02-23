"use client"

import ChildrenPutForm from "@/app/components/admin/children/putForm"
import ParentPutForm from "@/app/components/admin/parent/parentPutForm"
import AddChildReq from "@/types/AddChildReq"
import AddParentReq from "@/types/AddParentReq"
import { callApiWithToken } from "@/utils/callApi"
import { t } from "i18next"
import { useState } from "react"
import toast from "react-hot-toast"

const AddChildrenPage = () => {

    const initChild = {
        FullName: '',
        BirthDay: '',
        Nation: 'Việt Nam',
        Gender: 0,
        Address: '',
        Note: '',
        Avatar: null
    };

    const initParent = {
        FullName: '',
        PhoneNumber: '',
        Gender: 0,
        Address: '',
        BirthDay: '',
        IDNumber: '',
        Job: '',
        Note: '',
    }

    const [dataChildren, setDataChildren] = useState<AddChildReq>(initChild)
    const [dataParent, setDataParent] = useState<AddParentReq>(initParent)
    const [registerdParent, setRegisterdParent] = useState(false);

    const onSubmit = () => { 
        let formData = new FormData();

        for (const [propName, propValue] of Object.entries(dataChildren)) {
            const fullKey = `${'child'}.${propName}`
            formData.append(fullKey, propValue);
        }

        for (const [propName, propValue] of Object.entries(dataParent)) {
            const fullKey = `${'parent'}.${propName}`
            formData.append(fullKey, propValue);
        }

        if (!registerdParent) { 
            callApiWithToken()
            .post("child/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Specify content type
                },
            })
            .then((res) => {
                toast.success(t("toastUpdate"));
                setDataChildren(initChild);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.error || 'Lỗi');
            })
        }
    }

    return <div className="w-[50%] mx-auto">
        <h2 className="font-bold text-xl mb-3">Thông tin trẻ: </h2>
        <div>
            <ChildrenPutForm data={dataChildren} setData={(x) => setDataChildren(x)} />
        </div>

        <div className="flex justify-between">
            <h2 className="font-bold text-xl mb-3">Thông tin người giám hộ: </h2>
            <label className="inline-flex items-center mb-5 cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked={registerdParent} onChange={() => { setRegisterdParent(x => !x)}} />
                <span className="text-sm font-medium  peer-checked:text-gray-500 text-green-600">NGH mới</span>
                <div className="relative w-11 h-6 bg-green-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 mx-3"></div>
                <span className="text-sm font-medium text-gray-500 peer-checked:text-blue-600">NGH đã đăng ký</span>
            </label>
        </div>
        {
            registerdParent ?
                
                <div>
                    select parent
                </div>
                :
                <div>
                    <ParentPutForm data={dataParent} setData={(x) => setDataParent(x)} />
                </div>
        }
        

        <div className="flex justify-end">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onSubmit}
            >
                Xác nhận
            </button>
        </div>
    </div>
}

export default AddChildrenPage