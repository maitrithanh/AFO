"use client"; // dùng tạm //dùng luôn đi

import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ScheduleDetail, { ScheduleItem } from "@/types/ScheduleDetail";

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
    dayStart?: number;
    dayEnd?: number;
    timeStart?: string;
    timeEnd?: string;
}

interface Props {
    dataSrc: ScheduleDetail,
    edit?: boolean
}

const ScheduleTable = ({ dataSrc, edit }: Props) => {
    const [data, setData] = useState(dataSrc);

    const { t } = useTranslation();
    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    const getCurrentTimeHHmm = (add = 0) => {
        const date = new Date();
        date.setHours(date.getHours() + add);

        const hours = date.getHours().toString().padStart(2, "0"); // Add leading zero for single-digit hours
        const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero for single-digit minutes

        return `${hours}:${minutes}`;
    }
    const getToday = () => (new Date().getDay() + 6) % 7;

    const timeStamps = useMemo(() => {
        var res: TimeStamp[] = [];

        const sortByBegin = (a: TimeStamp, b: TimeStamp) =>
            a.begin > b.begin ? 1 : -1;
        //sort + by begin
        var list: TimeStamp[] = [
            ...(data?.items.map((x) => {
                return { begin: x.begin, end: x.end };
            }) || []),
        ];
        list.sort(sortByBegin);

        var n = list.length;
        for (var i = 0; i < n; i++) {
            if (i + 1 >= n) {
                if (i < n) res.push(list[i]);
                break;
            }

            var x = list[i];
            var y = list[i + 1];

            //remove duplicate
            if ((x.begin == y.begin && x.end == y.end) || x.begin == x.end) {
                continue;
            }

            //b<c safe
            if (x.end <= y.begin) {
                res.push(x);
                continue;
            }

            //b > c
            //b > d => a-c, c-d, d-b vd: 9-12 + 10-11 =>9-10 + 10-11+ 11-12
            //edge case: a==c: 9-10 9-12
            if (x.begin != y.begin) res.push({ begin: x.begin, end: y.begin }); //a-c
            if (x.end > y.end) {
                list.push({ begin: y.end, end: x.end }); //d-b
            } else {
                //b < d => a-c, c-b, b-d vd 5-9 + 7-10 => 5-7 + 7-9 + 9-10
                y.begin = x.end;
                list.push({ begin: y.begin, end: x.end });
            }
            list.sort(sortByBegin);
        }

        return res;
    }, [data]);

    const tableData = useMemo<CellData[][]>(() => {
        var res: CellData[][] = [];
        if (!data) return [];

        var currTime = getCurrentTimeHHmm();
        var today = getToday();
        //find item of timespan x, day y and assign to res[x][y]
        for (var i = 0; i < timeStamps.length; i++) {
            res.push([]);

            for (var j = 0; j < days.length; j++) {
                var cell: CellData = { colSpan: 0 };
                var day = j;
                var time = timeStamps[i];

                //find the item containing current timestamp in the same day
                var items: ScheduleItem[] =
                    data?.items.filter(
                        (x) => x.day === day && time.begin >= x.begin && time.end <= x.end
                    ) || [];
                if (items.length > 0) {
                    var item = items[0];
                    cell.activity = item.activity;
                    cell.colSpan = 1;
                    cell.rowSpan = 1;
                    cell.key = `${day}:${time.begin}-${time.end}`;
                    cell.isCurr =
                        day === today && time.begin <= currTime && time.end >= currTime;
                    cell.dayStart = day;
                    cell.dayEnd = day;
                    cell.timeStart = time.begin;
                    cell.timeEnd = time.end;
                }

                res[i].push(cell);
            }
        }

        if (!edit) { 
            //merge rows
            for (var i = 0; i < timeStamps.length; i++) {
                var dup = res[i][0];
                for (var j = 1; j < days.length; j++) {
                    var curr = res[i][j];

                    //find duplicated activity
                    if (dup.colSpan && dup.rowSpan && dup.activity == curr.activity) {
                        curr.colSpan = 0; //delete this cell
                        dup.colSpan++; //merge dup cell
                        if (curr.isCurr) dup.isCurr = true;
                        dup.dayEnd = curr.dayEnd;
                        dup.timeEnd = curr.timeEnd;
                    } else {
                        dup = curr;
                    }
                }
            }
        }

        //merge Cols
        for (var j = 0; j < days.length; j++) {
            var dup = res[0][j];
            for (var i = 1; i < timeStamps.length; i++) {
                var curr = res[i][j];
                if (!curr.colSpan || !curr.rowSpan) continue;

                //find duplicated activity
                if (dup.colSpan && dup.rowSpan && dup.activity == curr.activity) {
                    curr.colSpan = 0; //delete this cell
                    dup.rowSpan++; //merge dup cell
                    if (curr.isCurr) dup.isCurr = true;
                    dup.dayEnd = curr.dayEnd;
                    dup.timeEnd = curr.timeEnd;
                } else {
                    dup = curr;
                }
            }
        }

        return res;
    }, [data]);

    const onCellDelete = (day: number | undefined, begin: string | undefined) => { 
        setData(data => {
            return {
                ...data,
                items: data.items.filter(x => x.day != day || x.begin != begin)
            }
        });
    }

    return (
        <table className="w-full">
            <thead>
                <tr className="grid grid-cols-7 rounded-t-sm bg-main text-white">
                    <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                        <span className="hidden lg:block"> Thời gian </span>
                        <span className="block lg:hidden"> </span>
                    </th>

                    {days.map((x, i) => (
                        <>
                            <th
                                key={x}
                                className={`${getToday() == i ? "bg-white text-main rounded-md" : ""
                                    } flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5`}
                            >
                                <span className="hidden lg:block"> {t(x)} </span>
                                <span className="block lg:hidden"> {"T" + (i + 2)} </span>
                            </th>
                        </>
                    ))}
                </tr>
            </thead>

            <tbody className="grid grid-cols-7">
                {data?.items &&
                    timeStamps.map((ts, tsIndex) => (
                        <>
                            <th className="ease flex items-center relative h-full cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                <div className="group w-full flex-grow cursor-pointer ">
                                    <div
                                        className={`${ts.begin <= getCurrentTimeHHmm() &&
                                            ts.end >= getCurrentTimeHHmm()
                                            ? "border-[3px]"
                                            : ""
                                            } event bg-[#eff4fb] left-2 z-30 mb-1 flex flex-col rounded-sm text-center border-main bg-gray px-3 py-1 group-hover:opacity-100 dark:bg-meta-4 w-full md:opacity-100`}
                                    >
                                        <span>{ts.begin + "-" + ts.end}</span>
                                    </div>
                                </div>
                            </th>

                            {days.map((dayName, day) => (
                                <>
                                    <ScheduleItemEl cellData={tableData[tsIndex][day]} onDelete={onCellDelete} />
                                </>
                            ))}
                        </>
                    ))}
            </tbody>
        </table>
    );
};

interface ScheduleItemElProp { 
    cellData: CellData,
    onDelete: (day: number | undefined, begin: string | undefined) => void;
}

const ScheduleItemEl = ({ cellData, onDelete }: ScheduleItemElProp) => {
    if(!cellData.key) return <td></td>

    const { colSpan, activity, key, rowSpan, isCurr, dayStart, dayEnd, timeStart, timeEnd } = cellData;
    if (!colSpan || !rowSpan) return <></>;

    var sp = isCurr ? "bg-mainBlur border-r-[3px]  border-l-[3px]" : "";

    const getDays = (a: number | undefined, b: number | undefined): string => {
        if (a == undefined || b == undefined) return '';
        if (a == b) return `T${a + 2}`;

        return `T${a + 2} - T${b + 2}`;
    }

    return (
        <td
            key={key}
            style={{
                gridColumn: `span ${colSpan} / span ${colSpan}`,
                gridRow: `span ${rowSpan} / span ${rowSpan}`,
            }}
            className={`flex group items-center relative cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}
        >
            <div className="w-full h-full flex-grow cursor-pointer ">
                <div className={`${sp} event h-full items-center justify-center bg-[#eff4fb] left-2 z-30 mb-1 flex flex-col rounded-sm border-main bg-gray px-3 py-1 text-left group-hover:opacity-100 dark:bg-meta-4 w-full md:opacity-100`}>
                    <span className={`event-name text-sm font-semibold text-center`}>
                        {activity}
                    </span>
                    <span>
                        <button onClick={() => onDelete(dayStart, timeStart)}>delete</button>
                    </span>
                    {/* <span>
                            {rowSpan + '-' + colSpan}
                        </span> */}
                </div>
            </div>

            <div className={`absolute left-[20px] top-0 italic ${!sp ? 'hidden' : ''} group-hover:block`}>
                {getDays(dayStart, dayEnd)}, {timeStart + ' - ' + timeEnd}
            </div>
        </td>
    );
};

export default ScheduleTable;
