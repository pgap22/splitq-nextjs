"use server"

import prisma from "@/db/prisma"
import { revalidatePath } from "next/cache"


export async function getProfile() {
    try {
        
        const perfiles = await prisma.users.findMany({
            where: {
                OR:[
                    {role: "seller",},
                    {role: "mod"}

                ]
            }
        })

        revalidatePath("/")

        return perfiles

    } catch (error) {
        console.log(error)
        return {error: "Hubo un error"}
    }

}