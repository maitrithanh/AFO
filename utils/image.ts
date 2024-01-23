import { baseURL } from "./callApi"

export const getImageUrl = (filename: string = '') => { 
    return `${baseURL}File/GetFile/${filename}`
}