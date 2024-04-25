"use server"

import prisma from "@/db/prisma"

export async function getRefoundBalanceByUserId(id_user){
    try {
        const refounds = await prisma.userRefoundBalance.findMany({
            where: {
                AND: [
                    {id_user}
                ]
            }
        })
        return refounds
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}