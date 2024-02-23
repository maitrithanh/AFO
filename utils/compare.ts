import removeVietnameseTones from "./removeTones";

const formatName = (s?: string): string => {
    if (!s) return '';

    var arr = s.split(' ');
    var name = arr.pop();
    if (!name) return s;

    arr = [name, ...arr];
    return arr.join(' ');
}

export const compareName = (a: string = '', b: string = ''): number => { 
    if (a === b) return 0;
    return formatName(a) < formatName(b) ? -1 : 1
}

export const checkNameInclude = (src: string, key: string): boolean => { 
    return removeVietnameseTones(src).toLowerCase().includes(removeVietnameseTones(key).toLowerCase())
}