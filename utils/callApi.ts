import axios from "axios";
import { getCookie } from "cookies-next";

//const baseURL = "http://rowoji9583-001-site1.anytempurl.com/api/";
const baseURL = "https://localhost:7254/api/";

const callApi = axios.create({baseURL})

export const callApiWithToken = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${getCookie('token')}`,
    },
})

export default callApi;