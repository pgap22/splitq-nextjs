"use server"

import prisma from "@/db/prisma"
import { revalidatePath } from "next/cache"

export default async function multiConfirmTickets(tickets) {
    try {

        const myTickets = await Promise.all(
            tickets.map(ticketsid => prisma.cartUserProducts.update({
                where: {
                    id: ticketsid
                },
                data: {
                    ticket_redeem: true,
                    claimedAt: new Date()
                }
            }))
        )

        revalidatePath("/")
        return myTickets
    } catch (error) {
        console.log(error)
        return { error: "Hubo un error en el servidor" }
    }
}