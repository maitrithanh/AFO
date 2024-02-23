
export default interface AddChildReq{ 
    FullName?: string,
    BirthDay?: string,
    Nation?: string,
    Gender?: number,
    Address?: string,
    Note?: string,
    Avatar?: File | null
}