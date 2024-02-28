"use client"

import MyPagination from "@/components/ui/pagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "./searchBar";
import { checkNameInclude } from "@/utils/compare";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { t } from "i18next";

//default values
//icon của action
const DefaultActionIcon = <Image
    title="Chi tiết"
    src={"/icons/detail.webp"}
    alt="Detail"
    width={26}
    height={26}
    priority
    className="hover:scale-110 transition-all"
/>
//số dòng mỗi trang
const DefaultRowPerPage = 20;

export interface TableTemplateAction<T = any> { 
    icon?: JSX.Element
    //trả đường link theo object
    //vd: (x) => `/admin/listparent/${x.id}`
    getLink?: (obj: T) => string,
    //hoặc là sự kiện
    onClick?: (obj: T) => void
}

interface IObject {
    [id: string]: any;
}

export interface TableTemplateColumn<T = any> {
    //tên cột
    title: string,
    //callback để lấy thuộc tính từ object, trả về string hoặc element
    //vd: (x) => x.fullName
    getData: (obj: T) => string | JSX.Element | undefined
}

export interface TableTemplateSort<T = any> { 
    compare: (a: T, b: T) => number,
    title: string,
}

//T khỏi truyền cũng được
interface Props<T extends IObject> { 
    //tên trang
    title: string
    //list data từ api 
    dataSource: T[]
    //ds các cột
    columns: TableTemplateColumn<T>[]

    //các actions ở cột cuối
    actions?: TableTemplateAction<T>[]
    //ds các cột có thể tìm kiếm
    searchColumns?: TableTemplateColumn<T>[]
    searchPlaceHolder?: string
    //ds sắp xếp, >= 2 mới hiện dropdown
    //có thể truyền 1 cái làm thứ tự mặc định
    sortOptions?: TableTemplateSort[]
    addButton?: {
        button?: JSX.Element,
        link?: string,
        onClick?: () => void
    }
    extraElementsToolBar?: JSX.Element

    //options
    hideIndex?: boolean
    hidePaging?: boolean
    rowPerPage?: number
}

function TableTemplate<T extends IObject = any>(
    {
        title, dataSource, columns, actions, addButton,
        searchColumns, searchPlaceHolder, sortOptions,
        extraElementsToolBar, hideIndex, hidePaging, rowPerPage
    }: Props<T>) { 
    
    //init
    if (!rowPerPage) rowPerPage = DefaultRowPerPage
    const filter = (obj: T): boolean => {

        if (searchColumns?.length) { 
            for (var i = 0; i < searchColumns.length; i++) {
                var col = searchColumns[i];

                var data = col.getData(obj);
                if ((typeof data) == 'string') {
                    console.log(col.getData(obj) as string, keyword, checkNameInclude(col.getData(obj) as string, keyword));//
                    if (checkNameInclude(col.getData(obj) as string, keyword)) return true;
                }
            }
        }

        return false;
    }
    
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState(''); //searching
    const [sort, setSort] = useState(0);

    useEffect(() => { 
        setPage(1);
    }, [keyword, sort])

    const filteredData = useMemo(() => { 
        var list = dataSource;
        if (searchColumns?.length && keyword) list = list.filter(filter);
        if (sortOptions?.length && sortOptions?.length > sort) { 
            var comp = sortOptions[sort].compare;
            list = [...list].sort(comp);
        }

        return list;
    },[dataSource, searchColumns, keyword, sort])

    const PageCount = useMemo(() => {
        return Math.ceil(filteredData.length / rowPerPage!)
    }, [filteredData])

    const searchHints = useMemo(() => {
        var hints: string[] = []
        if (!searchColumns?.length) return [];

        searchColumns.forEach(col => { 
            dataSource.forEach(dataSrc => {
                var data = col.getData(dataSrc);
                if (typeof data == 'string')
                    hints.push(data as string)
            })
        })

        return hints;
    }, [dataSource])

    const onSearch = (s: string) => {
        setKeyword(s);
    }

    const DefaultAddBtn = <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => { if (addButton?.onClick) addButton.onClick(); }}
    >
        + {t("addNew")}
    </button>
    
    return <>
        <div>
            <h2 className="text-2xl font-bold mb-5">{title}</h2>
        </div>

        <div className="flex justify-between items-baseline mb-5">
            {
                addButton &&
                <Link href={addButton.link ?? ''}>
                        {
                            addButton.button ||
                            DefaultAddBtn
                        }
                </Link>
            }

            {
                searchColumns?.length &&
                <div className="flex items-center">
                    <p className="text-xl">Tìm kiếm: </p>
                    <div className="w-[250px]">
                            <SearchBar dataSource={searchHints} placeholder={searchPlaceHolder} onSearch={onSearch} />
                    </div>
                </div>
            }

            {
                sortOptions?.length &&
                <div className="bg-white shadow-lg rounded-lg">
                    <Select
                        onValueChange={(value: any) => {
                            setSort(value);
                        }}
                    >
                        <SelectTrigger className="w-[200px] text-lg">
                            <p>Sắp xếp:</p>
                                <SelectValue placeholder={sortOptions[0].title} defaultValue={'0'} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                sortOptions.map((x, i) => <>
                                    <SelectItem key={x.title} value={i + ''}>{x.title}</SelectItem>        
                                </>)
                            }        
                        </SelectContent>
                    </Select>
                </div>
            }

            {extraElementsToolBar}

        </div>

        <div className="relative max-h-[650px] overflow-auto shadow-3xl sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]">
                <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {!hideIndex && <th>{/* index */}</th>}
                        
                        {columns.map(x => <th key={x.title} scope="col" className="px-6 py-3">
                            {x.title}
                        </th>)}

                        <th>{/* actions */}</th> 
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        filteredData
                            .slice((page - 1) * rowPerPage!, page * rowPerPage!)
                            .map((row, i) => <tr
                            key={row['id'] ?? i}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            
                                <td className="pl-6 py-4">
                                    {i + 1 + (page - 1) * rowPerPage!}
                                </td>

                            {columns.map((col, j) => <>
                                <td key={row['id'] ?? i + '-' + j}
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {col.getData(row)}
                                </td>
                            </>)}

                            {actions?.map((act, i) => <>
                                <td className="md:px-6 md:py-4" key={i}>
                                    <Link
                                        href={act.getLink ? act.getLink(row) : ''}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={act.onClick ? () => { act.onClick!(row); } : () => { }}
                                    >
                                        {act.icon ?? DefaultActionIcon}
                                    </Link>
                                </td>
                            </>)}
                            
                        </tr>
                        )}
                </tbody>
            </table>
        </div>

        {!hidePaging && <MyPagination page={page} setPage={setPage} PageCount={PageCount} /> }
    </>
}

export default TableTemplate