"use server"

import prismaDev from "@/db/prismaDev"

export async function getRefoundBalanceByUserId(id_user){
    try {
        const refounds = await prismaDev.userRefoundBalance.findMany({
            where: {
                AND: [
                    {id_user},
                    {status: 'pending'}
                ]
            }
        })
        return refounds
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}