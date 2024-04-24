"use server"
import { unstable_update } from "@/auth"
export async function updateUser(data){
    return await unstable_update({
        user: data
    })
}