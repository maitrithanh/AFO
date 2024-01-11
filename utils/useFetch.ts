"use client"

import { useEffect, useState } from "react"
import callApi, {callApiWithToken} from "./callApi"
import ResponseData from "@/types/ResponseData"

const useFetch = <T = any>(path: string, body?: any) => {
    const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true;

   const fetchApi = async () => {
    setLoading(true)
    try {
        const respone = await callApiWithToken().get<ResponseData<T>>(path, body)
        const data = respone.data.data
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
  }, [path, body])

  return {data, loading, error}
}

export default useFetch;
