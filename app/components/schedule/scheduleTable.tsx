"use client"; // dùng tạm //dùng luôn đi

import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ScheduleDetail, { ScheduleItem } from "@/types/ScheduleDetail";
import { FaBan, FaCopy, FaPaste, FaTrashCan } from "react-icons/fa6";
import AddItem from "../admin/menu/addItem";
import useFetch from "@/utils/useFetch";
import Activity from "@/types/Activity";
import moment from "moment";

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

  item?: ScheduleItem;
}

interface CopyItem {
    day?: number,
    time?: string
}

interface CopyItem {
    day?: number,
    time?: string
}

const StartTime = "07:00";
const EndTime = "17:00";

interface Props {
  dataSrc: ScheduleDetail;
  setData?: React.Dispatch<React.SetStateAction<ScheduleDetail>>;
  edit?: boolean;
  isCurrWeek?: boolean;
}

const ScheduleTable = ({ dataSrc, setData, edit, isCurrWeek }: Props) => {

    const data = dataSrc;
    //const [data, setData] = useState(dataSrc);
    const [copyItem, setCopyItem] = useState<CopyItem | null>(null);

  const resetData = () => {
    if (setData)
      setData((x) => {
        return { ...x, items: [] };
      });
  };

  const { data: dataActivity } = useFetch<Activity[]>(
    "/schedule/listActivities"
  );

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
  };
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
        
        for (var i = 0; i < list.length; i++) {
            var n = list.length;
            if (i + 1 >= n) {
                if (i < n) {
                    var last = list[i];
                    if(last.begin < last.end) res.push(last);
                }
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
            if (x.begin < y.begin) {
                res.push({ begin: x.begin, end: y.begin })  //a-c
            }

            if (x.end > y.end) {
                list.push({ begin: y.end, end: x.end }); //d-b
            } else {
                //b < d => a-c, c-b, b-d vd 5-9 + 7-10 => 5-7 + 7-9 + 9-10
                if(y.begin < x.end) list.push({ begin: y.begin, end: x.end });
                y.begin = x.end;
            }
            list.sort(sortByBegin);
        }


    //fill all gap inbetween
    var filledList: TimeStamp[] = [];
    if (res.length) {
      filledList.push(res[0]);

      for (var i = 1; i < res.length; i++) {
        var curr = res[i - 1];
        var next = res[i];

        if (curr.end < next.begin) {
          filledList.push({
            begin: curr.end,
            end: next.begin,
          });
        }
        filledList.push(next);
      }
    }

    //return res;

    //add placeholder at the end
    var placeholder: TimeStamp = {
      begin:
        filledList.length > 0
          ? filledList[filledList.length - 1].end
          : StartTime,
      end: EndTime,
    };
    if (placeholder.begin < EndTime) filledList.push(placeholder);

    //placeholder start
    if (filledList.length > 0 && filledList[0].begin > StartTime) {
      filledList = [
        { begin: StartTime, end: filledList[0].begin },
        ...filledList,
      ];
    }

    return filledList;
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
          cell.item = item;
        } else {
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
          if (
            dup.colSpan &&
            dup.rowSpan &&
            dup.activity == curr.activity &&
            dup.dayEnd != null &&
            dup.dayEnd + 1 == curr.dayStart
          ) {
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
        if (
          dup.colSpan &&
          dup.rowSpan &&
          dup.activity == curr.activity &&
          dup.timeEnd == curr.timeStart
        ) {
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

    //merge cell in a day that has continuous timeStamp
    const addItemsToScheduleData = (newItems: ScheduleItem[]) => { 
        
        //merge data
        var items = data.items;
        for (var i = 0; i < newItems.length; i++) { 
            var x = newItems[i];

            //merge after
            var mergeAfter = items.find(y => x.day == y.day && y.begin == x.end && x.idActivity == y.idActivity)
            if (mergeAfter) { 
                x.end = mergeAfter.end;
                mergeAfter.idActivity = -1;
            }
            //merge before
            var mergeBefore = items.find(y => x.day == y.day && x.begin == y.end && x.idActivity == y.idActivity);
            if (mergeBefore) {
                x.begin = mergeBefore.begin;
                mergeBefore.idActivity = -1;
            }
        }
        items = items.filter(x => x.idActivity >= 0);
        items = [...items, ...newItems];

        if (setData) setData(x => { return { ...x, items } });
    }

    const onCellDelete = (day: number | undefined, time: string | undefined, timeEnd: string | undefined) => { 

        var newItems = data.items.filter(x =>
            (day != undefined && x.day != day) ||
            (time != undefined && x.begin != time)
        );
        data.items = newItems;

        if (setData) setData(data => {
            return {
                ...data,
                items: newItems
            }
        });
    }

    const onCellCopy = (day: number | undefined, time: string | undefined) => { 
        setCopyItem({ day, time });
    }

    const onCellCancel = () => { 
        setCopyItem(null)
    }

    const onCellPaste = (day: number | undefined, time: string | undefined, timeEnd: string | undefined) => { 
        if (!copyItem) return;
        //delete old items
        onCellDelete(day, time, timeEnd);

        //paste new items
        var newItems: ScheduleItem[] = [];
        //get copied items
        newItems = data.items.filter(x => 
            (copyItem.day == undefined || x.day == copyItem.day) &&
            //(copyItem.time == undefined || x.begin == copyItem.time)
            (copyItem.time == undefined || (x.begin <= copyItem.time && x.end > copyItem.time))
        );
        //give copied items new values
        newItems = newItems.map(x => {
            var minutes = minuteDiff(x.begin, x.end);
            var _timeEnd = time ? addMinute(time, minutes) : null;
            if (_timeEnd && timeEnd && _timeEnd > timeEnd) _timeEnd = timeEnd; // paste with original endtime
            if (_timeEnd && timeEnd ) _timeEnd = timeEnd; // paste with destination cell endtime
            if (_timeEnd && _timeEnd > EndTime) _timeEnd = EndTime;

            return {
                ...x,
                begin: time ?? x.begin,
                end: _timeEnd ?? x.end,
                day: day ?? x.day
            }
        })
        
        //if (setData) setData(x => { return { ...x, items: [...x.items, ...newItems] } });
        addItemsToScheduleData(newItems);
        setCopyItem(null);
    }

  //check if [a:b], [c:d] is overlapped
  const timeOverlapped = (
    a: string,
    b: string,
    c: string,
    d: string
  ): boolean => {
    if (a > c) return timeOverlapped(c, d, a, b);
    if (c < b) return true;

    return false;
  };

  const onCellAdd = (a: Activity, day: number, begin: string, end: string) => {
    if (begin >= end) return;
    if (
      data.items.find(
        (x) => x.day == day && timeOverlapped(begin, end, x.begin, x.end)
      )
    )
      return;

        var newItem: ScheduleItem = {
            day: day,
            begin: begin,
            end: end,
            note: '',
            activity: a.name,
            idActivity: a.id,
        }

        addItemsToScheduleData([newItem]);
        // if (setData) setData(data => {
        //     return {
        //         ...data,
        //         items: [...data.items, newItem]
        //     }
        // });
    }

  return (
    <table className="w-full">
      <thead className="">
        <tr className="grid grid-cols-7 rounded-t-sm text-gray-700 uppercase bg-[#FFD9BF]">
          <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
            <span className="hidden lg:block"> Thời gian </span>
            <span className="block lg:hidden"> </span>
          </th>

                    {days.map((x, i) => (
                        <>
                            <th
                                key={x}
                                className={`${!edit && isCurrWeek && getToday() == i  ? "bg-white text-main rounded-md" : ""
                                    } group relative flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5`}
                            >
                                <span className="hidden lg:block"> {t(x)} </span>
                                <span className="block lg:hidden"> {"T" + (i + 2)} </span>
                                <CellActions
                                    day={i} time={undefined} timeEnd={undefined}
                                    onDelete={onCellDelete}
                                    copyItem={copyItem}
                                    onCopy={onCellCopy}
                                    onPaste={onCellPaste}
                                    onCancel={onCellCancel}
                                />
                            </th>
                        </>
                    ))}
                </tr>
            </thead>

            <tbody className="grid grid-cols-7">
                {data?.items &&
                    timeStamps.map((ts, tsIndex) => (
                        <>
                            {/* time stamp */}
                            <th className="group relative ease flex items-center h-full cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                <div className="group w-full flex-grow cursor-pointer ">
                                    <div
                                        className={`${ts.begin <= getCurrentTimeHHmm() &&
                                            ts.end >= getCurrentTimeHHmm() && !edit && isCurrWeek
                                            ? "border-[3px]"
                                            : ""
                                            } event bg-[#eff4fb] left-2 z-30 mb-1 flex flex-col rounded-sm text-center border-main bg-gray px-3 py-1 group-hover:opacity-100 dark:bg-meta-4 w-full md:opacity-100`}
                                    >
                                        <span>{ts.begin + " - " + (ts.end)}</span>
                                    </div>
                                </div>

                                <CellActions
                                    day={undefined} time={ts.begin} timeEnd={ts.end}
                                    onDelete={onCellDelete}
                                    copyItem={copyItem}
                                    onCopy={onCellCopy}
                                    onPaste={onCellPaste}
                                    onCancel={onCellCancel}
                                />
                            </th>

                            {days.map((dayName, day) => (
                                <>
                                    <ScheduleItemEl
                                        cellData={tableData[tsIndex][day]}
                                        onDelete={onCellDelete}
                                        onAdd={onCellAdd}
                                        edit={edit}
                                        activities={dataActivity || []}
                                        isCurrWeek={isCurrWeek}
                                        copyItem={copyItem}
                                        onCancel={onCellCancel}
                                        onPaste={onCellPaste}
                                        onCopy={onCellCopy}
                                    />
                                </>
                            ))}
                        </>
                    ))}
            </tbody>
            {/* <button onClick={resetData}>reeeeeset</button> */}
        </table>
    );
};

interface CellActionsProp { 
    day: number | undefined,
    time: string | undefined, //time begin
    timeEnd: string | undefined, //time begin
    onDelete: (day: number | undefined, begin: string | undefined, timeEnd: string | undefined) => void,
    copyItem: CopyItem | null,
    onCopy: (day: number | undefined, time: string | undefined) => void,
    onPaste: (day: number | undefined, time: string | undefined, timeEnd: string | undefined) => void,
    onCancel: () => void
}

const compareNull = (a: any, b: any): boolean => {
    if (a == null && b == null) return true;
    if (a != null && b != null) return true;

    return false;
};

const CellActions = ({ day, time, timeEnd, onDelete, onCancel, onCopy, onPaste, copyItem } : CellActionsProp) => { 
    return <div className={`${copyItem ? '' : 'hidden'} absolute right-0 top-0 pt-1 pe-2 group-hover:block`}>
        {
            copyItem ? 
                <>
                    {
                        copyItem.day == day && copyItem.time == time ?
                            <>
                                <button onClick={onCancel} title="Hủy" className="mr-3">
                                    <FaBan />
                                </button>
                            </>
                            :
                            (compareNull(day, copyItem.day) && compareNull(time, copyItem.time)) &&
                            <>
                                <button onClick={() => onPaste(day, time, timeEnd)} title="Chép" className="mr-3">
                                    <FaPaste />
                                </button>
                            </>
                    }
                </>
                :
                <>
                    <button onClick={() => onCopy(day, time)} title="Sao chép" className="mr-3">
                        <FaCopy />
                    </button>

                    <button onClick={() => onDelete(day, time, timeEnd)} title="Xóa">
                        <FaTrashCan />
                    </button>
                </>
        }
    </div>
}

interface ScheduleItemElProp { 
    cellData: CellData,
    onDelete: (day: number | undefined, begin: string | undefined, timeEnd: string | undefined) => void
    copyItem: CopyItem | null,
    onCopy: (day: number | undefined, time: string | undefined) => void,
    onPaste: (day: number | undefined, time: string | undefined, timeEnd: string | undefined) => void,
    onCancel: () => void
    onAdd: (a: Activity, day:number, begin: string, end: string ) => void
    edit: boolean | undefined
    activities: Activity[], isCurrWeek?: boolean
}


const ScheduleItemEl = ({ cellData, onDelete, onAdd, edit, activities, isCurrWeek, onCopy, onPaste, onCancel, copyItem }: ScheduleItemElProp) => {
    const {
        colSpan, activity, key, rowSpan, isCurr, dayStart, dayEnd, timeStart, timeEnd, item
    } = cellData;

    if (!cellData.key) return <td
        className={`flex group items-center relative cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
        {edit &&
            <div>
                <AddItem<Activity>
                    onAdd={(x) => {
                        //var end = addMinute(timeStart!, x.time); //cal end from original length
                        var end = (timeEnd && timeEnd != EndTime) ? timeEnd : addMinute(timeStart!, x.time); //follow cell time
                        if (end > EndTime) end = EndTime;
                        if (timeEnd && end > timeEnd) end = timeEnd; 

                        //onAdd(x, dayStart!, timeStart!, timeEnd!);
                        onAdd(x, dayStart!, timeStart!, end);
                    }}
                    dataSource={activities}
                    getName={(x) => (x.name ?? '')}
                    getKey={x => x.id + ''}
                    placeholder="Hoạt động"
                    width="150%"
                />

                <CellActions
                    day={dayStart} time={timeStart} timeEnd={timeEnd}
                    onDelete={onDelete}
                    copyItem={copyItem}
                    onCopy={onCopy}
                    onPaste={onPaste}
                    onCancel={onCancel}
                />
            </div>
        }
    </td>

  if (!colSpan || !rowSpan) return <></>;

    var sp = isCurrWeek && isCurr && !edit ? "bg-mainBlur border-r-[3px] border-l-[3px]" : ""; //current date color
    var bg = sp ? '' : 'bg-[#eff4fb]' //normal date color
    if (item?.decoration == 1) bg = 'bg-[#FDF1D5]' //event date color

  const getDays = (a: number | undefined, b: number | undefined): string => {
    if (a == undefined || b == undefined) return "";
    if (a == b) return `Thứ ${a + 2}`;

    return `Thứ ${a + 2} - Thứ ${b + 2}`;
  };

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
                <div className="h-full flex flex-col">
                    <div className={`${sp} ${bg} event flex-1 items-center justify-center left-2 mb-1 flex flex-col rounded-sm border-main bg-gray px-3 py-1 text-left group-hover:opacity-100 dark:bg-meta-4 w-full md:opacity-100`}>
                        <span className={`event-name text-sm font-semibold text-center`}>
                            {activity}
                        </span>
                        {
                            edit &&
                            // <div className="absolute right-0 top-0 pt-1 pe-2 hidden group-hover:block">
                            //     <button onClick={() => onDelete(dayStart, timeStart)} title="Xóa">
                            //         <FaTrashCan />
                            //     </button>
                            // </div>
                            <CellActions
                                day={dayStart} time={timeStart} timeEnd={timeEnd}
                                onDelete={onDelete}
                                copyItem={copyItem}
                                onCopy={onCopy}
                                onPaste={onPaste}
                                onCancel={onCancel}
                            />
                        }

                    </div>

                    {/* time */}
                    {
                        edit &&
                        <div className="invisible group-hover:visible">
                            <div className="italic text-center">
                                ({minuteDiff(timeStart, timeEnd)} phút)
                            </div>
                                
                            <SelectHour />
                        </div>
                    }
                    {/* {
                        edit &&
                        <div className="w-full flex">
                            <div className="flex-1 whitespace-nowrap">Số phút:</div>
                            <input type="number" value={7} title="f" className="mb- w-full" />
                        </div>
                    } */}
        </div>
      </div>

      {!edit && (
        <div
          className={`absolute left-[20px] top-0 italic ${
            !sp ? "hidden" : ""
          } group-hover:block`}
        >
          {getDays(dayStart, dayEnd)}, {timeStart + " - " + timeEnd}
        </div>
      )}
    </td>
  );
};

const SelectHour = () => { 
    return <div>Bắt đầu: hh:mm</div>
}

//abs(a-b) in minutes; a,b HH:mm
const minuteDiff = (a?: string, b?: string): number => {
    if (!a || !b) return 0;

    var timeA = moment(a, "HH:mm");
    var timeB = moment(b, "HH:mm");
    var diff = timeA.diff(timeB, 'minutes');
    return Math.abs(diff)
}

const addMinute = (time: string, add: number): string => {
    var arr = time.split(':');
    if (arr.length < 2) return '';
    var h: number = +arr[0];
    var m: number = +arr[1];

    m += add;
    h += Math.floor(m / 60);
    m %= 60;
    h %= 24;
    const format = (n: number): string => n < 10 ? '0' + n : '' + n;

    return format(h) + ':' + format(m);
}

export default ScheduleTable;
