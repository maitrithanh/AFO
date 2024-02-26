
export interface ScheduleItem { 
    id: number,
    day: number,
    begin: string,
    end: string,
    note: string,
    activity: string
}

export default interface ScheduleDetail { 
    items: ScheduleItem[]
}