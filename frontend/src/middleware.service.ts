"use server"

import { cookies } from "next/headers"

export const setToken= (data:string)=>{
    cookies().set('token',data);
}

export const getToken= async ()=>{
    return cookies().get('token')
}