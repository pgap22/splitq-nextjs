"use server"

import prisma from "@/db/prisma"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { revalidatePath } from "next/cache"

dayjs.extend(utc)
dayjs.extend(timezone)

export async function confirmTicket(id){
    try {
        await prisma.cartUserProducts.update({
            where: {
                id
            },
            data: {
                ticket_redeem: true,
                claimedAt: dayjs().tz("America/El_Salvador").toDate()
            }
        })
        revalidatePath("/")
        return true
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}