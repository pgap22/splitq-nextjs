"use server"

import prisma from "@/db/prisma"
import { revalidatePath } from "next/cache"


export async function confirmTicket(id){
    try {
        const ticket = await prisma.cartUserProducts.update({
            where: {
                id
            },
            data: {
                ticket_redeem: true,
                claimedAt: new Date()
            }
        })
        revalidatePath("/")
        return ticket
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}