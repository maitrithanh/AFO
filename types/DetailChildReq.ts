import AddParentReq from "./AddParentReq"

export default interface DetailChildReq { 
    fullName?: string,
    birthDay?: string,
    nation?: string,
    gender?: number,
    address?: string,
    encodedAddress?: string,
    note?: string,
    avatarFile?: File | null,
    avatar?: string,
    parent?: AddParentReq
}