"use server"
import prisma from "@/db/prisma"
export async function getComboById(id) {
    return await prisma.combo.findFirst({
        where: {
            id
        },
        include: {
            products: {
                include: {
                    product: true
                }
            },
            seller: true
        }
    })
}