import axios from "axios";

const baseURL = "http://rowoji9583-001-site1.anytempurl.com/api/";

const callApi = axios.create({baseURL})

export const callApiWithToken = (token:string) => {
    return axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default callApi;