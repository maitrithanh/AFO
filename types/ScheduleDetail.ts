import ClassRoom from "./ClassRoom"

export interface ScheduleItem { 
    //id?: number,
    day: number,
    begin: string,
    end: string,
    note: string,
    activity: string,
    idActivity: number,
    decoration?: number
}

export default interface ScheduleDetail { 
    id?: string,
    name: string,
    desc: string,
    start: string,
    end: string,
    items: ScheduleItem[]
    classes: ClassRoom[]
}