"use client"

import FoodRes from "@/types/FoodRes";
import removeVietnameseTones from "@/utils/removeTones";
import { useMemo, useState } from "react";

interface Props<T> { 
    onAdd: (food: T) => void,
    dataSource: T[],
    getName: (x: T) => string,
    getKey: (x: T) => string,
    placeholder?: string,
    width?: string,
}

function AddItem<T = FoodRes> ({ onAdd, dataSource, getName, getKey, placeholder,width }: Props<T>) {
    const [keyword, setKeyword] = useState('');

    if (!placeholder) placeholder = "Thêm món";
    if (!width) width = "100%";

    const hints = useMemo(() => { 
        return dataSource.filter(x => removeVietnameseTones(getName(x)).toLowerCase().includes(removeVietnameseTones(keyword).toLowerCase()));
    }, [dataSource, keyword])

    const onSubmit = () => { 
        var food: T = hints[0];
        if (!food) return;

        onAdd(food);
        setKeyword('');
    }

    const onChooseHint = (food: T) => { 
        onAdd(food);
        setKeyword('');
    }

    return <div className={`${keyword == '' ? 'invisible': ''} group-hover:visible z-10`}>
        <div className="flex relative group/search">
            <input type="text" name="food" placeholder={placeholder} className={`${hints?.length > 0? '' : 'text-red-400'} w-full outline-none peer`}
                onChange={(e) => setKeyword(e.currentTarget.value)} value={keyword} onKeyDown={e => { if(e.key === 'Enter') onSubmit()}}
            />
            <div className={`absolute left-0 bottom-0 translate-y-[100%] w-[${width}] bg-gray-200 max-h-[150px] overflow-auto invisible peer-focus:visible hover:visible z-10`}>
                {hints.map(x => <div key={getKey(x)} className="hover:bg-white py-[5px] px-1 cursor-pointer" onClick={() => onChooseHint(x)}>
                    {getName(x)}
                </div>)}
            </div>

            <button onClick={onSubmit} className={`${hints?.length > 0 ? 'bg-blue-500' : 'bg-gray-500'}  text-white font-bold py-1 px-2 rounded`}>
                +
            </button>
        </div>
    </div>
}

export default AddItem