"use client"

import { useEffect, useState } from "react"
import callApi, {callApiWithToken} from "./callApi"
import { getCookie } from "cookies-next"

const useFetch = (path: string, body?: any) => {
    const token = getCookie("token") || "null";
    const [data, setData] = useState<any>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true;

   const fetchApi = async () => {
    setLoading(true)
    try {
        const respone = token ? await callApiWithToken(token).get(path, body) : await callApi.get(path, body)
        const data = respone.data
        if(mounted) {
            setData(data)
        }
    } catch (error:any) {
        setError(error)
        console.log("useFetch something went wrong: ", error);
    } finally{
        setLoading(false)
    }
   }
   fetchApi()

    return () => {
        mounted = false
    }
  }, [path, token, body])

  return {data, loading, error}
}

export default useFetch;
