
export default interface AddTeacherReq{ 
    FullName?: string,
    PhoneNumber?: string,
    Gender?: number,
    Address?: string,
    BirthDay?: string,
    IDNumber?: string,
    Education?: string
    Note?: string
    classId?: string
    File?: File | null
}