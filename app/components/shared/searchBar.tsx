"use client"

import { Input } from "@/components/ui/input";
import { checkNameInclude } from "@/utils/compare";
import { KeyboardEvent, useMemo, useState } from "react";

interface Props { 
    dataSource: string[],
    onSearch: (s: string) => void,
    placeholder?: string
}

const SearchBar = ({ dataSource, onSearch, placeholder }: Props) => { 
    const [search, setSearch] = useState('');

    const hints = useMemo(() => { 
        const hints: string[] = dataSource.filter(x => checkNameInclude(x, search));

        var res = Array.from(new Set(hints)); //remove dup
        return res;
    }, [search, dataSource])

    const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;

        onSearch(search);
    }

    const onChooseHint = (s: string) => { 
        setSearch(s);
        onSearch(s);
    }

    return <div className="mx-2 shadow-lg rounded-lg w-full relative group">
        <Input type="text" placeholder={placeholder} value={search}
            className={`peer ${hints.length > 0 ? '': 'text-red-500'}`}
            onChange={(e) => setSearch(e.currentTarget.value)} onKeyDown={onSearchKeyDown} />
        <div className="absolute left-0 bottom-0 z-10 translate-y-[100%] w-full max-h-[150px] overflow-y-auto bg-white shadow-lg rounded-lg invisible peer-focus:visible group-hover:visible">
            {search && hints.map(x => <div key={x} className="py-2 px-3 hover:bg-gray-200" onClick={ () => onChooseHint(x) }>
                {x}
            </div>)}
        </div>
    </div>
}

export default SearchBar