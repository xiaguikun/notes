
import qs from 'querystring'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {baseURL} from '../api/env'
export function useStringToObj (str,type1="&",type2="=") {
    return qs.parse(str,type1,type2)
}

const ins = axios.create({
    timeout: 10000,
    baseURL
})
//拦截器
ins.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.common.token = token
    return config
},function (error) {
    return Promise.reject(error)
})

ins.interceptors.response.use(function (res) {
    return res.data
},function (error) {
    return Promise.reject(error)
})

export function useRequest (url,config) {
    const {method="GET",headers,data} = config
    const [res,setRes] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    useEffect(() => {
        switch (config.method.toUpperCase()) {
            case "GET":
                ins.get(url,{params: config.data})
                    .then(res=>{
                        setRes(res)
                    })
                    .catch(error => {
                        setError(error)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
                break;
            case "POST":
                ins.post(url,config.data,{headers})
                    .then(res=>{
                        setRes(res)
                    })
                    .catch(error => {
                        setError(error)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
                break;
        
            default:
                ins({
                    url: url,
                    ...config
                })
                break;
        }
    },[])
    return {res,loading,error}
}