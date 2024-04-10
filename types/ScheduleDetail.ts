
export interface ScheduleItem { 
    //id: number,
    day: number,
    begin: string,
    end: string,
    note: string,
    activity: string,
    idActivity: number
}

export default interface ScheduleDetail { 
    name: string,
    start: string,
    end: string,
    items: ScheduleItem[]
}