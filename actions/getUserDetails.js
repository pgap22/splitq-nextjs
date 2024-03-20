"use server"

import { getUserById } from "@/lib/user"
import { redirect } from "next/navigation"
export const getUserDetails = async(id)=>{
    const user =  await getUserById(id)
    if(!user) return redirect("/mod");
    return user
}