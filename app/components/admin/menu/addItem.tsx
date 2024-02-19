"use client"

import FoodRes from "@/types/FoodRes";
import removeVietnameseTones from "@/utils/removeTones";
import { useMemo, useState } from "react";

interface Props { 
    onAdd: (food: FoodRes) => void,
    dataSource: FoodRes[]
}

const AddItem = ({ onAdd, dataSource }: Props) => {
    const [keyword, setKeyword] = useState('');

    const hints = useMemo(() => { 
        return dataSource.filter(x => removeVietnameseTones(x.name).toLowerCase().includes(removeVietnameseTones(keyword).toLowerCase()));
    }, [dataSource, keyword])

    const onSubmit = () => { 
        var food: FoodRes = hints[0];
        if (!food) return;

        onAdd(food);
        setKeyword('');
    }

    return <div className={`${keyword == '' ? 'invisible': ''} group-hover:visible relative group/search`}>
        <div className="flex">
            <input type="text" name="food" placeholder="Thêm món" className={`${hints?.length > 0? '' : 'text-red-400'} w-full outline-none`}
                onChange={(e) => setKeyword(e.currentTarget.value)} value={keyword} onKeyDown={e => { if(e.key === 'Enter') onSubmit()}}
            />
            <button onClick={onSubmit} className={`${hints?.length > 0 ? 'bg-blue-500' : 'bg-gray-500'}  text-white font-bold py-1 px-2 rounded`}>
                Thêm
            </button>
        </div>
        <div className="absolute left-0 bottom-0 translate-y-[100%] w-full bg-gray-200 max-h-[100px] overflow-auto invisible group-hover/search:visible">
            {hints.map(x => <div key={x.id} className="hover:bg-white py-[2px] cursor-pointer" onClick={() => setKeyword(x.name)}>  
                {x.name}
            </div>)}
        </div>
    </div>
}

export default AddItem