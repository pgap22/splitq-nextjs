"use server"

import prisma from "@/db/prisma"
import { revalidatePath } from "next/cache"

export default async function enableItemToBuy(item) {
    try {
        await prisma.cartUserProducts.update({
            where: {
                id: item.id
            },
            data:{
                enableToBuy: !item.enableToBuy
            }
        })

        revalidatePath("/home/cart", "page")
        return true
    } catch (error) {
        console.log(error)
    }
}