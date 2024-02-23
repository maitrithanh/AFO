"use client"

import AddChildReq from "@/types/AddChildReq"
import { toYMD } from "@/utils/dateTime"
import { ChangeEvent } from "react"

interface Props { 
    data?: AddChildReq,
    setData: (data: AddChildReq) => void
}

const ChildrenPutForm = ({ data, setData }: Props) => { 

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => { 
        const name = e.target.name;
        const value = e.target.value;

        setData({ ...data, [name]: value });
    }

    return <>

        <form>

            <div className="flex items-center">
                <div className="border border-gray-200 rounded dark:border-gray-700mr-5 mr-5">
                    <label htmlFor="avatar" title="Hình ảnh">
                        {data?.Avatar ?
                            <img
                                src={URL.createObjectURL(data.Avatar)}
                                alt="Current Avatar"
                                className="w-[100px] h-[100px] rounded-full"
                            />
                            :
                            <img src="/upload-image.jpg" alt=""
                                className="w-[100px] cursor-pointer"
                            />
                        }
                    </label>

                    <input type="file" id="avatar" className="hidden" title="Chọn hình"
                        onChange={e => setData({ ...data, Avatar: e.target.files![0] })}
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex items-baseline">
                        <div className="relative z-0 flex-1 mb-5 group">
                            <input type="text" name="FullName" id="FullName"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                onChange={onInputChange} value={data?.FullName}
                            />
                            <label htmlFor="FullName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Họ và tên
                            </label>
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-3 mx-5">
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="Gender-male-c" type="radio" radioGroup="gender-children" value="1" name="Gender"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={onInputChange} checked={data?.Gender == 1}
                                />
                                <label htmlFor="Gender-male-c" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="Gender-female-c" type="radio" radioGroup="gender-children" value="0" name="Gender"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={onInputChange} checked={!data || data.Gender != 1}
                                />
                                <label htmlFor="Gender-female-c" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nữ</label>
                            </div>
                        </div>

                        <div className="relative z-0 mb-5 group w-[100px]">
                            <input type="text" name="Nation" id="Nation"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                onChange={onInputChange} value={data?.Nation}
                            />
                            <label htmlFor="Nation" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Quốc tịch
                            </label>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="Address" id="Address"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                onChange={onInputChange} value={data?.Address}
                            />
                            <label htmlFor="Address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Địa chỉ
                            </label>
                        </div>

                        <div className="relative z-0 mb-5 group ml-5">
                            <input type="date" name="BirthDay" id="BirthDay"
                                className="block py-2.5 px-0 w-[100px] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer h-[41.6px]" placeholder=" " required
                                onChange={onInputChange} value={toYMD(data?.BirthDay || '')}
                            />
                            <label htmlFor="BirthDay" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Ngày sinh
                            </label>
                        </div>

                    </div>
                </div>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="Note" id="Note"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                    onChange={onInputChange} value={data?.Note}
                />
                <label htmlFor="Note" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Ghi chú
                </label>
            </div>

            
            {/* <div className="flex justify-end">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
            </div> */}
        </form>
    </>
}

export default ChildrenPutForm