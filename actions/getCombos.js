"use server"

import prisma from "@/db/prisma"

export async function getCombos() {
    return await prisma.combo.findMany({
        include: {
            products: {
                include: {
                    product: true
                }
            }
        }
    })
}