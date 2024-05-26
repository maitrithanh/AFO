import { baseURL } from "./callApi"

export const getImageUrl = (filename: string = '') => { 
    //tạm thời k gọi ảnh từ server, demo mới mở ra
    return `${baseURL}File/GetFile/${filename}`
}