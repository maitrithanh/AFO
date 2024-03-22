import axios from "axios";
import { getCookie } from "cookies-next";

// export const baseURL = "http://rowoji9583-001-site1.anytempurl.com/api/";
// export const baseURL = "https://localhost:7254/api/";
export const baseURL = "http://localhost:5088/api/";

const callApi = axios.create({baseURL})

export const callApiWithToken = (token: string = '') => { 
    if (!token) token = getCookie('token') + '';
    return axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const fetchApiWithFetch = (token: string = '', formData: any, pathName:string, method:string) => {
    if (!token) token = getCookie('token') + '';
    fetch(`${baseURL}${pathName}`, {
          method: `${method.toUpperCase()}`,
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
}

export default callApi;