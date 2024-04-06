
export default interface ParentListRes {
    id?: string,
    fullName?: string,
    avatar?: string,
    phoneNumber?: string,
    gender?: number,
    address?: string,
    birthDay?: string,
    idNumber?: string,
    job?: string,
    note?: string,
    relationship?:string,
    children: {
        id: string,
        fullName: string,
        joinDate: string
        avatar: string
    }[]
}