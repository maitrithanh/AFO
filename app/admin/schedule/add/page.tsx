"use client"; // dùng tạm //dùng luôn đi

import React, { useMemo } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import useFetch from "@/utils/useFetch";
import ScheduleDetail, { ScheduleItem } from "@/types/ScheduleDetail";
import { getCookie } from "cookies-next";
import { time } from "console";
import ScheduleTable from "@/app/components/schedule/scheduleTable";

interface TimeStamp {
    begin: string;
    end: string;
}

interface CellData {
    colSpan: number;
    rowSpan?: number;
    activity?: string;
    key?: string;
    isCurr?: boolean;
}

const AddSchedulePage = () => {
    const { t } = useTranslation();
    const id = '24MN000000';
    const { data } = useFetch<ScheduleDetail>(
        "Schedule/ScheduleOfChild/" + id,
        null,
        id
    );

    return (
        <div className="px-5 w-full m-auto">
            <div className="flex justify-between items-center w-full ">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white rounded-sm">
                        <Select>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder={t("week")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">{t("week")} 1</SelectItem>
                                <SelectItem value="2">{t("week")} 2</SelectItem>
                                <SelectItem value="3">{t("week")} 3</SelectItem>
                                <SelectItem value="4">{t("week")} 4</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default h-full">
                {data && <ScheduleTable dataSrc={data} />}
            </div>
        </div>
    );
};

export default AddSchedulePage;
