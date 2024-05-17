"use server"

import prisma from "@/db/prisma"


export async function confirmTicket(id){
    try {
        await prisma.cartUserProducts.update({
            where: {
                id
            },
            data: {
                ticket_redeem: true,
                claimedAt: new Date()
            }
        })
        revalidatePath("/")
        return true
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}