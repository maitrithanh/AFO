"use client"

import DetailMenuRes, { DetailMenuItem } from "@/types/DetailMenuRes"
import MealRes from "@/types/MealRes";
import useFetch from "@/utils/useFetch"
import { useEffect, useState } from "react";
import moment from 'moment'
import { FaBan, FaClipboard, FaCopy, FaDeleteLeft, FaTrashCan } from "react-icons/fa6";
import AddItem from "./addItem";
import FoodRes from "@/types/FoodRes";

interface Props { 
    edit?: boolean
}

interface CopyItem {
    idMeal?: number,
    day?: number,
}

const MenuPage = ({ edit = true }: Props ) => { 
    const [week, setWeek] = useState(moment().format('YYYY') + '-W' + moment().format('WW'))
    const [menuItems, setMenuItems] = useState<DetailMenuItem[]>([]);
    const [copyItem, setCopyItem] = useState<CopyItem | null>(null);

    const { data: dataMenu, loading } = useFetch<DetailMenuRes>('Menu/MenuOfWeek/' + week, null, week);
    const { data: dataMeal } = useFetch<MealRes[]>('Menu/ListMeal');
    const { data: dataFood } = useFetch<FoodRes[]>('Menu/ListFood');

    useEffect(() => { 
        if (dataMenu?.items) setMenuItems(dataMenu?.items);
    }, [dataMenu])

    const days = ["T2", "T3", "T4", "T5", "T6", "T7"];

    const getListFood = (day: number, meal: number): DetailMenuItem[] => { 
        return menuItems.filter(x => x.day === day && x.idMeal === meal) || []
    }

    const getWeekName = (week: string = '') => { 
        var arr: string[] = week.split('-W')
        return "Tuần " + arr[1] + ' - ' + arr[0];
    }

    const onRemove = (idMeal?: number, day?: number, idFood?: number) => { 
        setMenuItems(x => x.filter(y =>
            (idMeal != null && y.idMeal != idMeal)
            || (day != null && y.day != day)
            || (idFood != null && y.idFood != idFood)
        ));
    }

    const onAddItem = (idMeal: number, day: number, idFood: number, nameFood: string) => { 
        var newItem: DetailMenuItem = { idMeal, day, idFood, nameFood }
        if (menuItems.find(x => x.idMeal == idMeal && x.day == day && x.idFood == idFood)) return;
        setMenuItems(x => [...x, newItem]);
    }

    const compareNull = (a: any, b: any): boolean => { 
        if (a == null && b == null) return true;
        if (a != null && b != null) return true;

        return false;
    }

    const checkPaste = (item: CopyItem): number => { //mark cells to paste: 0 => hidden, 1 => paster, 2 => cancel
        if (item.day == copyItem?.day && item.idMeal == copyItem?.idMeal) return 2;

        if (!compareNull(item.day, copyItem?.day)) return 0;
        if (!compareNull(item.idMeal, copyItem?.idMeal)) return 0;
        
        return 1;
    }

    const onPaste = (item: CopyItem) => { 
        //delete old items
        var curr = menuItems.filter( x => 
            (item.day != null && x.day != item.day)
            || (item.idMeal != null && x.idMeal != item.idMeal)
        );

        //paste new items
        console.log(menuItems);
        var pasteItems = menuItems.filter(x =>
            (copyItem?.day == null || x.day == copyItem?.day)
            && (copyItem?.idMeal == null || x.idMeal == copyItem.idMeal)
        );

        pasteItems = pasteItems.map(x => { return { ...x, idMeal: item.idMeal ?? x.idMeal, day: item.day ?? x.day } });
        curr = [...curr, ...pasteItems];

        setMenuItems(curr);
        setCopyItem(null);
    }

    const Actions = ({ day, idMeal }: CopyItem) => {

        return copyItem ?
            <span className="flex">
                {
                    checkPaste({ day, idMeal }) == 1 ?
                        <button title="Dán" className="mr-2" onClick={() => onPaste({ day, idMeal })}>
                            <FaClipboard />
                        </button>
                        : checkPaste({ day, idMeal }) == 2 ?
                        <button title="Hủy" className="mr-2" onClick={() => setCopyItem(null)}>
                            <FaBan />
                        </button>
                            //placeholder
                        : <button title="Hủy" className="mr-2 invisible"> 
                            <FaBan />
                        </button>
                }
            </span>
            :
            <span className="flex invisible group-hover:visible">
                <button title="Sao chép" className="mr-2" onClick={() => setCopyItem({ day, idMeal })}>
                    <FaCopy />
                </button>
                <button title="Xóa cột"
                    onClick={() => onRemove(idMeal, day)}>
                    <FaTrashCan />
                </button>
            </span>
    }

    return <div>
        <div>
            <input type="week" value={week} onChange={(e) => { setWeek(e.currentTarget.value) }} placeholder="Chọn tuần" />
            <i> 
                {
                    " (" + moment(week, 'YYYY-WWW').isoWeekday(1).format('DD/MM/YYYY') + '-'
                    + moment(week, 'YYYY-WWW').isoWeekday(7).format('DD/MM/YYYY') + ')'
                } 
            </i>
        </div>

        {
            dataMenu && 
            <>
                <h2 className="text-2xl">{dataMenu?.menu.name}</h2>
                <i>Áp dụng từ: {getWeekName(dataMenu?.menu.start)} đến {getWeekName(dataMenu?.menu.end)}</i>
            </>
        }

        {
            loading ? 
            <div>
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
            :
            <div>
                <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th></th>
                                {days.map((x, i) =>
                                    <th className="px-6 py-3 relative hover:bg-gray-100 group" key={x}>
                                        {x}
                                        <div className="absolute right-0 top-[50%] translate-y-[-50%] mr-2">
                                            <Actions day={i} />
                                        </div>
                                    </th>
                                )}
                        </tr>
                    </thead>
                    <tbody>
                        {dataMeal?.map(x => <tr key={x.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-6 py-4 relative group hover:bg-gray-100">
                                {x.name}
                                {/* <div className="absolute right-0 top-[10%] mr-2 invisible group-hover:visible">
                                    <button title="Xóa hàng" onClick={() => onRemove(x.id)}>
                                        <FaTrashCan />
                                    </button>
                                </div> */}
                            </th>

                            {days.map((y, i) => <td key={`${x.id}-${i}`} className="px-6 pt-2 min-h-[200px] group">
                                <div className="flex mb-2">
                                    <div className="w-full"></div>

                                    <Actions day={i} idMeal={x.id} />
                                </div>

                                {getListFood(i, x.id).map((z, j) => <div key={`${x.id}-${i}-${j}`} className="group/item">
                                    <span className="group-hover/item:text-blue-400">{z.nameFood}</span>
                                    <button title="Xóa món"
                                        className="invisible ml-2 group-hover/item:visible hover:text-black"
                                        onClick={ () => onRemove(z.idMeal, z.day, z.idFood) }>
                                        <FaDeleteLeft />
                                    </button>
                                </div>)}

                                {edit &&
                                    <div>
                                        <AddItem onAdd={(food) => { onAddItem(x.id, i, food.id, food.name) }} dataSource={dataFood || []} />
                                    </div>
                                }
                            </td>)}
                        </tr>)}
                    </tbody>
                </table>
            </div>
        }
    </div>
}

export default MenuPage