"use client"

import ParentListRes from "@/types/ParentListRes"
import useFetch from "@/utils/useFetch"
import { t } from "i18next"
import Image from "next/image"
import Link from "next/link"
import MyPagination from "@/components/ui/pagination";
import { useMemo, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { compareName } from "@/utils/compare"

const ParentPage = () => { 

    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('new')

    const { data: dataParent } = useFetch<ParentListRes[]>('Parent/GetList')

    const RowPerPage = 20;

    const PageCount = useMemo(() => { 
        return Math.ceil((dataParent?.length ?? 0) / RowPerPage)
    }, [dataParent])

    const getJoinDate = (a: ParentListRes): string => { 
        return a.children.reduce((res, curr) => curr.joinDate > res.joinDate ? curr : res).joinDate;
    }

    const compareParent = (a: ParentListRes, b: ParentListRes): number => { 
        //-1 => a < b
        switch (sort) { 
            case 'new':
                return getJoinDate(a) <= getJoinDate(b) ? 1 : -1
            case 'az':
                return compareName(a.fullName, b.fullName)
            case 'za':
                return -compareName(a.fullName, b.fullName)
            default: return -1;
        }
        
    }

    return <>
        <div className="flex justify-between items-center mb-5">
            <div>
                <h2 className="text-2xl font-bold mb-5">Danh sách phụ huynh</h2>
            </div>
            <div className="bg-white shadow-lg rounded-lg">
                <Select
                    onValueChange={(value) => {
                        setSort(value);
                    }}
                >
                    <SelectTrigger className="w-[200px] text-lg">
                        <p>Sắp xếp:</p>
                        <SelectValue placeholder={"Mới nhất"} defaultValue={sort} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="new">Mới nhất</SelectItem>
                        <SelectItem value="az">Tên (A-Z)</SelectItem>
                        <SelectItem value="za">Tên (Z-A)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="relative max-h-[650px] overflow-auto shadow-3xl sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th></th>
                        <th scope="col" className="px-6 py-3">
                            Tên Phụ Huynh
                        </th>
                        <th>
                            Tên Trẻ
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sđt
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Giới tính
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ngày sinh
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Địa chỉ
                        </th>

                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {[...dataParent || []]?.sort(compareParent).slice((page - 1) * RowPerPage, page * RowPerPage).map((x, i) => {
                        return (
                            <tr
                                key={x.id}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                                <td className="pl-6 py-4">
                                    {i + 1 + (page - 1) * RowPerPage}
                                </td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {x.fullName}
                                </th>
                                <td>
                                    <pre>
                                        {x.children.map(x => x.fullName).join(',\n')}
                                    </pre>
                                </td>
                                <td className="px-6 py-4 md:max-w-[660px]">
                                    {x.phoneNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {x.gender === 1? "Nam": "Nữ"}
                                </td>
                                <td className="px-6 py-4">
                                    {x.birthDay}
                                </td>
                                <td className="px-6 py-4">
                                    {x.address}
                                </td>

                                <td className="md:px-6 md:py-4">
                                    <Link
                                        href={`/admin/parent/${x.id}`}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        <Image
                                            title="Chi tiết"
                                            src={"/icons/detail.webp"}
                                            alt="Detail"
                                            width={26}
                                            height={26}
                                            priority
                                            className="hover:scale-110 transition-all"
                                        />
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

        <MyPagination page={page} setPage={setPage} PageCount={PageCount}/>
    </>
}

export default ParentPage