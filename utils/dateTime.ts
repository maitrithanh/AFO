
export const toYMD = (dmy: string) => {
    if (!dmy) return '';
    return dmy.split('/').reverse().join('-');
}

export const toDMY = (ymd: string) => { 
    if (!ymd) return '';
    return ymd.split('-').reverse().join('/');
}