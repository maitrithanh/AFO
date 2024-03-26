
export const toYMD = (dmy: string) => {
    if (!dmy) return '';
    return dmy.split('/').reverse().join('-');
}

export const toDMY = (ymd: string) => { 
    if (!ymd) return '';
    return ymd.split('-').reverse().join('/');
}

export const getWeekName = (week: string = "") => {
    var arr: string[] = week.split("-W");
    return "Tuần " + arr[1] + " - " + arr[0];
};