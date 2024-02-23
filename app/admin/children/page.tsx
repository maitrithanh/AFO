"use client"

import useFetch from "@/utils/useFetch"
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
import { checkNameInclude, compareName } from "@/utils/compare"
import { ChildrenData } from "@/types/ChildrenData"
import { t } from "i18next"
import DefaultImage from "@/app/components/shared/defaultImage"
import SearchBar from "@/app/components/shared/searchBar";
import { getImageUrl } from "@/utils/image";

const ParentPage = () => {

    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('new')
    const [keyword, setKeyword] = useState(''); //searching

    const { data: dataChildren } = useFetch<ChildrenData[]>('Child/GetList')

    const RowPerPage = 20;

    const searchChild = (c: ChildrenData): boolean => {
        const matchName: boolean = checkNameInclude(c.fullName, keyword)
        const matchPhone: boolean = c.phone.includes(keyword);
        return matchName || matchPhone
    }

    const PageCount = useMemo(() => {
        return Math.ceil((dataChildren?.filter(searchChild).length ?? 0) / RowPerPage)
    }, [dataChildren, keyword])

    const compareChild = (a: ChildrenData, b: ChildrenData): number => {
        //-1 => a < b
        switch (sort) {
            case 'new':
                return a.joinDate <= b.joinDate ? 1 : -1
            case 'az':
                return compareName(a.fullName, b.fullName)
            case 'za':
                return -compareName(a.fullName, b.fullName)
            default: return -1;
        }
    }
    const searchHints = useMemo(() => { 
        var names = dataChildren?.map(x => x.fullName) || [];
        var phones = dataChildren?.map(x => x.phone) || [];
        return [...names, ...phones]
    }, [dataChildren])

    const onSearch = (s: string) => { 
        setKeyword(s);
        setPage(1);
    }

    return <>
        <div>
            <h2 className="text-2xl font-bold">Danh sách trẻ</h2>
        </div>

        <div className="flex justify-between items-center mb-5">
            <Link href={'/admin/children/add'}>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5">
                    + {t("addNew")}
                </button>
            </Link>

            
            <div className="flex items-center">
                <p className="text-xl">Tìm kiếm: </p>
                <div className="w-[250]">
                    <SearchBar dataSource={searchHints} placeholder="Nhập tên hoặc sđt..." onSearch={onSearch} />
                </div>
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

        <div className="mb-3 italic">
            {keyword &&
                `Tìm kiếm "${keyword}": `
            }
        </div>
        <div className="relative max-h-[650px] overflow-auto shadow-3xl sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Họ tên
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Lớp
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("dateOfBirth")}
                        </th>
                        <th>
                            Giới tính
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Người giám hộ
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("phoneNumber")}
                        </th>

                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {[...dataChildren || []]
                        .filter(searchChild)
                        .sort(compareChild).slice((page - 1) * RowPerPage, page * RowPerPage)
                        .map((x, i) => {
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
                                    <DefaultImage
                                        img={getImageUrl(x.avatar)}
                                        fallback="/avatar.webp"
                                    />
                                </th>
                                <td className="px-6 py-4">
                                    {x.fullName}
                                </td>
                                <td className="px-6 py-4">
                                    {x.classRoom}
                                </td>
                                <td className="px-6 py-4">
                                    {x.birthDay}
                                </td>
                                <td className="px-6 py-4">
                                    {x.gender}
                                </td>
                                <td className="px-6 py-4">
                                    {x.parentName}
                                </td>
                                <td className="px-6 py-4">
                                    {x.phone}
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

        <MyPagination page={page} setPage={setPage} PageCount={PageCount} />
    </>
}

export default ParentPage