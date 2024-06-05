"use server"

import { getUserById } from "@/lib/user"
export const getUserDetails = async(id)=>{
    const user = await getUserById(id)
    
    if(!user) return {error: "not found"}

    return user
}