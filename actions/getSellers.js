"use server"

import prisma from "@/db/prisma"


export async function getSellers() {
    try {
        
        const perfiles = await prisma.users.findMany({
            where: {
                role: "seller"
            }
        })

        return perfiles

    } catch (error) {
        console.log(error)
        return {error: "Hubo un error"}
    }
}