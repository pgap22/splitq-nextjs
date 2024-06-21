"use server"
import prisma from "@/db/prisma"
import { redirect } from "next/navigation"

export default async function detectPassToken(token) {
    let isValid = false
    try {
        isValid = await prisma.users.findFirst({
            where: {
                passToken: token
            }
        })
    } catch (error) {
        return {error: 'Token no valido'}
    }

    if(isValid){
        return redirect("/auth/change-password/"+token)
    }
    return {error: 'Token no valido'}

}