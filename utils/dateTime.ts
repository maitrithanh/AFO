
export const toYMD = (dmy: string) => {
    if (!dmy) return '';
    return dmy.split('/').reverse().join('-');
}