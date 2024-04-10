"use server"

import prisma from "@/db/prisma"


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

        return perfiles

    } catch (error) {
        console.log(error)
        return {error: "Hubo un error"}
    }

}